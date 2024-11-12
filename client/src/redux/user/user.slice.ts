import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginAPI, LogoutAPI, updateInformationAPI } from '~/apis/user.api'
import { IUser } from '~/interfaces/user.interface'
import { RootState } from '../store'

const initialActiveBoard: { user: IUser | null } = {
	user: null,
}

const PREFIX_NAME_THUNK = {
	USER_LOGIN: 'user/login',
	USER_LOGOUT: 'user/logout',
	UPDATE_INFORMATION: 'user/update-information',
}

export const userLogin = createAsyncThunk<
	IUser,
	{ email: string; password: string }
>(
	PREFIX_NAME_THUNK.USER_LOGIN,
	async (payload: { email: string; password: string }) => {
		const data = await LoginAPI(payload)
		return data
	},
)

export const userLogout = createAsyncThunk(
	PREFIX_NAME_THUNK.USER_LOGOUT,
	async ({ showSuccessMessage }: { showSuccessMessage?: boolean }) => {
		const data = await LogoutAPI()

		if (showSuccessMessage) {
			toast.success('Logged out successfully')
		}
		return data
	},
)

export const userUpdateInformation = createAsyncThunk<
	IUser,
	{ avatar?: FormData; username?: string; phone?: string; address?: string }
>(
	PREFIX_NAME_THUNK.UPDATE_INFORMATION,
	async (payload: {
		avatar?: FormData
		username?: string
		phone?: string
		address?: string
	}) => {
		const data = await updateInformationAPI(payload)
		return data
	},
)

const userSlice = createSlice({
	name: 'user',
	initialState: initialActiveBoard,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(
			userLogin.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.user = action.payload
			},
		)
		builder
			.addCase(userLogout.fulfilled, (state) => {
				state.user = null
			})
			.addCase(
				userUpdateInformation.fulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.user = action.payload
				},
			)
	},
})

export const selectCurrentUser = (state: RootState) => state.userReducer.user!

export const UserReducer = userSlice.reducer
