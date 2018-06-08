const url = require('url');
/**
 * 统一处理异常
 *
 * @param options
 * @param app
 * @returns {error_handler}
 */
module.exports = (options, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      if (ctx.response.status === 404 && !ctx.body) {
        if (ctx.acceptJSON) {
          ctx.body = { msg: 'System error, please try it later!' };
        } else {
          const { query } = url.parse(ctx.request.url, false);
          await ctx.render('mobile/home/404.js', { homeText: {hello: 404}});
        }
      }
    } catch (err) {


      const status = err.status || 500;

      // TODO: 参数错误，返回校验结果，记录warn级别的日志，用于优化方面的数据支持。
      if (status === 422) {
        ctx.body = {
          success: false,
          obj: err.errors,
          msg: 'argument validate failed',
        };
        ctx.status = 200;
        return;
      }
      // 触发错误事件，让框架记录日志
      ctx.app.emit('error', err, ctx);
      //
      // TODO: 500 生产环境跳转到500页面
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      if (ctx.acceptJSON) {
        ctx.body = { msg: 'System error, please try it later!' };
      } else {
        ctx.status = status;
        const { query } = url.parse(ctx.request.url, false);
        await ctx.render('mobile/home/404.js', { homeText: {hello: 500} });
      }
    }
  };
};
