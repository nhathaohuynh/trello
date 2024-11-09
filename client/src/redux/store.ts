import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { BoardReducer } from './board/board.slice'

export const store = configureStore({
	reducer: {
		boardReducer: BoardReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
