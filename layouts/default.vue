<template>
  <div>
    <!-- 框架英文：https://nuxtjs.org/guide/installation
    框架中文：https://nuxtjs.org/guide/installation -->
    <el-container>
      <el-header>xxx后台</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              router
              default-active="/"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-menu-item index="/setting">
                <span slot="title">全局配置</span>
              </el-menu-item>
              <el-menu-item index="/">
                <span slot="title">渠道列表</span>
              </el-menu-item>
              <el-menu-item index="/topUpType">
                <span slot="title">充值类型列表</span>
              </el-menu-item>
              <el-menu-item index="/topUpMoney">
                <span slot="title">充值金额列表</span>
              </el-menu-item>
              <el-menu-item index="/topUpMethod">
                <span slot="title">支付方式列表</span>
              </el-menu-item>
              <!-- <el-submenu index="2">
                <template slot="title">渠道管理</template>
                <el-menu-item index="2-1">渠道列表</el-menu-item>
                <el-menu-item index="2-1">充值类型列表</el-menu-item>
              </el-submenu> -->
            </el-menu>
        </el-aside>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
</style>
