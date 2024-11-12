export interface IUser {
	_id: string
	email: string
	username: string
	avatar: string
	role: string
	phone?: string | null
	address?: string | null
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}
