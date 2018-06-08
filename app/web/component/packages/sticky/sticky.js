/**
 * Created by Peanut on 2017/12/26.
 * User: 287130319@qq.com
 */

let listenAction;
let stickyTop;
let zIndex;

const directive = {
  bind(el, binding) {
    const elStyle = el.style;
    const params = binding.value || {};
    stickyTop = params.stickyTop || 0;
    zIndex = params.zIndex || 1000;
    elStyle.position = '-webkit-sticky';
    elStyle.position = 'sticky';
    // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
    if (~elStyle.position.indexOf('sticky')) {
      elStyle.top = `${stickyTop}px`;
      elStyle.zIndex = zIndex;
      return;
    }
    elStyle.position = 'relative';
    const childStyle = el.firstElementChild.style;
    childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`;
    let active = false;
    const sticky = () => {
      if (active) {
        return;
      }
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`;
      }
      childStyle.willChange = 'transform';
      childStyle.position = 'fixed';
      active = true;
    };
    const reset = () => {
      if (!active) {
        return;
      }
      childStyle.position = 'absolute';
      active = false;
    };
    const check = () => {
      const offsetTop = el.getBoundingClientRect().top;
      if (offsetTop <= stickyTop) {
        sticky();
        return;
      }
      reset();
    };
    listenAction = () => {
      if (!window.requestAnimationFrame) {
        return setTimeout(check, 16);
      }
      return window.requestAnimationFrame(check);
    };
    window.addEventListener('scroll', listenAction);
  },
  unbind() {
    window.removeEventListener('scroll', listenAction);
  },
  update(el, binding) {
    const meEl = el;
    const params = binding.value || {};
    stickyTop = params.stickyTop || 0;
    zIndex = params.zIndex || 1000;
    const childStyle = meEl.firstElementChild.style;
    meEl.style.top = `${stickyTop}px`;
    childStyle.top = `${stickyTop}px`;
    meEl.style.zIndex = zIndex;
    childStyle.zIndex = zIndex;
  },
};

export default directive;
