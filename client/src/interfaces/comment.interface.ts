import { IUser } from './user.interface'

export interface IComment {
	_id: string
	content: string
	cardId: string
	user: IUser
	parent: string | null
}

export type InputComment = Pick<IComment, 'content' | 'cardId' | 'parent'> & {
	user: string
}
