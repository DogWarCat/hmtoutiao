// - main.js中不负责组件的注册，所有的全局组件的注册提取出去。
// - 封装一个插件，注册所有的全局组件。
// - 基于vue的插件：
// - 是一个js模块
//     - 导出一个对象
//     - 对象中必须有一个选项：install
//         - 指定的是一个函数
//         - 默认的传参  Vue 对象
//             - 基于 Vue 对象做任何事情
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
    Vue.component('my-image', MyImage)
  }
}
