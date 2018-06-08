<template>
  <div class="kd-swipe-content">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'kd-tabs-swipe-item',
    mounted() {
      this.$parent.swipeItemMounted(this);
    },
    destroyed() {
      this.$parent.swipeItemDestroyed(this);
    },
  };
</script>
<style lang="less">
  .kd-swipe {
    &-content {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>
