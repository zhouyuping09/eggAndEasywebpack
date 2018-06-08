/**
 * Created by Peanut on 2018/1/10.
 * User: 287130319@qq.com
 */

export const backTop = (durations, callback = undefined) => {
  let dom;
  if (document.documentElement.scrollTop) {
    dom = document.documentElement;
  } else {
    dom = document.body;
  }
  const scrollTop = dom.scrollTop;
  
  for (let i = 60; i >= 0; i--) {
    setTimeout((i => {
      return () => {
        dom.scrollTop = scrollTop * i / 60;
        if (i === 0 && typeof callback === 'function') {
          callback();
        }
      };
    })(i), durations * (1 - i / 60));
  }
};