<template>
  <section>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="orderNumber" placeholder="请输入订单号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
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
          prop="orderNumber"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="channelId"
          label="渠道ID">
        </el-table-column>
        <el-table-column
          prop="money"
          label="充值金额">
        </el-table-column>
        <el-table-column
          prop="serviceRate"
          label="服务费率">
        </el-table-column>
        <el-table-column
          prop="serviceMoney"
          label="服务费">
        </el-table-column>
        <el-table-column
          prop="accountNotes"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="type"
          label="支付状态">
          <template slot-scope="scope">
            <span>{{ scope.row.type | orderType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支付类型">
          <template slot-scope="scope">
            <span>{{ scope.row.payType | orderPayType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payNumber"
          label="第三方支付订单号">
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
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'users-orders',
  data () {
    return {
      orderNumber: '',

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
  created () {
    this.$store.commit('changePage','/users/orders')
  },
  computed: {
    ...mapState('ditch',['list', 'loading'])
  },
  mounted () {
    this.listFn()
  },
  methods: {
    ...mapMutations('ditch',{
      mapList: 'list',
      mapLoading: 'changeLoading'
    }),
    listFn () {
      this.mapLoading()
      let trans = {
        orderNumber: this.orderNumber,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
      this.$axios.post(this.jk.orderList,trans)
        .then(res => {
          if(res.success){
            const l = res.data
            this.mapList(l)
            this.total = l.total
            setTimeout(() => {
              this.mapLoading()
            }, 500)
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
