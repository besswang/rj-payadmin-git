export const state = () => ({
  counter: 666,
  page: '/users',
  user: ''
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  changePage (state, data) {
    state.page = data
  },
  saveUser (state, data) {
    state.user = data
  }
}
