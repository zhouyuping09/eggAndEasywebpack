/**
 * Created by Peanut on 2017/12/8.
 * User: 287130319@qq.com
 */
/**
 * Modal()
 * Modal({
 *   title: '',
 *   message: '',
 *   confirmMessage: '',
 *   confirm() {},
 *   cancelMessage: '',
 *   cancel() {}
 * })
 */
import Vue from 'vue';
import modal from './modal.vue';
const DiamondConstructor = Vue.extend(modal);
const obj = {};
const removeDom = event => {
  event.target.parentNode.removeChild(event.target);
};

DiamondConstructor.prototype.close = function() {
  this.showModal = false;
  obj.el = null;
  this.$el.addEventListener('transitionend', removeDom, false);
  this.$el.addEventListener('webkitTransitionEnd', removeDom, false);
};

const Diamond = (options = {}) => {
  if (obj.el) return;
  const instance = new DiamondConstructor().$mount(document.createElement('div'));
  instance.title = options.title ? options.title : '';
  instance.message = options.message ? options.message : 'Do you confirm?';
  instance.confirmMessage = options.confirmMessage;
  instance.cancelMessage = options.cancelMessage ? options.cancelMessage : 'Cancel';
  instance.confirm = options.confirm ? options.confirm : function() {};
  instance.cancel = options.close ? options.close : instance.close;
  document.body.appendChild(instance.$el);
  obj.el = instance.$el;
  instance.showModal = true;
  return instance;
};


export default Diamond;
