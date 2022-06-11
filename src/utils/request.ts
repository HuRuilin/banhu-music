import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
