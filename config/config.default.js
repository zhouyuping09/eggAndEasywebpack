const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access',
    'accessLog',
    'extendRequestContext',
    'errorHandler',
  ];

  exports.i18n = {
    defaultLocale: 'en',
    queryField: 'lang',
    cookieFiled: 'locale',
    cookieMaxAge: '1y',
  };

  exports.langs = ['en', 'fr'];

  exports.info = {};

  exports.mainHost = {
    mobile: ['localhost']
  };

  exports.httpclient = {
    request: {
      timeout: 10000,
    }
  };

  exports.security = {
    csrf: {
      queryName: '_csrf',
      bodyName: '_csrf',
    },
    domainWhiteList: [],
  };

  exports.httpBase = {
    common: '',
  };

  exports.customLogger = {
    accessLog: {
      file: path.join(app.root, 'logs/access.log'),
    },
  };

  return exports;
};
