<template>
  <section>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="name" placeholder="请输入渠道名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="channelId" placeholder="请输入渠道ID" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="status" placeholder="状态" clearable>
            <el-option label="启用" :value="true"></el-option>
            <el-option label="禁用" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
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
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="channelId"
          label="渠道ID"
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
              @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 添加弹窗-start -->
      <el-dialog :title="title" :visible.sync="dialogVisible" style="max-width:50rem;margin:0 auto" :show-close="false">
        <el-form label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="addName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="渠道ID" v-if="!showEdit">
            <el-input v-model="addChannelId" autocomplete="off"></el-input>
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
      channelId: null,
      title: '', // 添加类型/修改类型
      addChannelId: null,
      id: null,
      showEdit: false,
      editStatus: false,
      addName: '',
      name: '',
      status: null,
      currentPage: 1,
      total: 0,
      pageSize: 10
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
      mapList: 'list',
      mapVisible: 'changeVisible',
      mapLoading: 'changeLoading',
      mapBtnLoading: 'changeBtnLoading',
      mapcancel: 'cancel'
    }),
    listFn () {
      this.mapLoading()
      let trans = {
        name: this.name,
        channelId: this.channelId,
        status: this.status,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
      this.$axios.post(this.jk.toUpTypeList,trans)
        .then(res => {
          if(res.success){
            const l = res.data
            this.mapList(l)
            this.total = l.total
            this.mapLoading()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    add () {
      this.showEdit = false
      this.addName = ''
      this.mapVisible()
      this.title = '添加类型'
    },
    edit(index, row) {
      this.showEdit = true
      this.id = row.id
      this.addName = row.name
      this.editStatus = row.status
      this.mapVisible()
      this.title = '修改类型'
    },
    save () {
      if(this.addName !== ''){
        this.mapBtnLoading()
        let trans = {
          name: this.addName,
          status: this.editStatus
        }
        if (this.showEdit) {//编辑
          let edit = Object.assign({},trans,{id:this.id})
          this.editBtn(edit)
        } else { // 添加
          let add = Object.assign({},trans,{channelId:Number(this.addChannelId)})
          this.addBtn(add)
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
          this.$axios.post(this.jk.toUpTypeDel,{id: val})
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
      this.$axios.post(this.jk.toUpTypeEdit,obj)
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
      this.$axios.post(this.jk.toUpTypeAdd, obj)
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
    },
    search () {
      this.listFn()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.listFn()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listFn()
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
