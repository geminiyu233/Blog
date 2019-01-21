<template>
  <div class="app-container">
    <div class="app-main">
      <div class="app-left">
        <slot name="left"></slot>
      </div>
      <div class="app-right">
        <slot name="right"></slot>
      </div>
    </div>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Layout"
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/static/styles/mixins/index.scss';
@import '@/static/styles/variables.scss';
.app-container {
  @include display-flex;
  @include flex-direction(column);
  @include justify-align(center, center);
  @include wh(100%, 100vh);
  font-size: $font-size-m;
  overflow: hidden;
  .app-main {
    @include display-flex;
    @include justify-content(space-between);
    max-width: 960px;
    @include wh(960px, calc(100vh - 50px));
    overflow: hidden;
    .app-left {
      @include flex(1 1 auto);
      @include wh(100%, 100%);
    }
    .app-right {
      @include display-flex;
      @include flex-direction(column);
      @include flex(0 0 240px);
      @include wh(100%, 100%);
      margin-left: $space-h-m;
    }
  }
  .footer {
    @include display-flex;
    @include flex-direction(column);
    @include justify-align(space-between, center);
    @include wh(100%, 50px);
    padding: $space-v-s;
    color: $color-grey;
  }
}
</style>
