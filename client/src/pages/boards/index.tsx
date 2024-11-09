import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	createCardAPI,
	createColumnAPI,
	moveCardBetweenColumnsAPI,
	updateCardAPI,
	updateCardOrderIdsColumnAPI,
	updateOrderColumnIdsBoardAPI,
} from '~/apis'
import Appbar from '~/components/appbar'
import Loading from '~/components/loading'
import {
	IColumn,
	ICreateCard,
	ICreateColumn,
} from '~/interfaces/board.interface'
import {
	getBoardsDetail,
	selectActiveBoard,
	setActiveBoard,
} from '~/redux/board/board.slice'
import { useAppDispatch } from '~/redux/store'
import { generatePlaceholderCard } from '~/utils/formatter'
import BoardBar from './components/board-bar'
import BoardContent from './components/board-content'

function Board() {
	// const boardId = '672de19a44ebcf44ee13d514'
	const { boardId } = useParams()
	const dispatch = useAppDispatch()
	const activeBoard = useSelector(selectActiveBoard)

	useEffect(() => {
		dispatch(getBoardsDetail(boardId as string))
	}, [])

	const handleAddColumn = async (title: string) => {
		const data: ICreateColumn = {
			boardId: boardId as string,
			title,
		}

		const boardClone = structuredClone(activeBoard)
		if (boardClone) {
			const newColumn = await createColumnAPI(data)
			const cardPlacerholder = generatePlaceholderCard(newColumn)

			newColumn.cards = [cardPlacerholder]
			newColumn.cardOrderIds = [cardPlacerholder._id]

			const newColumns = [...boardClone.columns, newColumn]
			const newColumnOrderIds = [...boardClone.columnOrderIds, newColumn._id]
			const newBoard = {
				...boardClone,
				columns: newColumns,
				columnOrderIds: newColumnOrderIds,
			}
			dispatch(setActiveBoard(newBoard))
		}
	}

	const handleAddCard = async (columnId: string, title: string) => {
		const data: ICreateCard = {
			columnId,
			title,
			boardId: boardId as string,
		}

		const newCard = await createCardAPI(data)

		const boardClone = structuredClone(activeBoard)

		if (boardClone) {
			const newColumns = boardClone.columns.map((column) => {
				if (column._id === columnId) {
					column.cards = [...column.cards, newCard]
					column.cardOrderIds = [...column.cardOrderIds, newCard._id]

					// remove placeholder card
					column.cards = column.cards.filter((card) => !card?.FE_PLACEHOLDER)

					column.cardOrderIds = column.cards
						.filter((card) => !card?.FE_PLACEHOLDER)
						.map((card) => card._id)
				}

				return column
			})

			const newBoard = {
				...boardClone,
				columns: newColumns,
			}

			dispatch(setActiveBoard(newBoard))
		}
	}

	const handleOrderColumnIds = (orderColumnIds: string[]) => {
		const boardClone = structuredClone(activeBoard)
		if (boardClone) {
			const newColumnOrderIds = orderColumnIds
			const newBoard = {
				...boardClone,
				columnOrderIds: newColumnOrderIds,
			}
			dispatch(setActiveBoard(newBoard))
			updateOrderColumnIdsBoardAPI(boardClone._id, {
				columnOrderIds: newColumnOrderIds,
			})
		}
	}

	const handleCardOrderIds = (columnId: string, cardOrderIds: string[]) => {
		const boardClone = structuredClone(activeBoard)
		if (boardClone) {
			const newColumns = boardClone.columns.map((column) => {
				if (column._id === columnId) {
					column.cardOrderIds = cardOrderIds
				}
				return column
			})

			const newBoard = {
				...boardClone,
				columns: newColumns,
			}
			dispatch(setActiveBoard(newBoard))

			updateCardOrderIdsColumnAPI(columnId, { cardOrderIds: cardOrderIds })
		}
	}

	const handleMoveCardBetweenColumns = (
		currentCardId: string,
		oldColumnId: string,
		newColumnId: string,
		activeColumn: IColumn,
		nextColumn: IColumn,
	) => {
		const boardClone = structuredClone(activeBoard)

		if (boardClone) {
			const newColumns = boardClone.columns.map((column) => {
				if (column._id === oldColumnId) {
					column = activeColumn
				}

				if (column._id === newColumnId) {
					column = nextColumn
				}

				return column
			})

			//  Old coloumn is empty replace with placeholder card

			newColumns.forEach((column) => {
				if (column._id === oldColumnId && column.cardOrderIds.length === 0) {
					const cardPlacerholder = generatePlaceholderCard(column)
					column.cards = [cardPlacerholder]
					column.cardOrderIds = [cardPlacerholder._id]
				}
			})

			const newBoard = {
				...boardClone,
				columns: newColumns,
			}

			dispatch(setActiveBoard(newBoard))

			Promise.all([
				updateCardAPI(currentCardId, { columnId: newColumnId }),
				moveCardBetweenColumnsAPI({
					cardId: currentCardId.toString(),
					columnId: oldColumnId.toString(),
					newColumnId: newColumnId.toString(),
					cardOrderIds: nextColumn.cardOrderIds,
				}),
			])
		}
	}

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh', maxHeight: '100vh' }}
		>
			{activeBoard ? (
				<>
					<Appbar />
					<BoardBar board={activeBoard} />
					<BoardContent
						board={activeBoard}
						handleAddCard={handleAddCard}
						handleAddColumn={handleAddColumn}
						handleCardOrderIds={handleCardOrderIds}
						handleOrderColumnIds={handleOrderColumnIds}
						handleMoveCardBetweenColumns={handleMoveCardBetweenColumns}
					/>
				</>
			) : (
				<Loading message='Loading data, please wait...' />
			)}
		</Container>
	)
}

export default Board
