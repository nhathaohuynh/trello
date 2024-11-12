export interface IAttachment {
	attachment: string
}

export interface IComment {
	comment: string
}

export interface ICard {
	_id: string
	boardId: string
	columnId: string
	title: string
	cover: string | null
	memberIds: string[]
	comments: string[]
	attachments: string[]
	FE_PLACEHOLDER?: boolean
}

export interface IColumn {
	_id: string
	boardId: string
	description: string
	title: string
	cardOrderIds: string[]
	cards: ICard[]
}

export interface IBoard {
	_id: string
	title: string
	description: string
	type: 'public' | 'private'
	ownerIds: string[]
	memberIds: string[]
	columnOrderIds: string[]
	columns: IColumn[]
}

export type ICreateColumn = Pick<IColumn, 'title' | 'boardId' | 'description'>

export type ICreateCard = Pick<ICard, 'title' | 'columnId' | 'boardId'>

export interface Response<T> {
	message: string
	statusCode: number
	data: T
}
