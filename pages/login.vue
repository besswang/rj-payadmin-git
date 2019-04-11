<template>
  <div id="login">
    <div class="login-con">
      <el-form :model="loginForm" status-icon :rules="ruleLogin" ref="loginForm">
        <el-form-item prop="userNumber">
          <el-input type="tel" v-model.number="loginForm.userNumber" placeholder="用户名" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goLogin('loginForm')" style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      fullscreenLoading: false,
      loginForm: {
        userNumber: null, // admin
        password: null // 123456
      },
      ruleLogin: {
        userNumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$axios.post(this.jk.login, this.loginForm)
              .then(res => {
                if(res.success){
                  this.$store.commit('saveUserId',res.data);
                  window.sessionStorage.setItem('userId', res.data)
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  this.$router.push('/users')
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  })
                  this.$refs[formName].resetFields()
                }
                setTimeout(() => {
                  this.fullscreenLoading = false
                }, 500)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
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
