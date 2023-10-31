import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: "http://siyu.site:8270",
  timeout: 5000
})

service.interceptors.request.use(
	config => {
		const identifier = window.localStorage.getItem('identifier')
		if (identifier && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
			config.headers.identifier = identifier
		}
		return config
	}
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 2000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const identifier = response.headers.identifier
      if (identifier) {
        window.localStorage.setItem('identifier', identifier)
      }
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
