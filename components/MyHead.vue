<template>
  <div class="my-head">
    <ul class="flex flex-direction_row justify-content_flex-justify">
      <li class="header-title">xxx后台</li>
      <li class="flex flex-direction_row justify-content_flex-center align-items_center">
        <div>用户ID：<span v-text="userId"></span></div>
        <div class="flex justify-content_flex-center round ml30">
          <img src="~/assets/images/a.jpg" alt="">
        </div>
        <el-dropdown class="ml30" @command="handleCommand">
          <span class="el-dropdown-link">
            设置<i class="el-icon-setting el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command='0'>修改密码<i class="el-icon-edit el-icon--right"></i></el-dropdown-item>
            <el-dropdown-item :command='1'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <el-dialog title="修改密码" :visible.sync="setVisible" style="max-width:50rem;margin:0 auto" :show-close="false">
      <el-form :model="set" :rules="ruleSet" ref="set">
        <el-form-item prop="id">
          <el-input v-model="set.id" auto-complete="off" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="set.password" auto-complete="off" placeholder="新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('set')">取 消</el-button>
        <el-button type="primary" @click="save('set')" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userId: null,
      setVisible: false,
      set: {
        id: null,
        password: null
      },
      ruleSet: {
        id: [
          { required: true, message: '请输入用户id', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['dialogVisible', 'btnLoading']),
  },
  mounted () {
    this.uid()
  },
  methods: {
    ...mapMutations('ditch',{
      mapBtnLoading: 'changeBtnLoading'
    }),
    uid () {
      let id = window.sessionStorage.getItem('userId')
      this.userId = id
    },
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mapBtnLoading()
          this.$axios.post(this.jk.changePassword, this.set)
            .then(res => {
              if(res.success){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.setVisible = false
                this.mapBtnLoading()
                setTimeout(() => {
                  this.$message({
                    message: '请重新登陆',
                    type: 'warning'
                  })
                  this.$router.push('/login')
                  window.sessionStorage.setItem('userId','')
                }, 1000)
              }else{
                this.$message.error(res.msg)
                this.$refs[formName].resetFields()
              }
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    cancel (formName) {
      this.setVisible=false
      this.$refs[formName].resetFields()
    },
    handleCommand(command) {
      if (command === 0) { // 修改
        this.setVisible = true
      } else { // 退出
       this.$confirm('是否退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          window.sessionStorage.setItem('userId','')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-head
  color #fff
  .header-title
    line-height 60px
    font-weight normal
    font-size 18px
  .round
    width 2.5rem
    height 2.5rem
    border-radius 50%
    border .125rem solid #7dbafa
    overflow hidden
    img
      width 100%
  .el-dropdown-link
    cursor pointer
    color #fff
  .el-icon-arrow-down
    font-size 12px
</style>
