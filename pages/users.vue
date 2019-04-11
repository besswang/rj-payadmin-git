<template>
  <div style="height:100%;">
    <el-container style="height:100%">
      <el-header class="theme-bg-color">
        <my-head />
      </el-header>
      <el-container style="height:100%;">
        <my-side />
        <el-main>
          <NuxtChild :key="key"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MySide from '~/components/MySide.vue'
import MyHead from '~/components/MyHead.vue'
export default {
  components: {
    MySide,
    MyHead
  },
  computed: {
      key() {
          return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
  }
}
</script>
