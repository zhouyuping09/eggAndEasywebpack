<template>
  <div class="activationIntroduce">
   <div>
     {{number}}
   </div>
    <router-link :to="{ name: 'clientReSetPin'}">
      11111
    </router-link>
    <a href="/">goHome</a>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'clientActivationIntroduce',
    data() {
      return {
        number: ''
      }
    },
    methods: {
      getNumber() {
        axios.get('/get/number?number=12345678').then(res => {
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
