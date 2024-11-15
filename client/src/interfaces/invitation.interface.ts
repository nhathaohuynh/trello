import { IBoard } from './board.interface'
import { IUser } from './user.interface'

const INVITATION_STATUS = {
	PENDING: 'PENDING',
	ACCEPTED: 'ACCEPTED',
	REJECTED: 'REJECTED',
}

export interface IInvitation {
	_id: string
	inviter: IUser
	invitee: IUser
	board: IBoard
	status: typeof INVITATION_STATUS
	createdAt: Date
	updatedAt: Date
}
