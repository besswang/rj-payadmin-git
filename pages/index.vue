<template>
  <section>
    <div>
      <el-button type="primary" class="mb15">添加渠道</el-button>
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
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
      <div>{{todos}}</div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      currentPage:1,
      list: [
        {
          id: 1,
          gmt: 1553754190000,
          upt: 1553754189000,
          version: 1,
          name: "渠道1",
          type: "WX",
          status: true,
          sort: 0
        }
      ]
    }
  },
  // async fetch ({ store, params }) {
  //   let data = await $axios.post('/admin/query/list')
  //   console.log( data )
  //   // store.commit('SET_LIST', data.list)
  // },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  mounted () {
    this.$axios.post('/admin/query/list')
      .then(res => {
        console.log()
        const list = res.data.list
        this.$store.commit('todos/add', list)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
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
