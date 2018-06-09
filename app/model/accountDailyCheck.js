
module.exports = app => {
  const mongoose = app.mongoose;
  const AccountDailyCheckSchema = new mongoose.Schema({
    userId: { type: Number },
    totalCount: { type: Number }, // 一共签到次数
  });
  return mongoose.model('AccountDailyCheck', AccountDailyCheckSchema, 'accountDailyCheck');
};
