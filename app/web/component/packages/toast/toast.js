/* global document require*/

/*
*
@method vue-toast
*
@property:message(string);position(top/middle/bottom);duration(毫秒)
*
@方法：引入JS文件import Toast from './.../toast.js';
       使用一：Toast('');
       使用二：Toast({
       message:'',
       position:'',
       duration:'',
       })
*
* */


import Vue from 'vue';
import toast from './toast.vue';
const ToastConstructor = Vue.extend(toast);
const obj = {};
const removeDom = event => {
  event.target.parentNode.removeChild(event.target);
};
ToastConstructor.prototype.close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.$el.addEventListener('webkitTransitionEnd',  removeDom);
};
const Toast = (options = {}) => {
  if (obj.el) return;
  const instance = new ToastConstructor().$mount(document.createElement('div'));
  const duration = options.duration || 1500;
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  document.body.appendChild(instance.$el);
  obj.el = instance.$el;
  instance.visible = true;
  Vue.nextTick(() => {
    instance.timer = setTimeout(function() {
      instance.close();
      obj.el = null;
    }, duration);
  });
  return instance;
};
export default Toast;