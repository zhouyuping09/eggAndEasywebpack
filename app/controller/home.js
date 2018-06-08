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

  async otherOne() {
    const { ctx } = this;
    const params = {
      ids: 123456,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    await ctx.render('mobile/home/mongodb.js', {
      result
    });
  }


  async otherTwo() {
    const { ctx } = this;
    const params = {
      ids: 123456,
    };
    const result = await ctx.service.home.serviceModelGet(params);
    const data = await ctx.service.home.serviceModelUp(params);
    ctx.body = data;
  }

  async singleOne() {
    const { ctx } = this;
    await ctx.render('mobile/home/singleOne.js', {
      url: ctx.url,
    });
  }

  async singleThree() {
    const { ctx } = this;
    await ctx.render('mobile/home/singleThree.js', {
      url: ctx.url,
    });
  }

  async singlefour() {
    const { ctx } = this;
    await ctx.render('mobile/home/singlefour.js', {
      url: ctx.url,
    });
  }

  async modelInit() {
    const { ctx } = this;
    const params = {
      ids: 123456,
      count: 2,
    };
    const result = await ctx.service.home.serviceModelInit({params});
    ctx.body = { result };
  }


}

module.exports = homeController;
