import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	moveCardBetweenColumnsAPI,
	updateCardAPI,
	updateCardOrderIdsColumnAPI,
	updateOrderColumnIdsBoardAPI,
} from '~/apis/board.api'
import Appbar from '~/components/appbar'
import { IColumn } from '~/interfaces/board.interface'
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
			<Appbar />
			<BoardBar />
			<BoardContent
				handleCardOrderIds={handleCardOrderIds}
				handleOrderColumnIds={handleOrderColumnIds}
				handleMoveCardBetweenColumns={handleMoveCardBetweenColumns}
			/>
		</Container>
	)
}

export default Board
