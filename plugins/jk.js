import Vue from 'vue'
export const url = {
  'setting': '/global/config/admin/query/info',
  'settingEdit': '/global/config/admin/update/value',
  // 渠道列表
  'queryList': '/channel/admin/query/list', // 渠道列表
  'ditchAdd': '/channel/admin/add', // 添加渠道
  'ditchEdit': '/channel/admin/update', // 修改渠道信息
  // 充值类型管理
  'toUpTypeList': '/pay/type/admin/find/page', // 充值类型列表
  'toUpTypeAdd': '/pay/type/admin/add', // 添加
  'toUpTypeEdit': '/pay/type/admin/update', // 修改
  'toUpTypeDel': '/pay/type/admin/delete', // 删除
  // 充值金额管理
  'toUpMoneyList': '/money/quota/admin/query/info', // 充值金额列表
  'toUpMoneyAdd': '/money/quota/admin/add',
  'toUpMoneyEdit': '/money/quota/admin/update',
  'toUpMoneyDel': '/money/quota/admin/delete',
  // 支付方式管理
  'toUpMethodList': '/third/pay/admin/query',
  'toUpMethodEdit': '/third/pay/admin/update'
}
Vue.prototype.jk = url
