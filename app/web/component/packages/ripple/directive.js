const getElOffset = (el) => {
  let position = {
    top: 0,
    left: 0,
  };
  const element = document.documentElement;
  if (typeof el.getBoundingClientRect !== 'undefined') {
    position = el.getBoundingClientRect();
  }
  return {
    top: (position.top + window.pageYOffset) -  element.clientTop,
    left: (position.left + window.pageXOffset) - element.clientLeft,
  };
};

const getStyles = (top, left, scale, duration, opacity) => {
  const styleList = [];
  styleList.push(`top: ${top}px;`);
  styleList.push(`left: ${left}px;`);
  styleList.push(`-webkit-transform: ${scale};`);
  styleList.push(`-moz-transform: ${scale};`);
  styleList.push(`-ms-transform: ${scale};`);
  styleList.push(`-o-transform: ${scale};`);
  styleList.push(`transform: ${scale};`);
  styleList.push(`opacity: ${opacity};`);
  styleList.push(`-webkit-transition-duration: ${duration}ms;`);
  styleList.push(`-moz-transition-duration: ${duration}ms;`);
  styleList.push(`-o-transition-duration: ${duration}ms;`);
  styleList.push(`transition-duration: ${duration}ms;`);
  styleList.push('-webkit-transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);');
  styleList.push('-moz-transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);');
  styleList.push('-o-transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);');
  styleList.push('transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);');
  return styleList.join('');
};
import './ripple.less';

const directive = {
  bind(el) {
    const duration = 750;
    const targetDiv = el;
    targetDiv.className = `${targetDiv.className} kd-ripple`;
    el.addEventListener('click', (event) => {
      const rippleDiv = document.createElement('div');
      const position = getElOffset(el);
      const scale = `scale(${el.clientWidth / 5})`;
      const top = event.pageY - position.top - 5;
      const left = event.pageX - position.left - 5;
      rippleDiv.className = `${rippleDiv.className} kd-ripple-animation`;
      rippleDiv.setAttribute('style', getStyles(top, left, 1, duration, 1));
      targetDiv.appendChild(rippleDiv);
      setTimeout(() => {
        rippleDiv.setAttribute('style', getStyles(top, left, scale, duration, 0));
        setTimeout(() => {
          targetDiv.removeChild(rippleDiv);
        }, duration);
      }, 50);
    });
  },
};

export default directive;
