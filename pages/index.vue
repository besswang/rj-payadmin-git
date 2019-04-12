<template>
  <div style="height:100%;">

  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$router)
    this.$router.push('/login') // 页面加载时跳转
  }
}
</script>
