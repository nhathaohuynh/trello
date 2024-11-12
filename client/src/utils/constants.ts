export const ROOT_API = 'http://localhost:8000/api/v1/trello'

export const PATH_APP = {
	BASE_NAME: '/',
	DASHBOARD: '/dashboard',
	SETTING_ACCOUNT: '/setting/account',
	SETTING_SECURITY: '/setting/security',
	BOARD_DETAIL: '/boards/:boardId',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/fotgot-password',
	VERIFICATION_TOKEN: '/verify',
	TO_NOT_FOUND: '/404',
	NOT_FOUND: '*',
}

export const LITMIT_COMMON_FILE_SIZE = 1024 * 1024 * 10 // 10MB
export const ALLOW_FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg']
