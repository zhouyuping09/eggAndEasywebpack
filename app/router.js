
module.exports = app => {
  app.get('/', app.controller.home.home.index);
};
