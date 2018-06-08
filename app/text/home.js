/* Multilingual text*/

module.exports = {
  home(ctx) {
    const text = {
      hello: ctx.__('hello'),
    };
    return text;
  },
};
