const Controller = require('egg').Controller;

class searchController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('mobile/home/404.js')
  }
}

module.exports = searchController;
