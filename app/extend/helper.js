const request = require('request');

module.exports = {

  /**
   * http get 请求封装
   *
   * @param { String } url - 请求地址
   * @param { Object } params - 请求参数
   * @param { Boolean } notNeedParseJsonData - 不需要类型转换
   * @param { Object } headers - 请求头
   * @returns {Promise.<*>} 请求的数据
   */
  async httpGet(url, params = {}, notNeedParseJsonData, headers) {
    const { ctx } = this;
    const getParams = Object.assign({
      osType: ctx.app.config.info.platform.mobile,
      appVersion: ctx.app.config.info.version,
      lang: ctx.locale,
    }, params);
    const options = {
      url,
      method: 'GET',
      qs: getParams || {},
      headers: headers || {},
      timeout: ctx.app.config.httpclient.request.timeout,
    };

    const notNeedParseJson = notNeedParseJsonData ? notNeedParseJsonData : false;
    try {
      return await doRequest(options, notNeedParseJson);
    } catch (err) {
      throw new Error(err);
    }
  },

  /**
   * http post form 请求
   *
   * @param { String } url - 请求地址
   * @param { Object } params - 请求参数
   * @param { Boolean } notNeedParseJsonData - 不需要类型转换
   * @param { Object } headers - 请求头
   * @returns {Promise.<*>} 请求的数据
   */
  async httpPostForm(url, params = {}, notNeedParseJsonData, headers) {
    const { ctx } = this;
    headers = headers || {};
    headers['content-type'] = 'application/x-www-form-urlencoded';
    const postParams = Object.assign({
      osType: ctx.app.config.info.platform.mobile,
      appVersion: ctx.app.config.info.version,
      lang: ctx.locale,
    }, params);
    const options = {
      url,
      form: postParams || {},
      timeout: ctx.app.config.httpclient.request.timeout,
      method: 'POST',
      headers,
    };
    const notNeedParseJson = notNeedParseJsonData ? notNeedParseJsonData : false;
    try {
      return await doRequest(options, notNeedParseJson);
    } catch (err) {
      throw new Error(err);
    }
  },

};

async function doRequest(options, notNeedParseJson) {
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let returnResult = body;
        if (!notNeedParseJson) {
          returnResult = JSON.parse(body);
        }
        resolve(returnResult);
      } else {
        reject({
          error,
          response
        });
      }
    });
  });
}
