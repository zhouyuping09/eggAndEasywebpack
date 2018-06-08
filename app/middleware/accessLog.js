const Logger = require('egg-logger').Logger;
const FileTransport = require('egg-logger').FileTransport;
const moment = require('moment');
const util = require('util');

module.exports = (options, app) => {
  return async function accessLog(ctx, next) {
    const start = new Date().getTime();
    await next();
    const rs = Math.ceil(new Date().getTime() - start);

    ctx.accesslogger = new Logger();
    ctx.accesslogger.set('file', new FileTransport({
      file: ctx.app.config.customLogger.accessLog.file,
      level: 'INFO',
    }));
    ctx.accesslogger.info(connectLoggerFormat());

    // TODO  http版本
    function getIpAddr() {
      let ipAddr = ctx.request.header['x-real-ip'] || ctx.request.header['x-forwarded-for'] || ctx.ip;
      if (!ipAddr && ctx.connection && ctx.connection.remoteAddress) {
        ipAddr = ctx.connection.remoteAddress;
      } else if (!ipAddr && ctx.socket && ctx.socket.remoteAddress) {
        ipAddr = ctx.socket.remoteAddress;
      } else if (!ipAddr && ctx.connection && ctx.connection.socket) {
        ipAddr = ctx.connection.socket.remoteAddress;
      }
      return ipAddr;
    }

    function getContentLength() {
      const content = ctx.request.body;
      const length = Buffer.byteLength(JSON.stringify(content));
      return length;
    }

    function connectLoggerFormat() {
      const serverTime     = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      const ipAddr         = getIpAddr();
      const method         = ctx.method;
      const url            = ctx.url;
      const httpVersion    = '';
      const responseTime   = rs;
      const status         = ctx.status;
      const contentLength  = getContentLength();
      const referer        = ctx.header.referer;
      const userAgent      = ctx.header['user-agent'];
      let params = {
        body: ctx.request.body,
        params: ctx.params,
        query: ctx.query,
      };
      params = JSON.stringify(params);
      const logContent = util.format('[%s %s] [INFO] access - -  %s %s HTTP/%s [%s] %s %s referer:%s %s params=%s',
        ipAddr, serverTime, method, url, httpVersion, responseTime, status, contentLength, referer, userAgent, params);
      return logContent;
    }
  };
};

