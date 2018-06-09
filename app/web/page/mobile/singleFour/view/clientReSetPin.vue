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
  import axios from 'axios';
  export default {
    name: 'clientReSetPin',
    data() {
      return {
        number: ''
      }
    },
    methods: {
      getNumber() {
        axios.get('/get/number?number=87654321').then(res => {
          this.number = res.data.number;
        })
          .catch(err => {
            console.log(err);
          })
      }
    },
    mounted() {
      document.title = 'singleFour';
      this.getNumber();
    }
  };

</script>
<style scoped lang="less">


</style>
