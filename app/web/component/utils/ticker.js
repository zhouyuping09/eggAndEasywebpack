import Vue from 'vue';
import { window } from './window-ssr/ssr-window';

const $isServer = Vue.prototype.$isServer;

function timeout(callback) {
  let timeLast = 0;
  const timeCurrent = (new Date()).getTime();
  const timeDelta = Math.max(0, 16.7 - (timeCurrent - timeLast));

  /* Dynamically set delay on a per-tick basis to match 60fps. */
  /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
  timeLast = timeCurrent + timeDelta;

  return setTimeout(() => {
    callback(timeLast);
  }, timeDelta);
}

const rAFShim = (() => {
  if ($isServer) {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      timeout;
  }
  return timeout;
})();

const requestAnimationFrame = $isServer ? rAFShim : window.requestAnimationFrame || rAFShim;
const cancelAnimationFrame = $isServer ? clearTimeout : window.cancelAnimationFrame;

export {
  requestAnimationFrame,
  cancelAnimationFrame
};
