import Vue from 'vue'
// 时间格式化
// 用法：<div>{{data | dataFormat('yyyy-MM-dd hh:mm:ss')}}</div>
export const formatDate = Vue.filter('formatDate', function (value, fmt) {
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
})
export const bel = Vue.filter('bel',((val, type) => {
  type = val ? '启用' : '禁用'
  return type
}))
export const orderType = Vue.filter('orderType', ((val, type) => {
  switch(val){
    case 'SUCCES':
      type = '成功';
      break;
    case 'FALSE':
      type = '失败';
      break;
    case 'PENDING_PAYMENT':
      type = '线下扫码';
      break;
  }
  return type
}))
export const orderPayType = Vue.filter('orderPayType', ((val, type) => {
  switch (val) {
    case 'WX':
      type = '微信';
      break;
    case 'AILI_PAY':
      type = '支付宝';
      break;
    case 'LINE_SCAN_CODE':
      type = '线下扫码';
      break;
  }
  return type
}))
