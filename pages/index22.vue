<template>
  <section>
    <div>
      <el-button type="primary" :loading="btnLoading" class="mb15">修改</el-button>
      <el-row class="info">
        <el-col :span="12">创建时间：{{ gmt | formatDate('yyyy-MM-dd') }}</el-col>
        <el-col :span="12">更新时间：{{ upt | formatDate('yyyy-MM-dd') }}</el-col>
        <el-col :span="12">服务费率：{{ service }}</el-col>
        <el-col :span="12">最低充值金额：{{ min }}</el-col>
        <el-col :span="12">最高充值金额：{{ max }}</el-col>
        <el-col :span="12">扫码支付类型：{{ codeType }}</el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      id: null,
      addName: '',
      gmt: null,
      upt: null,
      service: '', // 服务费率
      min: '', // 最低充值金额
      max: '', // 最高充值金额
      codeType: '' // 扫码
    }
  },
  computed: {
    ...mapState('ditch',['list', 'dialogVisible','loading','btnLoading'])
  },
  mounted () {
    this.tabClick()
  },
  methods: {
    ...mapMutations('ditch',{
      mapVisible: 'changeVisible',
      mapLoading: 'changeLoading',
      mapBtnLoading: 'changeBtnLoading',
      mapcancel: 'cancel'
    }),
    tabClick () {
      this.$axios.post(this.jk.setting,{configType: 'SERVER_RATE'})
        .then(res => {
          if(res.success){
            this.gmt = res.data.gmt
            this.upt = res.data.upt
            this.service = res.data.configValue
          }
        })
        .catch(e => {
          console.log(e)
        })
      this.$axios.post(this.jk.setting,{configType: 'MINI_MONEY'})
        .then(res => {
          if(res.success){
            this.min = res.data.configValue
          }
        })
        .catch(e => {
          console.log(e)
        })
      this.$axios.post(this.jk.setting,{configType: 'MAX_MONEY'})
        .then(res => {
          if(res.success){
            this.max = res.data.configValue
          }
        })
        .catch(e => {
          console.log(e)
        })
      this.$axios.post(this.jk.setting,{configType: 'CODE_TYPE'})
        .then(res => {
          if(res.success){
            // this.min = res.data.configValue
            if(res.data.configValue === '0'){
              this.codeType = '官方'
            }else{
              this.codeType = 'p++'
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.info{
  color:#5e6d82;
  font-size:14px;
  padding-top:20px
}
.info .el-col-12{
  padding-bottom:10px
}
</style>
