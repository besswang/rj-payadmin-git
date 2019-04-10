export const state = () => ({
  page: '/users',
  user: ''
})

export const mutations = {
  changePage (state, data) {
    state.page = data
  },
  saveUser (state, data) {
    state.user = data
  }
}
