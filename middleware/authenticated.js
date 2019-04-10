// 定义了一个auth中间件， 如果用户未登录， 则跳转登录页。
export default function ({
  store,
  redirect
}) {
  if (!store.state.user) {
    return redirect('/login')
  }
}

//页面单独使用
// export default {
//   middleware: 'auth'
// }

// ///全局使用
// module.exports = {
//   router: {
//     middleware: 'auth'
//   }
// }
