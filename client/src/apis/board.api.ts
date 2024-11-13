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

export const createCardAPI = async (
	data: ICreateCard | FormData,
): Promise<ICard> => {
	console.log('data', data)
	if (data instanceof FormData) {
		const response = await AxiosInstance.post<Response<ICard>>(`/cards`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data.data
	} else {
		const response = await AxiosInstance.post<Response<ICard>>(`/cards`, data)
		return response.data.data
	}
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

export const getListBoardsAPI = async (
	searchPath: string,
): Promise<{ boards: IBoard[]; total: number }> => {
	const response = await AxiosInstance.get<
		Response<{ boards: IBoard[]; total: number }>
	>(`/boards${searchPath}`)
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
	data: FormData | Partial<ICard>,
): Promise<ICard> => {
	if (data instanceof FormData) {
		const response = await AxiosInstance.put<Response<ICard>>(
			`/cards/${cardId}`,
			data,
		)
		return response.data.data
	} else {
		const response = await AxiosInstance.put<Response<ICard>>(
			`/cards/${cardId}`,
			data,
		)
		return response.data.data
	}
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

export const deleteCardAPI = async (
	cardId: string,
): Promise<{ id: string }> => {
	const response = await AxiosInstance.delete<Response<{ id: string }>>(
		`/cards/${cardId}`,
	)
	return response.data.data
}

export const deleteColumnAPI = async (
	columnId: string,
): Promise<{ id: string }> => {
	const response = await AxiosInstance.delete<Response<{ id: string }>>(
		`/columns/${columnId}`,
	)
	return response.data.data
}

export const createBoardAPI = async (data: FormData): Promise<IBoard> => {
	const response = await AxiosInstance.post<Response<IBoard>>(`/boards`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return response.data.data
}

export const updateColumnAPI = async (
	columnId: string,
	data: { title: string },
): Promise<IColumn> => {
	const response = await AxiosInstance.put<Response<IColumn>>(
		`/columns/${columnId}`,
		data,
	)
	return response.data.data
}
