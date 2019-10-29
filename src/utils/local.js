// 设置sessionstorage的原因是因为axios的拦截器是在请求发送前即
// then之前进行拦截的，也就是说登录的用户还没有在then里面进行处理时就已经触发了
// 拦截器，所以说如果在登录时就通过拦截器来设置是行不通的，此时的token还是空的
// 所以才有了先把用户登录信息存储在本地存储sessionStorage里后期进入主页时，发送请求获取后台文章信息
// 时再讲本地存储sessionStorage里面的用户信息取出来放进axios的头部中
const KEY = 'hm-toutiao-pc-84-user-key'
export default {
  setUser (user) {
    const userStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, userStr)
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
