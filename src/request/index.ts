import axios from 'axios'
const service = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/e81d3e223d583d40162d6f2d61b12866/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})
// 响应拦截
service.interceptors.response.use(
  (res) => {
    const code: number = res.data.code
    // if (code === 400) {
    //   return Promise.reject(res.data)
    // }
    if (code != 200 && code != 0) {
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  },
  (err) => {
    console.log(err)
  }
)

export default service
