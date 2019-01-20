<template>
  <div class="app-container">
    <div class="app-main">
      <section class="app-left">
        <slot name="left"></slot>
      </section>
      <aside class="app-right">
        <slot name="right"></slot>
      </aside>
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
@import '@/assets/styles/mixins/index.scss';
@import '@/assets/styles/variables.scss';
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
    }
    .app-right {
      @include flex(0 0 240px);
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
