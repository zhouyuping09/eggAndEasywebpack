<template>
  <i
    :class="'iconfont ' + iconName"
  />
</template>
<script>
  export default {
    name: 'icon',
    props: {
      type: {
        type: String,
        require: true,
      }
    },
    computed: {
      iconName() {
        return `icon-${this.type}`;
      }
    }
  };
</script>
<style lang="less">
  @import './../../../asset/font/iconfont.css';
</style>