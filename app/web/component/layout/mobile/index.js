import MainLayout from './main.vue';
const content = `
  <MainLayout>
    <div class="page" slot="main">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </MainLayout>
`;

const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>{{vTitle}}</title>
    <meta charset="UTF-8">
    <meta name="keywords" :content="vKeywords">
    <meta name="description" :content="vDescription">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="apple-mobile-web-app-title" :content="vTitle">
    <meta name="renderer" content="webkit">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="full-screen" content="yes">
    <meta name="browsermode" content="application">
    <meta name="x5-fullscreen" content="true">
    <meta name="x5-page-mode" content="app">
    <meta name="theme-color" content="#EA5A1E">
    <meta name="format-detection" content="telephone=no, address=no">
  <script src="http://qiniu.titohu.me/fot/textflexible.min.js"></script>
  </head>
   <body>
    <div id="app">${content}</div>
  </body>
</html>
`;

export default {
  name: 'MobileLayout',
  props: [ 'title', 'description', 'keywords' ],
  computed: {
    vTitle() {
      return this.$root.title || this.title || 'a';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || 'b';
    },
    vDescription() {
      return this.$root.description || this.description || 'c';
    },
  },
  components: {
    MainLayout,
  },
  template: typeof window === 'object' ? content : template,
};
