<template>
  <div class="kd-tab-item" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'kd-tabs-tab-item',
    data() {
      return {
        index: 0,
      };
    },
    methods: {
      handleClick() {
        this.$parent.tabClick(this.index);
      },
    },
    mounted() {
      this.$parent.tabItemMounted(this);
    },
    destroyed() {
      this.$parent.tabItemDestroyed(this);
    },
  };
</script>
<style lang="less">

</style>
