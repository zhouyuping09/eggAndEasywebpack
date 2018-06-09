<template>
  <div class="activationIntroduce">
   <div>
     {{count}}
   </div>
    <a href="/single/one/home">homePage</a>
    <a href="/">home</a>
  </div>
</template>
<script>

  export default {
    name: 'clientActivationIntroduce',
    computed: {
      count() {
        return this.$store.state.count;
      },
    },
    mounted() {
      document.title = 'singleOne';
    }
  };

</script>
<style scoped lang="less">


</style>
