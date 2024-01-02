import axios from 'axios'
import { useLogin } from '@/stores/login'
const Axios = axios.create({
  baseURL: 'https://api.ai-code-debug.com'
})

// http request 拦截器
Axios.interceptors.request.use(
  (config) => {
    // 发送请求前的处理

    // // 这里可以处理 token
    // 这里可以处理 token
    const stores = useLogin()
    if (stores.token) {
      config.headers.Authorization = stores.token
    }

    return config
  },
  (err) => {
    // 请求错误的处理
    return Promise.reject(err)
  }
)

// http response 拦截器
Axios.interceptors.response.use(
  //处理响应数据
  (response) => {
    if (response.headers['x-wp-total']) {
      // console.log("in total");
      response.data.article_total = response.headers['x-wp-total']
    }
    return response.data
  },
  // 抛出错误
  (error) => {
    if (error.response.status === 403) {
      showNotify({
        message: 'User is not logged in or the authentication has expired. Please log in again',
        color: '#ad0000',
        background: '#ffe1e1'
      })
      const router = useRouter()
      // if (process.client) {
      const stores = useLogin()
      stores.logout()
      // }
      router.push('/')
    }
    return Promise.reject(error.response)
  }
)

export default Axios
