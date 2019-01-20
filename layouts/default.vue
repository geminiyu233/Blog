<template>
  <layout>
    <template slot="left"><nuxt /></template>
    <template slot="right">right</template>
    <template slot="footer">
      <div> 赣ICP备 ********号 © 2017 - 2018 </div>
      <div>本站运行 520 天，访问人数 520 人次</div>
    </template>
  </layout>
</template>
<script>
import Layout from "../components/Layout"
export default {
  name: "Default",
  components: { Layout }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
