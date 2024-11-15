import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBoardDetailAPI } from '~/apis/board.api'
import { IBoard } from '~/interfaces/board.interface'
import { generatePlaceholderCard, mapOrder } from '~/utils/formatter'
import { RootState } from '../store'

const initialActiveBoard: { currentBoard: IBoard | null } = {
	currentBoard: null,
}

const PREFIX_NAME_THUNK = {
	GET_BOARD_DETAIL: 'board/getBoards',
}

export const getBoardsDetail = createAsyncThunk<IBoard, string>(
	PREFIX_NAME_THUNK.GET_BOARD_DETAIL,
	async (boardId: string) => {
		const data = await getBoardDetailAPI(boardId)
		return data
	},
)

const boardSlice = createSlice({
	name: 'board',
	initialState: initialActiveBoard,
	reducers: {
		setActiveBoard: (state, action: PayloadAction<IBoard>) => {
			const board = action.payload

			board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

			board.columns.forEach((column) => {
				if (column.cards.length > 0) {
					column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
				} else {
					const cardPlacerholder = generatePlaceholderCard(column)
					column.cards = [cardPlacerholder]
					column.cardOrderIds = [cardPlacerholder._id]
				}
			})

			state.currentBoard = board
		},
		setEmptyActiveBoard: (state) => {
			state.currentBoard = null
		},
	},

	extraReducers: (builder) => {
		builder.addCase(
			getBoardsDetail.fulfilled,
			(state, action: PayloadAction<IBoard>) => {
				const board = action.payload

				board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

				board.columns.forEach((column) => {
					if (column.cards.length > 0) {
						column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
					} else {
						const cardPlacerholder = generatePlaceholderCard(column)
						column.cards = [cardPlacerholder]
						column.cardOrderIds = [cardPlacerholder._id]
					}
				})

				state.currentBoard = board
			},
		)
	},
})

export const selectActiveBoard = (state: RootState) =>
	state.boardReducer.currentBoard!

export const { setActiveBoard, setEmptyActiveBoard } = boardSlice.actions
export const BoardReducer = boardSlice.reducer
