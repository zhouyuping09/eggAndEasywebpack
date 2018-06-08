
module.exports = app => {
  const mongoose = app.mongoose;
  const UpCountSchema = new mongoose.Schema({
    id: { type: Number },
    count: { type: Number },
  });
  return mongoose.model('UpCount', UpCountSchema, 'upCount');
};
