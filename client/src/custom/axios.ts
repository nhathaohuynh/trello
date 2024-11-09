import axios from 'axios'
import { toast } from 'react-toastify'
import { ROOT_API } from '~/utils/constants'
import { interceptorLoadingElement } from '~/utils/formatter'

const AxiosInstance = axios.create({})

AxiosInstance.defaults.timeout = 1000 * 60 * 10
AxiosInstance.defaults.baseURL = ROOT_API
// AxiosInstance.defaults.withCredentials = true

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

AxiosInstance.interceptors.response.use(
	(response) => {
		interceptorLoadingElement(false)
		return response
	},
	(error) => {
		interceptorLoadingElement(false)
		let errorMessage = error?.response?.data?.message || error.message
		if (error?.response?.status !== 410) {
			toast.error(errorMessage)
		}
		return Promise.reject(error)
	},
)

export default AxiosInstance
