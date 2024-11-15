import AxiosInstance from '~/custom/axios'
import { Response } from '~/interfaces/board.interface'
import { IInvitation } from '~/interfaces/invitation.interface'

export const createInvitationAPI = async (invitation: {
	inviteeEmail: string
	boardId: string
}): Promise<{ _id: string }> => {
	const res = await AxiosInstance.post<Response<{ _id: string }>>(
		'/invitations',
		invitation,
	)
	return res.data.data
}

export const getListInvitationAPI = async (): Promise<IInvitation[]> => {
	const res = await AxiosInstance.get<Response<IInvitation[]>>('/invitations')
	return res.data.data
}

export const updateInvitationAPI = async (
	invitationId: string,
	status: string,
): Promise<IInvitation> => {
	const res = await AxiosInstance.put<Response<IInvitation>>(
		`/invitations/${invitationId}`,
		{ status },
	)
	return res.data.data
}
