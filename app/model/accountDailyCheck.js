
module.exports = app => {
  const mongoose = app.mongoose;
  const AccountDailyCheckSchema = new mongoose.Schema({
    userId: { type: Number },
    totalCount: { type: Number },
  });
  return mongoose.model('AccountDailyCheck', AccountDailyCheckSchema, 'accountDailyCheck');
};
