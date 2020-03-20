<template>
  <div class="layout">
    <Header></Header>
    <div class="layout-content">
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: #f5f5f5;
  .layout-content {
    padding-top: 96px;
  }
}
</style>
