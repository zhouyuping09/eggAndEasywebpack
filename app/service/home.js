
const Service = require('egg').Service;

class HomeService extends Service {


  async serviceModelInit() {
    const { ctx } = this;
    return await ctx.model.AccountDailyCheck.create({
      userId: 123,
      totalCount: 2,
    });
  }

  async serviceModelGet({ userId }) {
    const { ctx } = this;
    const params = {
      userId,
    };
    return await ctx.model.AccountDailyCheck.findOne(params)
  }

  async serviceModelUp({ userId, totalCount }) {
    const { ctx } = this;
    const params = {
      userId,
      totalCount,
    };
    return await ctx.model.AccountDailyCheck.update({ userId: params.userId }, params);
  }

};


module.exports = HomeService;
