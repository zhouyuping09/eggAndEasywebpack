<template>
  <div class="activationIntroduce">
    <div>
      {{number}}
    </div>
    <a href="/single/one">homePage</a>
    <a href="/">home</a>
  </div>
</template>
<script>

  export default {
    name: 'clientReSetPin',
    computed: {
      number() {
        return this.$store.state.number;
      },
    },
    mounted() {
      document.title = 'singleOneHome';
    }
  };

</script>
<style scoped lang="less">


</style>
