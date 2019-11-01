import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [data => {
  // 对data进行格式转换  data就是后台响应的json字符串
  // 如果没数据呢？data === null 使用JSONBIG.parse(null) 报错
  try {
    // 如果不写try catch将正常的data分出去，axios响应拦截器处会
    // 报错误信息中找不到status错误，因为将正确的data也走了响应拦截器err部分
    return JSONBIG.parse(data)
  } catch (error) {
    // 如果是错误的直接返回错误信息就好了
    return data
  }
}]
// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 如果token不为空（在前面路由守卫处已经做了判断了）给请求头设置token
  //   设置可能等于空对象是因为登录页的时候，sessionStorage里面还没有token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => response
  , error => {
    // console.log(error.response)
    if (error.response.status === 401) {
      return router.push('/login')
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  })
export default axios
