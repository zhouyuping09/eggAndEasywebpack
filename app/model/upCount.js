
module.exports = app => {
  const mongoose = app.mongoose;
  const upCountSchema = new mongoose.Schema({
    id: { type: Number },
    count: { type: Number },
  });
  return mongoose.model('upCount', upCountSchema, 'upCount');
};
