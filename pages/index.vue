<template>
  <section>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="name" placeholder="请输入渠道名称"></el-input>
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
          <el-button type="primary" class="mb15" @click="add">添加渠道</el-button>
        </el-form-item>
      </el-form>
      <el-table
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
          label="渠道"
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
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <el-dialog title="添加渠道" :visible.sync="dialogVisible" style="max-width:50rem;margin:0 auto">
        <el-form>
          <el-form-item label="渠道名称">
            <el-input v-model="addName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSave">确 定</el-button>
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
      addName: '',
      name: '',
      status: null,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false
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
    // ...mapState({
    //   counter: 'counter'
    // }),
    ...mapState('ditch',['list', 'dialogVisible'])
  },
  mounted () {
    this.listFn()
  },
  methods: {
    ...mapMutations('ditch',{
      mapList: 'list',
      mapVisible: 'changeVisible'
    }),
    listFn (val) {
      this.$axios.post(this.jk.queryList,val)
        .then(res => {
          const l = res.data
          this.mapList(l)
          this.currentPage = l.pageNum
          this.pageSize = l.pageSize
          this.total = l.total
        })
        .catch(e => {
          console.log(e)
        })
    },
    add () {
      this.mapVisible()
    },
    addSave () {
      this.$axios.post(this.jk.ditchAdd, {name: this.addName})
        .then(res => {
          if(res.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }else{
            this.$message.error(res.msg)
          }
          this.mapVisible()
          this.listFn()
        })
        .catch(e => {
          console.log(e)
        })
    },
    search () {
      let trans = {
        name: this.name,
        status: this.status
      }
      this.listFn(trans)
    },
    handleSizeChange(val) {
      this.pageSize = val
      let trans = {
        name: this.name,
        status: this.status,
        pageSize: val
      }
      this.listFn(trans)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listFn()
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
