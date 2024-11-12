import axios from 'axios'
import { toast } from 'react-toastify'
import { RefreshTokenAPI } from '~/apis/user.api'
import { AppStore } from '~/redux/store'
import { userLogout } from '~/redux/user/user.slice'
import { ROOT_API } from '~/utils/constants'
import { interceptorLoadingElement } from '~/utils/formatter'

let storeInject: AppStore // Declare the store variable as `let` to allow reassignment

export const injectStore = (_store: AppStore) => {
	storeInject = _store
}

const AxiosInstance = axios.create({})
AxiosInstance.defaults.timeout = 1000 * 60 * 10
AxiosInstance.defaults.baseURL = ROOT_API
AxiosInstance.defaults.withCredentials = true
AxiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
AxiosInstance.interceptors.request.use(
	(config) => {
		interceptorLoadingElement(true)
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// Add a response interceptor

let refreshPromise: Promise<string | void> | null = null

AxiosInstance.interceptors.response.use(
	(response) => {
		interceptorLoadingElement(false)
		return response
	},
	(error) => {
		interceptorLoadingElement(false)

		if (error?.response?.status === 401) {
			storeInject.dispatch(userLogout({ showSuccessMessage: false }))
		}

		const originalRequests = error.config

		if (error?.response?.status === 410 && !originalRequests._retry) {
			originalRequests._retry = true

			if (!refreshPromise) {
				refreshPromise = RefreshTokenAPI()
					.then((res) => {
						return res.id
					})
					.catch((err) => {
						storeInject.dispatch(userLogout({ showSuccessMessage: false }))
						return Promise.reject(err)
					})
					.finally(() => {
						refreshPromise = null
					})
			}

			return refreshPromise.then((_) => {
				return AxiosInstance(originalRequests)
			})
		}

		let errorMessage =
			JSON.parse(error?.response?.data?.message) || JSON.parse(error.message)
		if (error?.response?.status !== 410) {
			if (typeof errorMessage === 'string') {
				toast.error(JSON.parse(errorMessage))
			} else {
				const message = Object.values(errorMessage[0]) as [[string]]
				toast.error(message[0][0] as string)
			}
		}
		return Promise.reject(error)
	},
)

export default AxiosInstance
