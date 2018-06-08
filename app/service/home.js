
const Service = require('egg').Service;

class HomeService extends Service {


  async serviceModelInit({ ids, count}) {
    const { ctx } = this;
    const params = {
      ids,
      count,
    };
    await ctx.model.UpCount.create(params)
      .catch(err => {
        ctx.logger.error(`mongodb addAccountTotalDailyCheck failed!, currentUserId${currentUserId}`);
        return null;
      });

  }

  async serviceModelGet({ ids }) {
    const { ctx } = this;
    const params = {
      ids,
    };
    return await ctx.model.UpCount.findOne(params)
      .catch(err => {
        ctx.logger.error(`mongodb getAccountDailyCheck failed!currentUserId${currentUserId}`);
        return null;
      });
  }

  async serviceModelUp({ ids, count }) {
    const { ctx } = this;
    const params = {
      ids,
      count,
    };
    return await ctx.model.UpCount.update({ id: params.id }, params).catch(err => {
        ctx.logger.error(`mongodb updateAccountDailyCheck failed!countryId${countryId},currentUserId${currentUserId}`);
        return null;
      });
  }


};


module.exports = HomeService;
