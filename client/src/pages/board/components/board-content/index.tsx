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
import { useSelector } from 'react-redux'
import { MouseSensor, TouchSensor } from '~/custom/dnd-kit'
import { ICard, IColumn } from '~/interfaces/board.interface'
import { selectActiveBoard } from '~/redux/board/board.slice'
import { generatePlaceholderCard, mapOrder } from '~/utils/formatter'
import CardItem from '../card-item'
import Column from '../column'
import Columns from '../columns'

const CONSTANTS = {
	DRAG_END: 'dragend',
	DRAG_OVER: 'dragover',
}

interface props {
	handleCardOrderIds: (columnId: string, cardOrderIds: string[]) => void
	handleOrderColumnIds: (columnOrderIds: string[]) => void
	handleMoveCardBetweenColumns: (
		currentCardId: string,
		oldColumnId: string,
		newColumnId: string,
		nextActiveColumn: IColumn,
		cardOrderIdsNextColumn: IColumn,
	) => void
}

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
	CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

const BoardContent = ({
	handleCardOrderIds,
	handleOrderColumnIds,
	handleMoveCardBetweenColumns,
}: props) => {
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

	console.log('rerender')

	const sensors = useSensors(mouseSensor, touchSensor)
	const [orderedColumns, setOrderedColumns] = useState<IColumn[]>([])
	const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
		null,
	)
	const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
	const [activeDragItemData, setActiveDragItemData] = useState<
		IColumn | ICard | null
	>(null)
	const [columnOnStartDrag, setColumnOnStartDrag] = useState<IColumn | null>(
		null,
	)
	const dropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: '0.5',
				},
			},
		}),
	}
	const lastOverId = useRef<string | null>(null)
	const board = useSelector(selectActiveBoard)

	useEffect(() => {
		setOrderedColumns(board.columns)
	}, [board])

	const findColumnByCardId = (id: string) => {
		const result = orderedColumns.find((column) =>
			column?.cards?.map((card: ICard) => card._id)?.includes(id),
		) as IColumn

		const cards = mapOrder(result?.cards, result?.cardOrderIds, '_id')

		return {
			...result,
			cards,
		} as IColumn
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
		activeColumn: IColumn,
		overColumn: IColumn,
		triggerFrom: string,
	) => {
		setOrderedColumns((prevColumn) => {
			const overCardIndex = overColumn.cards.findIndex(
				(card) => card._id === over.id,
			)

			let newCardIndex

			newCardIndex =
				overCardIndex >= 0 ? overCardIndex : overColumn?.cards?.length + 1
			let nextColumns = structuredClone(prevColumn) as IColumn[]

			nextColumns = nextColumns.map((column) => {
				column.cards = column.cards.filter(
					(card) => card._id !== activeDragItemData?._id,
				)
				// empty column
				if (column._id === activeColumn._id && column.cards.length === 0) {
					const cardPlacerholder = generatePlaceholderCard(column)
					column.cards.push(cardPlacerholder)
					column.cardOrderIds = [cardPlacerholder._id]
				}
				return column
			})

			const nextActiveColumn = nextColumns.find(
				(column) => column._id === columnOnStartDrag?._id,
			)

			const nextOverColumn = nextColumns.find(
				(column) => column._id === overColumn._id,
			)

			if (nextActiveColumn) {
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(card) => card._id !== activeDragItemData?._id,
				)

				// update card order ids
				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
					(card) => card._id,
				)
			}

			if (nextOverColumn) {
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(card) => card._id !== active.id && !card.FE_PLACEHOLDER,
				)
				nextOverColumn.cardOrderIds = nextOverColumn.cards
					.filter((card) => !card.FE_PLACEHOLDER)
					.map((card) => card._id)

				const rebuildCardItemData = {
					...activeDragItemData,
					columnId: overColumn._id,
				}

				nextOverColumn.cards.splice(
					newCardIndex,
					0,
					rebuildCardItemData as ICard,
				)

				nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
					(card) => card._id,
				)
			}

			if (triggerFrom === CONSTANTS.DRAG_END) {
				handleMoveCardBetweenColumns(
					activeDragItemData?._id as string,
					columnOnStartDrag?._id!,
					overColumn._id,
					nextActiveColumn as IColumn,
					nextOverColumn as IColumn,
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
		setActiveDragItemData(active?.data.current as IColumn | ICard)
		if (active?.data.current?.columnId) {
			setColumnOnStartDrag(findColumnByCardId(active.id as string) as IColumn)
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
				moveCardBetweenDifferentColumns(
					active,
					over,
					activeColumn,
					overColumn,
					CONSTANTS.DRAG_END,
				)
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

				const cardOrderIds = sortedCards.map((card) => card._id)

				handleCardOrderIds(columnOnStartDrag._id, cardOrderIds)

				setOrderedColumns((prevColumn) => {
					const nextColumns = structuredClone(prevColumn) as IColumn[]

					const nextColumn = nextColumns.find(
						(column) => column._id === columnOnStartDrag._id,
					)

					if (nextColumn) {
						nextColumn.cards = sortedCards
						nextColumn.cardOrderIds = cardOrderIds
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

				const newColumnOrderIds = sortedColumns.map((column) => column._id)
				handleOrderColumnIds(newColumnOrderIds)
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
			moveCardBetweenDifferentColumns(
				active,
				over,
				activeColumn,
				overColumn,
				CONSTANTS.DRAG_OVER,
			)
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
						<Column column={activeDragItemData as IColumn} />
					) : (
						<CardItem card={activeDragItemData as ICard} />
					)}
				</DragOverlay>
				<Columns columns={orderedColumns} />
			</Box>
		</DndContext>
	)
}

export default BoardContent
