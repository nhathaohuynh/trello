import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	getListInvitationAPI,
	updateInvitationAPI,
} from '~/apis/invitation.api'
import { IInvitation } from '~/interfaces/invitation.interface'
import { RootState } from '../store'

const PREFIX_NAME_THUNK = {
	GET_NOTIFICATIOn: 'notification/getNotification',
	UPDATE_NOTIFICATION: 'notification/updateNotification',
}

const initialState: { notification: IInvitation[] | null } = {
	notification: null,
}

export const getListNotification = createAsyncThunk<IInvitation[], void>(
	PREFIX_NAME_THUNK.GET_NOTIFICATIOn,
	async () => {
		const data = await getListInvitationAPI()
		return data
	},
)

export const updateNotification = createAsyncThunk<
	IInvitation,
	{ invitationId: string; status: string }
>(PREFIX_NAME_THUNK.UPDATE_NOTIFICATION, async ({ invitationId, status }) => {
	const data = await updateInvitationAPI(invitationId, status)
	return data
})

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		clearNotification: (state) => {
			state.notification = []
		},
		updateCurrentNotification: (
			state,
			action: PayloadAction<IInvitation[]>,
		) => {
			state.notification = action.payload
		},
		addNotfications: (state, action: PayloadAction<IInvitation>) => {
			state.notification?.unshift(action.payload)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getListNotification.fulfilled, (state, action) => {
				let inCommingInvitations = action.payload

				state.notification = Array.isArray(inCommingInvitations)
					? inCommingInvitations
					: []
			})
			.addCase(updateNotification.fulfilled, (state, action) => {
				const updatedInvitation = action.payload

				const index = state.notification?.findIndex(
					(invitation) => invitation._id === updatedInvitation._id,
				)

				if (!!index && index !== -1) {
					state.notification?.splice(index, 1, updatedInvitation)
				}
			})
	},
})

export const { addNotfications, clearNotification, updateCurrentNotification } =
	notificationSlice.actions

export const selectNotification = (state: RootState) =>
	state.notificationReducer.notification!

export const NotficationReducer = notificationSlice.reducer
