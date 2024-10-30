import { ColumnType } from '~/apis/mock-data'

export const capitalize = (str: string) => {
	if (!str) return ''
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const mapOrder = <T, K extends keyof T>(
	originalArray: T[],
	orderArray: T[K][],
	key: K,
): T[] => {
	if (!originalArray || !orderArray || !key) return []

	const arrayCopy = [...originalArray]

	const orderedArray = arrayCopy.sort(
		(a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]),
	)

	return orderedArray
}

export const generatePlaceholderCard = (column: ColumnType) => {
	return {
		_id: `${column._id}-placeholder-card`,
		boardId: column.boardId,
		columnId: column._id,
		FE_PLACEHOLDER: true,
		title: '',
		description: null,
		cover: null,
		memberIds: [],
		comments: [],
		attachments: [],
	}
}
