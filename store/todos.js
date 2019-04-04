export const state = () => ({
  list: []
})

export const mutations = {
  add(state, data) {
    state.list = data
  }
}
