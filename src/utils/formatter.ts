export const capitalize = (str: string) => {
	if (!str) return ''
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const mapOrder = (
	originalArray: any[],
	orderArray: any[],
	key: string,
) => {
	if (!originalArray || !orderArray || !key) return []

	const arrayCopy = [...originalArray]

	const orderedArray = arrayCopy.sort(
		(a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]),
	)

	return orderedArray
}
