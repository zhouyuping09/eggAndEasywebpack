const Throttle = function throttle(fn, delay, atleast) {
  this.fn = fn;
  this.delay = delay;
  this.atleast = atleast;
  this.init();
};

Throttle.prototype = {
  init() {
    this.previous = null;
    this.timer = null;
  },
  detect() {
    const now = +new Date();

    if (!this.previous) {
      this.previous = now;
    }
    if (now - this.previous > this.atleast) {
      this.atleastCond();
    } else {
      this.timeoutCond();
    }
  },
  atleastCond() {
    this.fn();
    this.previous = +new Date();
  },
  timeoutCond() {
    const that = this;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      that.fn();
      that.previous = null;
    }, that.delay);
  },
};

export default Throttle;
