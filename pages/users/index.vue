<template>
  <section>
    <div>
      <el-tabs type="border-card" v-model="currentTab" @tab-click="tabClick">
        <el-tab-pane v-for="list in tabs"
          :key="list.name"
          :label="list.title"
          :name="list.name">
          <el-row class="info">
            <el-col :span="12">创建时间：{{ tabdata.gmt | formatDate('yyyy-MM-dd') }}</el-col>
            <el-col :span="12">更新时间：{{ tabdata.upt | formatDate('yyyy-MM-dd') }}</el-col>
            <el-col :span="12">{{ list.title }}：{{ tabdata.configValue }}</el-col>
            <el-col :span="12">
              <el-button type="primary" @click="edit">修改</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
          <!-- 添加弹窗-start -->
      <el-dialog title="修改" :visible.sync="dialogVisible" style="max-width:50rem;margin:0 auto" :show-close="false">
        <el-form label-width="140px">
          <el-form-item :label="dialogLabel">
            <el-input v-if="currentTab==='CODE_TYPE'" v-model="num" autocomplete="off"></el-input>
            <el-input v-else v-model="num" autocomplete="off" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="mapcancel">取 消</el-button>
          <el-button type="primary" @click="save" :loading="btnLoading">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加弹窗-end -->
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  name: 'users',
  components: {
    Logo
  },
  data () {
    return {
      dialogLabel: '',
      num: null,
      currentTab: 'SERVER_RATE',
      tabdata: {},
      tabs: [
        {
          title:'服务费率',
          name: 'SERVER_RATE'
        },{
          title:'最低充值金额',
          name: 'MINI_MONEY'
        },{
          title:'最高充值金额',
          name: 'MAX_MONEY'
        },{
          title:'扫码',
          name: 'CODE_TYPE'
        }
      ],
      id: null,
      addName: ''
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
      this.mapcancel()
      this.$axios.post(this.jk.setting,{configType: this.currentTab})
        .then(res => {
          if(res.success){
            // if(this.currentTab === 'CODE_TYPE'){
            //   if(res.data.configValue === '0'){
            //     res.data.configValue= '官方'
            //   } else {
            //     res.data.configValue = 'p++'
            //   }
            // }
            this.tabdata = res.data
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    edit() {
      this.dialogLabel = this.tabdata.title
      this.num = this.tabdata.configValue
      this.mapVisible()
    },
    save () {
      if(this.num !== ''){
        this.mapBtnLoading()
          this.$axios.post(this.jk.settingEdit,{id:this.tabdata.id,value:this.num})
            .then(res => {
              if(res.success){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.mapVisible()
                this.mapBtnLoading()
                this.tabClick()
              }else{
                this.$message.error(res.msg)
                this.addName = ''
              }
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        this.$message({
          message: '修改内容不能为空',
          type: 'warning'
        });
      }
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
