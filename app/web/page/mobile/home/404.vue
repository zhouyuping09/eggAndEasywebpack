<template>
  <MobileLayout title="No Found">
    <div class="error">
        home
    </div>
  </MobileLayout>
</template>
<script>
  export default {
    methods: {},
  };
</script>
<style scoped lang="less">
  .page{
    height: 100%;
  }
  .error{
    min-height: 100%;
    background-color: #fff;
  }
  .error-pic{
    margin-top: 2rem;
    width: 100%;
  }
  .oops{
    text-align: center;
    line-height: .6rem;
    margin-bottom: .2rem;
    margin-top: .4rem;
    font-size: .44444444444444rem;
  }
  .error-desc{
    color: #999;
    line-height: .6rem;
    font-size: .38888888889rem;
    text-align: center;
    margin-bottom: .2rem;
  }
  .help-list{
    text-align: center;
    font-size: 0;
  }
  .help-item{
    display: inline-block;
    width: 50%;
    text-align: center;
    font-size: .3888888888889rem;
  }
  .help-item a{
    color: #ea5a1e;
  }
</style>
