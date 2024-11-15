import AxiosInstance from '~/custom/axios'
import { Response } from '~/interfaces/board.interface'
import { IComment, InputComment } from '~/interfaces/comment.interface'

export const createCommentAPI = async (
	data: InputComment,
): Promise<IComment> => {
	const res = await AxiosInstance.post<Response<IComment>>(`/comments`, data)

	return res.data.data
}

export const updateCommentAPI = async (data: { content: string }) => {
	const res = await AxiosInstance.put<Response<IComment>>(
		`/comments/${data.content}`,
		data,
	)
	return res.data.data
}

export const deleteCommentAPI = async (commentId: string) => {
	const res = await AxiosInstance.delete<Response<IComment>>(
		`/comments/${commentId}`,
	)
	return res.data.data
}

export const getCommentsAPI = async (cardId: string) => {
	const res = await AxiosInstance.get<Response<IComment>>(`/comments/${cardId}`)
	return res.data.data
}
