import { IColumn } from '~/interfaces/board.interface'

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

export const generatePlaceholderCard = (column: IColumn) => {
	return {
		_id: `${column._id}-placeholder-card`,
		boardId: column.boardId,
		description: '',
		columnId: column._id,
		FE_PLACEHOLDER: true,
		title: '',
		cover: null,
		memberIds: [],
		ownerIds: [],
		comments: [],
		attachments: [],
	}
}

export const interceptorLoadingElement = (calling: boolean) => {
	const elements = document.querySelectorAll<HTMLElement>(
		'.interceptor-loading',
	)
	for (let i = 0; i < elements.length; i++) {
		if (calling) {
			elements[i].style.opacity = '0.7'
			elements[i].style.pointerEvents = 'none'
		} else {
			elements[i].style.opacity = 'initial'
			elements[i].style.pointerEvents = 'initial'
		}
	}
}
