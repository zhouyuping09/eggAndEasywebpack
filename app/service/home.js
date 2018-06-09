
const Service = require('egg').Service;

class HomeService extends Service {


  async serviceModelInit({ userId, totalCount}) {
    const { ctx } = this;
    const params = {
      userId,
      totalCount,
    };
    return await ctx.model.AccountDailyCheck.create(params);
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
    return await ctx.model.AccountDailyCheck.update({ id: params.id }, params);
  }

};


module.exports = HomeService;
