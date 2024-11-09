import AxiosInstance from '~/custom/axios'
import {
	IBoard,
	ICard,
	IColumn,
	ICreateCard,
	ICreateColumn,
	Response,
} from '~/interfaces/board.interface'

export const getBoardDetailAPI = async (boardId: string) => {
	const response = await AxiosInstance.get(`/boards/${boardId}`)
	return response.data.data
}

export const createColumnAPI = async (
	data: ICreateColumn,
): Promise<IColumn> => {
	const response = await AxiosInstance.post<Response<IColumn>>(`/columns`, data)
	return response.data.data
}

export const createCardAPI = async (data: ICreateCard): Promise<ICard> => {
	const response = await AxiosInstance.post<Response<ICard>>(`/cards`, data)
	return response.data.data
}

export const updateOrderColumnIdsBoardAPI = async (
	boardId: string,
	data: Partial<IBoard>,
): Promise<IBoard> => {
	const response = await AxiosInstance.put<Response<IBoard>>(
		`/boards/${boardId}`,
		data,
	)
	return response.data.data
}

export const updateCardOrderIdsColumnAPI = async (
	columnId: string,
	data: Partial<IColumn>,
): Promise<IColumn> => {
	const response = await AxiosInstance.put<Response<IColumn>>(
		`/columns/${columnId}`,
		data,
	)
	return response.data.data
}

export const updateCardAPI = async (
	cardId: string,
	data: Partial<ICard>,
): Promise<ICard> => {
	const response = await AxiosInstance.put<Response<ICard>>(
		`/cards/${cardId}`,
		data,
	)
	return response.data.data
}

export const moveCardBetweenColumnsAPI = async (data: {
	cardId: string
	columnId: string
	newColumnId: string
	cardOrderIds: string[]
}): Promise<IColumn> => {
	const response = await AxiosInstance.put<Response<IColumn>>(
		`/columns/move-card-between-columns`,
		data,
	)
	return response.data.data
}
