import AxiosInstance from '~/custom/axios'
import { Response } from '~/interfaces/board.interface'
import { IUser } from '~/interfaces/user.interface'

export const VerificationTokenAPI = async (data: {
	email: string
	token: string
}): Promise<{ _id: string }> => {
	const res = await AxiosInstance.post<Response<{ _id: string }>>(
		`/users/verify`,
		data,
	)

	return res.data.data
}

export const RegisterAPI = async (data: {
	email: string
	password: string
	username: string
}): Promise<{ _id: string }> => {
	const res = await AxiosInstance.post<Response<{ _id: string }>>(
		`/users/sign-up`,
		data,
	)

	return res.data.data
}

export const LoginAPI = async (data: {
	email: string
	password: string
}): Promise<IUser> => {
	const res = await AxiosInstance.post<Response<IUser>>(`/users/sign-in`, data)

	return res.data.data
}

export const LogoutAPI = async (): Promise<{ id: string }> => {
	const res = await AxiosInstance.delete<Response<{ id: string }>>(
		`/users/log-out`,
	)
	return res.data.data
}

export const RefreshTokenAPI = async (): Promise<{ id: string }> => {
	const res = await AxiosInstance.get<Response<{ id: string }>>(
		`/users/refresh-token`,
	)
	return res.data.data
}

export const updateInformationAPI = async (payload: {
	avatar?: FormData
	username?: string
	phone?: string
	address?: string
}): Promise<IUser> => {
	const data = payload.avatar ? payload.avatar : payload
	const res = await AxiosInstance.put<Response<IUser>>(
		`/users/update-information`,
		data,
		{
			headers: {
				'content-type': 'multipart/form-data',
				Accept: 'application/json',
			},
		},
	)
	return res.data.data
}

export const updatePasswordAPI = async (data: {
	password: string
	newPassword: string
}): Promise<{ id: string }> => {
	const res = await AxiosInstance.put<Response<{ id: string }>>(
		`/users/update-password`,
		data,
	)
	return res.data.data
}
