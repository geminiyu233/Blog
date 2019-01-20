<template>
  <layout>
    <template slot="left">
      <card>
        <nuxt/>
      </card>
    </template>
    <template slot="right">
      <card>个人信息</card>
      <card>导航</card>
      <card>标签分类</card>
    </template>
    <template slot="footer">
      <div>赣ICP备 ********号 © 2017 - 2018</div>
      <div>本站运行 520 天，访问人数 520 人次</div>
    </template>
  </layout>
</template>
<script>
import Layout from "../components/Layout"
import Card from "../components/Card"
export default {
  name: "Default",
  components: { Layout, Card }
}
</script>
