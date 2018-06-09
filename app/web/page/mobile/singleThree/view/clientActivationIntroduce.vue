<template>
  <div class="activationIntroduce">
   <div>
     {{count}}
   </div>
    <router-link :to="{ name: 'clientReSetPin'}">
      11111
    </router-link>
    <a href="/">goHome</a>
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
