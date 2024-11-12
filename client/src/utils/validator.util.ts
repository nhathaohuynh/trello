import { ALLOW_FILE_TYPE, LITMIT_COMMON_FILE_SIZE } from './constants'

export const singleFileValidation = (file: File) => {
	if (!file.size || !file.name || !file.type) return 'File can not blank'

	if (file.size > LITMIT_COMMON_FILE_SIZE) return 'Maximum file size is 10MB'

	if (!ALLOW_FILE_TYPE.includes(file.type)) return 'File type is not supported'

	return null
}
