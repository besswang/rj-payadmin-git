import Vue from 'vue'
// export const ADD_LIST = 'ADD_LIST' // 登陆后保存用户信息
export const state = () => ({
  list: [],
  dialogVisible: false,
  loading: false,
  btnLoading: false
})

export const mutations = {
  list (state, data) {
    state.list = data.list
  },
  toList (state, data) {
    state.list = data
  },
  changeVisible (state) {
    let flag = state.dialogVisible
    state.dialogVisible = !flag
  },
  changeLoading (state) {
    let flag = state.loading
    state.loading = !flag
  },
  changeBtnLoading (state) {
    let flag = state.btnLoading
    state.btnLoading = !flag
  },
  cancel(state){
    state.dialogVisible = false
    state.btnLoading = false
  }
}
