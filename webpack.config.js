'use strict';
const path = require('path');
const UPLOAD_CDN =  process.env.UPLOAD_CDN;
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: [
      'app/web/page',
      { 'mobile/singleOne/app': 'app/web/page/mobile/singleOne/app.js?loader=false' },
      { 'mobile/singleThree/app': 'app/web/page/mobile/singleThree/app.js?loader=false' },
      { 'mobile/singleFour/app': 'app/web/page/mobile/singleFour/app.js?loader=false' },
    ],
    exclude: [
      'app/web/page/[a-z]+/component',
      'app/web/page/test',
      'app/web/page/html',
      'app/web/page/mobile/singleOne',
      'app/web/page/mobile/singleThree',
      'app/web/page/mobile/singleFour',
    ],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    },
    html: {
      include: ['app/web/page/html'],
      template: 'app/web/view/layout.html',
      buildDir: 'html',
      options: {}
    }
  },
  alias: {
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    app: 'app/web/framework/vue/app.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
    service: 'app/web/service',
  },
  loaders: {
    eslint: true,
    less: {
      enable: true,
      postcss: true,
      framework: true,
    }, // 没有使用, 禁用可以减少npm install安装时间
    stylus: false, // 没有使用, 禁用可以减少npm install安装时间
    flash: {
      test: /\.swf$/,
      loader: 'file-loader?name=[name]_[sha512:hash:base64:7].[ext]',
    },
  },
  plugins: {
    buildfile: false,
    manifest: false, // old manifest feature
    manifestDeps: true, // new manifest feature, not need buildfile
    serviceworker: false
  },
  cdn: UPLOAD_CDN ?
    (UPLOAD_CDN === 'prod' ?
        { url: '' } :
        { url: '' }
    ) : {},
  publicPath: UPLOAD_CDN ? '/' : 'public/',
  done() {
    // upload static file to cdn: http://xxx.cdn.com
  }
};
