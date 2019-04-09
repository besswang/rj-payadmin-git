export const state = () => ({
  counter: 666,
  page: '/'
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  changePage (state, data) {
    state.page = data
  }
}
