<template>
  <MobileLayout title="singleOne">
    <div id="app">
      <router-view></router-view>
    </div>
  </MobileLayout>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>
  .page-wrapper .page {
    background-color: #ffffff !important;
  }

  #app {
    width: 10rem;
    margin: 0 auto;
    height: auto;
  }

</style>
