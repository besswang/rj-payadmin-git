<template>
  <section>
    <div>
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
          label="支付方式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
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
            <!-- <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹窗-start -->
      <el-dialog :title="title" :visible.sync="dialogVisible" style="max-width:50rem;margin:0 auto" :show-close="false">
        <el-form label-width="80px">
          <el-form-item label="排序">
            <el-input v-model="sort" autocomplete="off" type="number"></el-input>
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
      sort: null,
      id: null,
      editStatus: false
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
      this.$axios.post(this.jk.toUpMethodList)
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
    edit(index, row) {
      this.id = row.id
      this.editStatus = row.status
      this.sort = row.sort
      this.mapVisible()
      this.title = '修改'
    },
    save () {
      if(this.sort !== ''){
        this.mapBtnLoading()
        let trans = {
          id: this.id,
          sort: this.sort,
          status: this.editStatus
        }
        this.editBtn(trans)
      } else {
        this.$message({
          message: '请填写排序值',
          type: 'warning'
        })
      }
    },
    editBtn (obj) {
      this.$axios.post(this.jk.toUpMethodEdit,obj)
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
          this.sort = ''
        }
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
