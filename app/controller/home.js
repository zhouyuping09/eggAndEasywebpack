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
    const params = {
      userId: 123456,
      totalCount: '2',
    };
    const result = await ctx.service.home.serviceModelInit({params});
    ctx.body = { result };
  }

  async otherOne() {
    const { ctx } = this;
    const params = {
      userId: 123456,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    await ctx.render('mobile/home/mongodb.js', {
      result
    });
  }


  async otherTwo() {
    const { ctx } = this;
    const params = {
      userId: 123456,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    const data = await ctx.service.home.serviceModelUp(params);
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
