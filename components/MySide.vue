<template>
  <div class="side-con">
    <el-aside width="200px">
      <el-menu
        router
        :default-active="navselected"
        @select="selectItems"
        class="el-menu-vertical-demo">
        <el-menu-item index="/users">
          <span slot="title">全局配置</span>
        </el-menu-item>
        <el-menu-item index="/users/ditch">
          <span slot="title">渠道列表</span>
        </el-menu-item>
        <el-menu-item index="/users/topUpType">
          <span slot="title">充值类型列表</span>
        </el-menu-item>
        <el-menu-item index="/users/topUpMoney">
          <span slot="title">充值金额列表</span>
        </el-menu-item>
        <el-menu-item index="/users/topUpMethod">
          <span slot="title">支付方式列表</span>
        </el-menu-item>
        <el-menu-item index="/users/orders">
          <span slot="title">订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <div class="menu-patch"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navselected: this.$store.state.page
    }
  },
  methods: {
    getNavType(){
      this.navselected = this.$store.state.page
    },
    selectItems(path){
      this.$store.commit('changePage', path);
      //按钮选中之后设置当前的index为store里的值。
      this.$router.push({
          path,
          query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }
      })
    }
  },
  watch: {
      '$store.state.page': 'getNavType'
  }
}
</script>
<style lang="stylus" scoped>
.side-con
  height 100%
  .menu-patch
    height calc(100% - 336px)
    border-right solid 1px #e6e6e6
</style>
