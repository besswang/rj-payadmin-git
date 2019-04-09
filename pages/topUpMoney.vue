<template>
  <section>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" class="mb15" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.gmt | formatDate('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="修改时间"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.upt | formatDate('yyyy-MM-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status | bel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹窗-start -->
      <el-dialog :title="title" :visible.sync="dialogVisible" style="max-width:50rem;margin:0 auto" :show-close="false">
        <el-form label-width="80px">
          <el-form-item label="金额">
            <el-input v-model="addName" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-switch
              style="display: block"
              v-model="editStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
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
  components: {
    Logo
  },
  data () {
    return {
      title: '', // 添加类型/修改类型
      id: null,
      showEdit: false,
      editStatus: false,
      addName: ''
      // list: [
      //   {
      //     id: 1,
      //     gmt: 1553754190000,
      //     upt: 1553754189000,
      //     version: 1,
      //     name: "渠道1",
      //     type: "WX",
      //     status: true,
      //     sort: 0
      //   }
      // ]
    }
  },
  computed: {
    ...mapState('ditch',['list', 'dialogVisible','loading','btnLoading'])
  },
  mounted () {
    this.listFn()
  },
  methods: {
    ...mapMutations('ditch',{
      mapList: 'toList',
      mapVisible: 'changeVisible',
      mapLoading: 'changeLoading',
      mapBtnLoading: 'changeBtnLoading',
      mapcancel: 'cancel'
    }),
    listFn () {
      this.mapLoading()
      this.$axios.post(this.jk.toUpMoneyList)
        .then(res => {
          if(res.success){
            const l = res.data
            this.mapList(l)
            this.mapLoading()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    add () {
      this.editStatus = false
      this.showEdit = false
      this.addName = ''
      this.mapVisible()
      this.title = '添加金额'
    },
    edit(row) {
      console.log(row)
      this.showEdit = true
      this.id = row.id
      this.addName = row.money
      this.editStatus = row.status
      this.mapVisible()
      this.title = '修改金额'
    },
    save () {
      if(this.addName !== ''){
        this.mapBtnLoading()
        let trans = {
          money: this.addName,
          status: this.editStatus
        }
        if (this.showEdit) {//编辑
          let edit = Object.assign({},trans,{id:this.id})
          this.editBtn(edit)
        } else { // 添加
          this.addBtn(trans)
        }
      } else {
        this.$message({
          message: '请填写渠道名称',
          type: 'warning'
        })
      }
    },
    del (val) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$axios.post(this.jk.toUpMoneyDel,{id: val})
            .then(res => {
              if(res.success){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.listFn()
              }else{
                this.$message.error(res.msg)
              }
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(_ => {
          this.$message('取消删除')
        })
    },
    editBtn (obj) {
      this.$axios.post(this.jk.toUpMoneyEdit,obj)
      .then(res => {
        if(res.success){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.listFn()
          this.mapVisible()
          this.mapBtnLoading()
        }else{
          this.$message.error(res.msg)
          this.addName = ''
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    addBtn (obj) {
      this.$axios.post(this.jk.toUpMoneyAdd, obj)
        .then(res => {
          if(res.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.mapVisible()
            this.listFn()
            this.mapBtnLoading()
          }else{
            this.$message.error(res.msg)
            this.addName = ''
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
