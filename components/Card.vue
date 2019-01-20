<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.card {
  padding: 15px;
  margin-bottom: $space-v-m;
  background-color: #fff;
  border-radius: $border-radius;
  overflow: hidden;
}
</style>

