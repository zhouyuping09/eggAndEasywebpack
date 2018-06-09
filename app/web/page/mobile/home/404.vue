<template>
  <MobileLayout title="No Found">
    <div class="error">
        home {{homeText.hello}}
    </div>
    <a href="/model/init">model init</a>
    <a href="/other/one">model homePage</a>
    <a href="/single/one">单页面1</a>
    <!--<a href="/single/two">单页面1</a>-->
    <a href="/single/three">单页面2</a>
    <a href="/single/2/four">单页面3</a>
  </MobileLayout>
</template>
<script>
  export default {
    methods: {},
  };
</script>
<style scoped lang="less">
  @px2rem: 36;
  .page{
    height: 100%;
  }
  .error{
    height: 24rem/@px2rem;
    background-color: #fff;
  }
  a{
    width: 10rem;
    line-height: 24rem/@px2rem;
  }
</style>
