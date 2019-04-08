import Vue from 'vue'
// export const ADD_LIST = 'ADD_LIST' // 登陆后保存用户信息
export const state = () => ({
  list: [],
  dialogVisible: false
})

export const mutations = {
  list (state, data) {
    state.list = data.list
  },
  changeVisible (state) {
    let flag = state.dialogVisible
    state.dialogVisible = !flag
  }
}
