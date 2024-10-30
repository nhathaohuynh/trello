import {
	Active,
	closestCorners,
	CollisionDetection,
	defaultDropAnimationSideEffects,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	getFirstCollision,
	Over,
	pointerWithin,
	rectIntersection,
	useSensor,
	useSensors,
} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BoardType, CardType, ColumnType } from '~/apis/mock-data'
import { MouseSensor, TouchSensor } from '~/custom/dnd-kit'
import { generatePlaceholderCard, mapOrder } from '~/utils/formatter'
import CardItem from '../card-item'
import Column from '../column'
import Columns from '../columns'

interface props {
	board: BoardType
}

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
	CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

const BoardContent = ({ board }: props) => {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10, // mouse move 10px
		},
	})
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 250, // touch move 250ms
			tolerance: 500,
		},
	})

	const sensors = useSensors(mouseSensor, touchSensor)
	const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])
	const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
		null,
	)
	const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
	const [activeDragItemData, setActiveDragItemData] = useState<
		ColumnType | CardType | null
	>(null)
	const [columnOnStartDrag, setColumnOnStartDrag] = useState<ColumnType | null>(
		null,
	)

	const lastOverId = useRef<string | null>(null)

	useEffect(() => {
		const sortedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
		setOrderedColumns(sortedColumns)
	}, [board])

	const findColumnByCardId = (id: string) => {
		const result = orderedColumns.find((column) =>
			column?.cards?.map((card: CardType) => card._id)?.includes(id),
		) as ColumnType

		const cards = mapOrder(result?.cards, result?.cardOrderIds, '_id')

		return {
			...result,
			cards,
		} as ColumnType
	}

	const dropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: '0.5',
				},
			},
		}),
	}

	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
				return closestCorners({ ...args })
			}

			const pointerIntersection = pointerWithin(args)

			const intersection = !!pointerIntersection?.length
				? pointerIntersection
				: rectIntersection(args)

			let overId = getFirstCollision(intersection)?.id

			if (overId) {
				const targetColumn = orderedColumns.find(
					(column) => column._id === overId,
				)

				if (targetColumn) {
					overId = closestCorners({
						...args,
						droppableContainers: args.droppableContainers.filter(
							(container) =>
								container.id === overId &&
								targetColumn.cardOrderIds.includes(container?.id as string),
						),
					})[0]?.id
				}
				lastOverId.current = overId as string
				return [{ id: overId }]
			}

			return lastOverId.current ? [{ id: lastOverId.current }] : []
		},
		[activeDragItemType],
	)

	const moveCardBetweenDifferentColumns = (
		active: Active,
		over: Over,
		activeColumn: ColumnType,
		overColumn: ColumnType,
	) => {
		setOrderedColumns((prevColumn) => {
			const overCardIndex = overColumn.cards.findIndex(
				(card) => card._id === over.id,
			)

			let newCardIndex

			newCardIndex =
				overCardIndex >= 0 ? overCardIndex : overColumn?.cards?.length + 1
			const nextColumns = structuredClone(prevColumn) as ColumnType[]

			const nextActiveColumn = nextColumns.find(
				(column) => column._id === activeColumn._id,
			)

			const nextOverColumn = nextColumns.find(
				(column) => column._id === overColumn._id,
			)

			if (nextActiveColumn) {
				nextActiveColumn.cards = mapOrder(
					nextActiveColumn?.cards,
					nextActiveColumn?.cardOrderIds,
					'_id',
				)
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(card) => card._id !== active.id,
				)

				// update card order ids
				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
					(card) => card._id,
				)

				if (nextActiveColumn.cards.length === 0) {
					nextActiveColumn.cards.push(generatePlaceholderCard(nextActiveColumn))
				}
			}

			if (nextOverColumn) {
				nextOverColumn.cards = mapOrder(
					nextOverColumn?.cards,
					nextOverColumn?.cardOrderIds,
					'_id',
				)

				nextOverColumn.cards = nextOverColumn.cards.filter(
					(card) => card._id !== active.id && !card.FE_PLACEHOLDER,
				)

				const rebuildCardItemData = {
					...activeDragItemData,
					columnId: overColumn._id,
				}

				nextOverColumn.cards.splice(
					newCardIndex,
					0,
					rebuildCardItemData as CardType,
				)

				// update card order ids
				nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
					(card) => card._id,
				)
			}

			return nextColumns
		})
	}

	const handleDragstart = (event: DragStartEvent) => {
		const { active } = event
		setActiveDragItemId(active?.id as string)
		setActiveDragItemType(
			active?.data.current?.columnId
				? ACTIVE_DRAG_ITEM_TYPE.CARD
				: ACTIVE_DRAG_ITEM_TYPE.COLUMN,
		)
		setActiveDragItemData(active?.data.current as ColumnType | CardType)
		if (active?.data.current?.columnId) {
			setColumnOnStartDrag(
				findColumnByCardId(active.id as string) as ColumnType,
			)
		}
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!active || !over) return

		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
			const activeColumn = findColumnByCardId(active.id as string)
			const overColumn = findColumnByCardId(over.id as string)

			if (!activeColumn || !overColumn) return

			if (columnOnStartDrag?._id !== overColumn._id) {
				moveCardBetweenDifferentColumns(active, over, activeColumn, overColumn)
			} else {
				const sourceCardIndex = columnOnStartDrag.cards.findIndex(
					(card) => activeDragItemId === card._id,
				)

				const targetCardIndex = columnOnStartDrag.cards.findIndex(
					(card) => over.id === card._id,
				)

				const sortedCards = arrayMove(
					columnOnStartDrag.cards,
					sourceCardIndex,
					targetCardIndex,
				)

				setOrderedColumns((prevColumn) => {
					console.log(prevColumn)
					const nextColumns = structuredClone(prevColumn) as ColumnType[]

					const nextColumn = nextColumns.find(
						(column) => column._id === columnOnStartDrag._id,
					)

					if (nextColumn) {
						nextColumn.cards = sortedCards
						nextColumn.cardOrderIds = sortedCards.map((card) => card._id)
					}

					return nextColumns
				})
			}
		}

		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
			if (active.id !== over.id) {
				// get location active column
				const sourceColumnIndex = orderedColumns.findIndex(
					(column) => active.id === column._id,
				)
				// get location over column
				const targetColumnIndex = orderedColumns.findIndex(
					(column) => over.id === column._id,
				)

				const sortedColumns = arrayMove(
					orderedColumns,
					sourceColumnIndex,
					targetColumnIndex,
				)

				// get new column order ids to call api

				// const newColumnOrderIds = sortedColumns.map((column) => column._id)

				setOrderedColumns(sortedColumns)
			}
		}

		setActiveDragItemId(null)
		setActiveDragItemType(null)
		setActiveDragItemData(null)
		setColumnOnStartDrag(null)
	}

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event

		if (!over || !active) return

		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
			return
		}

		const activeColumn = findColumnByCardId(active?.id as string)
		const overColumn = findColumnByCardId(over.id as string)

		if (!activeColumn || !overColumn) {
			return
		}

		if (activeColumn._id !== overColumn._id) {
			moveCardBetweenDifferentColumns(active, over, activeColumn, overColumn)
		}
	}

	return (
		<DndContext
			onDragStart={handleDragstart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			collisionDetection={collisionDetectionStrategy}
			sensors={sensors}
		>
			<Box
				sx={{
					width: '100%',
					// p: '10px 0',
					height: (theme) => theme.appSetting.boardBarContentHeight,
				}}
			>
				<DragOverlay dropAnimation={dropAnimation}>
					{!activeDragItemData ||
					!activeDragItemType ? null : activeDragItemType ===
					  ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
						<Column column={activeDragItemData as ColumnType} />
					) : (
						<CardItem card={activeDragItemData as CardType} />
					)}
				</DragOverlay>
				<Columns columns={orderedColumns} />
			</Box>
		</DndContext>
	)
}

export default BoardContent
