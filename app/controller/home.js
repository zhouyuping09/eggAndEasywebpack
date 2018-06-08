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
  }


  async singleOne() {
    const { ctx } = this;
  }

  async singleThree() {
    const { ctx } = this;
  }

  async singlefour() {
    const { ctx } = this;
  }


}

module.exports = homeController;
