<template>
  <div class="activationIntroduce">
    <div>
      {{number}}
    </div>
    <router-link :to="{ name: 'clientActivationIntroduce'}">
      22222
    </router-link>
    <a href="/">goHome</a>
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
