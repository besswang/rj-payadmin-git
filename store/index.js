export const state = () => ({
  page: '/users',
  userId: ''
})

export const mutations = {
  changePage (state, data) {
    state.page = data
  },
  saveUserId (state, data) {
    state.userId = data
  }
}
// export const actions = {
//   nuxtServerInit ({ commit }, { req }) {
//     if (req.session && req.session.userId) {
//       commit('saveUserId', req.session.userId)
//     }
//   }
// }
