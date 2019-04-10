<template>
  <div id="login">
    <div class="login-con">
      <el-form :model="loginForm" status-icon :rules="ruleLogin" ref="loginForm">
        <el-form-item prop="userName">
          <el-input type="tel" v-model.number="loginForm.userName" placeholder="用户名" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goLogin('loginForm')" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: null,
        password: ''
      },
      ruleLogin: {
        userName: [
          { validator: this.$global.valiTel, trigger: 'blur' }
        ],
        password: [
          { validator: this.$global.valiPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin() {
      console.log('22')
      this.$store.commit('saveUser','wang');
      this.$router.push('/users')
    }
  }
}
</script>
<style scoped>
.login-con{
  padding:30px 30px 8px 30px;
  width:20%;
  min-width:360px;
  margin:0 auto;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  position: absolute;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align: center;
}
</style>
