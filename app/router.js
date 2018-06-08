
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/other/one' , app.controller.home.otherOne);
  app.get('/other/two' , app.controller.home.otherTwo);
  app.get('/single/one(/.+)?', app.controller.home.singleOne);
  app.get('/single/two(/.+)?', app.controller.home.singleOne);
  app.get('/single/three(/.+)?', app.controller.home.singleThree);
  app.get('/single/four(/.+)?', app.controller.home.singlefour);

  app.get('/model/init', app.controller.home.modelInit)

};
