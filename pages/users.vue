<template>
  <div style="height:100%;">
    <!-- 框架英文：https://nuxtjs.org/guide/installation
    框架中文：https://nuxtjs.org/guide/installation -->
    <el-container style="height:100%;">
      <el-header class="header-con">
        <h1 class="header-title">xxx后台</h1>
      </el-header>
      <el-container style="height:100%;">
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
            </el-menu>
            <div class="menu-patch"></div>
        </el-aside>
        <el-main>
          <NuxtChild :key="key"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      navselected: this.$store.state.page
    }
  },
  computed: {
      key() {
          return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
  },
  methods: {
    getNavType(){
        this.navselected = this.$store.state.page
    },
    selectItems(path){
      console.log(path)
      this.$store.commit('changePage',path);
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
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.header-con{
  background:#409eff;
}
.header-title{
  line-height:60px;
  color:white;
  font-weight: normal;
  font-size:18px;
}
.menu-patch{
  height:calc(100% - 280px);
  border-right: solid 1px #e6e6e6;
}
</style>
