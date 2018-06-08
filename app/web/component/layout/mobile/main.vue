<template>
  <div class="page-wrapper">
    <slot name="main">
    </slot>
  </div>
</template>
<script>
  import 'babel-polyfill';
  export default {
    methods: {
      googleAnalytics() {
        return (function(i, s, o, g, r, a, m) {
          i.GoogleAnalyticsObject = r; i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments);
          };
          i[r].l = 1 * new Date();
          a = s.createElement(o);
          m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g; m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
      },
    },
    mounted() {
      this.$nextTick(() => {
        // google统计
        this.googleAnalytics();
        window.ga('create', 'a', 'auto');
        window.ga('send', 'pageview');
      });
    }
  };
</script>
<style lang="less">
  @color-back: #EBEBEC;

  * {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    border: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    outline: none;
    appearance: none;
    // -webkit-overflow-scrolling: touch; //啟動硬件加速 滑動回彈 更順暢
  }

  a, a:hover {
    text-decoration: none;
  }

  html {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  html,body {
    height: 100%;
  }
  ul, li, ol {
    list-style: none;
  }

  ::-webkit-scrollbar  {
    width: 0;
    height: 0;
  }

  .page-wrapper {
    width: 100%;
    height: 100%;

    .page {
      width: 10rem;
      height: 100%;
      min-height: 100%;
      margin: 0 auto;
      background-color: @color-back;
    }
  }
</style>
