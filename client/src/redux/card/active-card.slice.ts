import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICard } from '~/interfaces/board.interface'
import { RootState } from '../store'

const initialState: { card: ICard | null } = {
	card: null,
}

const activeCadSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		clearActiveCard: (state) => {
			state.card = null
		},

		updateActiveCard: (state, action: PayloadAction<ICard>) => {
			const card = action.payload

			state.card = card
		},
	},
})

export const { clearActiveCard, updateActiveCard } = activeCadSlice.actions

export const selectActiveCard = (state: RootState) => state.cardReducer.card!

export const CardReducer = activeCadSlice.reducer
