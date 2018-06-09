const Controller = require('egg').Controller;
const home = require('../text/home');

class homeController extends Controller {
  async index() {
    const { ctx } = this;
    const homeText = home.home(ctx);
    await ctx.render('mobile/home/404.js', {
      homeText
    })
  }

  async modelInit() {
    const { ctx } = this;
    const result = await ctx.service.home.serviceModelInit();
    ctx.body = { result };
  }

  async otherOne() {
    const { ctx } = this;
    const params = {
      userId: 123,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    await ctx.render('mobile/home/mongodb.js', {
      result
    });
  }


  async otherTwo() {
    const { ctx } = this;
    const params = {
      userId: 123,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    result.totalCount = parseInt(result.totalCount, 10) + 1;
    const data = await ctx.service.home.serviceModelUp(result);
    ctx.body = data;
  }

  async singleOne() {
    const { ctx } = this;
    await ctx.renderClient('mobile/singleOne/app.js', {
      url: ctx.url,
      count: 2234,
      number: 3234,
    });
  }

  async singleThree() {
    const { ctx } = this;
    await ctx.renderClient('mobile/singleThree/app.js', {
      url: ctx.url,
      count: 'home',
      number: 'page',
    });
  }

  async singlefour() {
    const { ctx } = this;
    const ids = ctx.params.ids;
    await ctx.render('mobile/singleFour/app.js', {
      url: ctx.url,
    });
  }

  async getNumber() {
    const { ctx } = this;
    const number = ctx.query.number;
    ctx.body = {
      number,
    }
  }




}

module.exports = homeController;
