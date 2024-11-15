import { IComment } from './comment.interface'
import { IUser } from './user.interface'

export interface IAttachment {
	attachment: string
}

export interface ICard {
	_id: string
	boardId: string
	columnId: string
	description?: string
	title: string
	cover: string | null
	ownerIds: IUser[]
	memberIds: IUser[]
	comments: IComment[]
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
	cover?: string
	type: 'public' | 'private'
	ownerIds: IUser[]
	memberIds: IUser[]
	columnOrderIds: string[]
	columns: IColumn[]
}

export type ICreateColumn = Pick<IColumn, 'title' | 'boardId'>

export type ICreateCard = Pick<ICard, 'title' | 'columnId' | 'boardId'>

export interface Response<T> {
	message: string
	statusCode: number
	data: T
}
