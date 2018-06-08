<template>
  <div class="kd-new-tabs" ref="wrapper">
    <div class="kd-tab-banner" ref="banner">
      <slot name="banner"></slot>
    </div>
    <div class="kd-tab" ref="tab" :class="tabClass">
      <div class="kd-tab-wrapper">
        <slot name="tab"></slot>
        <div class="kd-tab-bar" :style="barStyle" v-if="barShow"></div>
      </div>
    </div>
    <div class="kd-swipe-wrapper" :style="{paddingTop: this.tabHeight, marginTop: `-${this.tabHeight}`}">
      <div
        ref="swipe"
        class="kd-swipe"
        :style="swipeStyle"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
      >
        <slot name="swipe"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import { requestAnimationFrame, cancelAnimationFrame } from './../../utils/ticker';
  import Tween from './../../utils/animation';

  export default {
    name: 'kd-tabs',
    props: {
      defaultIndex: {
        type: Number,
        default: 0,
      },
      duration: {
        type: Number,
        default: 300,
      },
      barShow: {
        type: Boolean,
        default: true,
      },
      tabClass: {
        type: String,
        default: '',
      },
      animationType: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isReady: false,
        swipeItem: [],
        tabItem: [],
        touchState: {},
        index: this.defaultIndex,
        animating: false,
        dragging: false,
        scrollY: null,
        swipeLeft: '0%',
        needAnimate: false,
        barWidth: '0px',
        barLeft: '0px',
        tabHeight: '0px',
        swipeWidth: '0px',
        bannerHeight: 0,
        resetTimer: null,
      };
    },
    computed: {
      swipeStyle() {
        const style = {};
        if (this.animationType) {
          style.transform = `translate3d(${this.swipeLeft}, 0, 0)`;
          if (this.needAnimate) {
            style.transition = `transform ${this.duration}ms linear`;
          }
        } else {
          const currentLeft = parseInt(this.swipeWidth, 10) * parseInt(this.swipeLeft, 10);
          const left = currentLeft / 100;
          style.left = `${left}px`;
        }
        return style;
      },
      barStyle() {
        const style = {};
        style.width = this.barWidth;
        style.left = this.barLeft;
        if (this.needAnimate && this.animationType) {
          style.transition = `all ${this.duration}ms linear`;
        }
        return style;
      },
    },
    methods: {
      swipeItemMounted() {
        if (!this.isReady) {
          return;
        }
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.reset();
        }, 100);
      },
      tabItemMounted() {
        if (!this.isReady) {
          return;
        }
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.reset();
        }, 100);
      },
      swipeItemDestroyed() {
        if (!this.isReady) {
          return;
        }
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.reset();
        }, 100);
      },
      tabItemDestroyed() {
        if (!this.isReady) {
          return;
        }
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.reset();
        }, 100);
      },
      reset() {
        if (this.$slots.swipe && this.$slots.swipe.length > 0) {
          this.swipeItem = this.$slots.swipe.map(item => item.componentInstance);
        } else {
          this.swipeItem = {};
        }
        if (!this.$slots.tab || this.$slots.tab.length <= 0) {
          return;
        }
        this.tabHeight = `${this.$refs.tab.offsetHeight}px`;
        this.bannerHeight = this.$refs.banner.offsetHeight;
        this.tabItem = this.$slots.tab.map(item => item.componentInstance);
        this.tabItem.forEach((item, index) => {
          const eachTab = item;
          eachTab.index = index;
        });
        if (this.tabItem.length > 0) {
          this.doAnimateByIndex(this.index, false);
        }
      },
      doScrollAnimate(currentLeft, targetLeft, needAnimate) {
        if (!needAnimate) {
          this.$refs.tab.scrollLeft = targetLeft;
          return;
        }
        const start = new Date();
        let raf = 0;
        const animateLoop = () => {
          const now = new Date();
          const doing = (now - start) + 1;
          if (doing > this.duration) {
            this.$refs.tab.scrollLeft = targetLeft;
            cancelAnimationFrame(raf);
            return;
          }
          const scrollLeft = Tween.Linear(doing,
            currentLeft, targetLeft - currentLeft, this.duration);
          this.$refs.tab.scrollLeft = scrollLeft;
          raf = requestAnimationFrame(animateLoop.bind(this));
        };
        animateLoop.call(this);
      },
      shrinkBanner() {
        const startTop = this.$refs.wrapper.scrollTop;
        const endTop = this.bannerHeight;
        if (startTop === endTop) {
          return;
        }
        const start = new Date();
        let raf = 0;
        const animateLoop = () => {
          const now = new Date();
          const doing = (now - start) + 1;
          if (doing > this.duration) {
            this.$refs.wrapper.scrollTop = endTop;
            cancelAnimationFrame(raf);
            return;
          }
          const scrollTop = Tween.Linear(doing,
            startTop, endTop - startTop, this.duration);
          this.$refs.wrapper.scrollTop = scrollTop;
          raf = requestAnimationFrame(animateLoop.bind(this));
        };
        animateLoop.call(this);
      },
      translateBanner(offsetY) {
        const distance = Math.abs(offsetY);
        const top = this.$refs.wrapper.scrollTop;
        this.$refs.wrapper.scrollTop = top + distance;
      },
      doAnimateByIndex(index, needAnimate) {
        if (!this.$slots.tab || this.$slots.tab.length <= 0) {
          return;
        }
        const barWidth = this.tabItem[index].$el.offsetWidth;
        const barLeft = this.tabItem[index].$el.offsetLeft;
        const currentLeft = this.$refs.tab.scrollLeft;
        const swipeWidth = this.$refs.swipe.offsetWidth;
        const targetLeft = (Math.abs(barLeft) + (barWidth / 2)) - (swipeWidth / 2);
        this.needAnimate = !!needAnimate;
        this.swipeLeft = `-${index * 100}%`;
        this.barWidth = `${barWidth}px`;
        this.barLeft = `${barLeft}px`;
        this.doScrollAnimate(currentLeft, targetLeft, needAnimate);
      },
      doTransition({ index, offsetX, swipeWidth }) {
        const totalCount = this.swipeItem.length;
        const toIndex = offsetX < 0 ? index + 1 : index - 1;
        const isBorder = toIndex < 0 || toIndex >= totalCount;
        if (totalCount < 2 || isBorder) {
          return;
        }
        const percentOffsetX = offsetX / swipeWidth;
        const targetPercent = (-index + percentOffsetX) * 100;
        const toWidth = this.tabItem[toIndex].$el.offsetWidth;
        const toLeft = this.tabItem[toIndex].$el.offsetLeft;
        const fromWidth = this.tabItem[index].$el.offsetWidth;
        const fromLeft = this.tabItem[index].$el.offsetLeft;
        const percentWidth = (Math.abs(percentOffsetX) * (toWidth - fromWidth)) + fromWidth;
        const percentLeft = (Math.abs(percentOffsetX) * (toLeft - fromLeft)) + fromLeft;
        const scrollLeft = (Math.abs(percentLeft) + (percentWidth / 2)) - (swipeWidth / 2);
        this.needAnimate = false;
        this.swipeLeft = `${targetPercent}%`;
        this.barLeft = `${percentLeft}px`;
        this.barWidth = `${percentWidth}px`;
        this.$refs.tab.scrollLeft = scrollLeft;
      },
      touchStateInit(touch) {
        const { offsetWidth, offsetHeight } = this.$refs.swipe;
        const { pageX, pageY, clientY } = touch;
        this.touchState = {
          startTime: new Date(),
          startX: pageX,
          startY: pageY,
          startYAbsolute: clientY,
          swipeWidth: offsetWidth,
          swipeHeight: offsetHeight,
        };
      },
      touchStateMove(touch) {
        const { currentX, startX, startY, startYAbsolute, swipeWidth, swipeHeight } = this.touchState;
        const { pageX, pageY, clientY } = touch;
        const offsetX = pageX - startX;
        const offsetY = pageY - startY;
        this.touchState = {
          ...this.touchState,
          speedX: pageX - currentX,
          currentX: pageX,
          currentY: pageY,
          currentYAbsolute: clientY,
          offsetX: Math.min(Math.max(-swipeWidth + 1, offsetX), swipeWidth - 1),
          offsetY: Math.min(Math.max(-swipeHeight + 1, offsetY), swipeHeight - 1),
          offsetYAbsoluteY: startYAbsolute - clientY,
          directionX: offsetX > 0 ? 'right' : 'left',
          directionY: offsetY > 0 ? 'up' : 'down',
        };
      },
      touchStateEnd() {
        const now = new Date();
        const { startTime, offsetX, offsetY, currentX, swipeWidth } = this.touchState;
        const duration = now - startTime;
        let fireClick = false;
        let towards = null;
        let isMoved = true;
        if (duration < 300) {
          if (Math.abs(offsetX) < 5 && Math.abs(offsetY) < 5) {
            fireClick = true;
          }
          if (isNaN(offsetX) || isNaN(offsetY)) {
            fireClick = true;
          }
          if (currentX === undefined) {
            isMoved = false;
          }
        }
        if (duration < 300 || Math.abs(offsetX) > (swipeWidth / 2)) {
          towards = offsetX < 0 ? 'next' : 'prev';
        }
        if (this.swipeItem.length < 2) {
          towards = null;
        }
        this.touchState = {
          ...this.touchState,
          duration,
          fireClick,
          towards,
          isMoved,
        };
      },
      resetTouch() {
        this.dragging = false;
        this.touchState = {};
        this.scrollY = null;
      },
      doOnTouchStart(event) {
        if (!this.$slots.tab || this.$slots.tab.length <= 0) {
          return;
        }
        const touch = event.touches[0];
        this.touchStateInit(touch);
      },
      doOnTouchMove(event) {
        if (!this.$slots.tab || this.$slots.tab.length <= 0) {
          return;
        }
        const touch = event.touches[0];
        this.touchStateMove(touch);
        const { offsetX, offsetY, swipeWidth, directionY } = this.touchState;
        const distanceX = Math.abs(offsetX);
        const distanceY = Math.abs(offsetY);
        if (this.scrollY === null) {
          let touchAngle;
          if (distanceY === 0) {
            this.scrollY = false;
          } else if ((distanceX * distanceX) + (distanceY * distanceY) >= 25) {
            touchAngle = (Math.atan2(distanceY, distanceX) * 180) / Math.PI;
            this.scrollY = touchAngle > 45;
          } else {
            this.scrollY = false;
          }
        }
        if (this.scrollY) {
          if (this.needShrink() && directionY === 'down') {
            event.preventDefault();
          }
          return;
        }
        event.preventDefault();
        if (!this.animationType) {
          return;
        }
        this.doTransition({
          index: this.index,
          offsetX,
          swipeWidth,
        });
      },
      needShrink() {
        const scrollTop = this.$refs.wrapper.scrollTop;
        return scrollTop < this.bannerHeight;
      },
      doOnTouchEnd() {
        if (!this.$slots.tab || this.$slots.tab.length <= 0) {
          return;
        }
        if (!this.animationType) {
          return;
        }
        this.touchStateEnd();
        const { fireClick, towards, isMoved } = this.touchState;
        if (fireClick) {
          this.swipeItem[this.index].$emit('click');
        }
        if (!isMoved) {
          this.doAnimateByIndex(this.index, true);
          return;
        }
        if (!towards) {
          this.doAnimateByIndex(this.index, true);
          return;
        }
        let newIndex = this.index;
        if (towards === 'next' && this.index < this.swipeItem.length - 1) {
          newIndex = this.index + 1;
        }
        if (towards === 'prev' && this.index > 0) {
          newIndex = this.index - 1;
        }
        this.setTabIndex(newIndex);
        this.doAnimateByIndex(newIndex, true);
      },
      handleTouchStart(event) {
        if (this.animating) {
          return;
        }
        this.dragging = true;
        this.doOnTouchStart(event);
      },
      handleTouchMove(event) {
        const { directionY, offsetY } = this.touchState;
        if (!this.dragging) {
          return;
        }
        if (this.scrollY) {
          if (this.needShrink() && directionY === 'down') {
            this.translateBanner(offsetY);
            event.preventDefault();
          }
          return;
        }
        this.doOnTouchMove(event);
      },
      handleTouchEnd() {
        if (this.scrollY) {
          const { directionY } = this.touchState;
          if (directionY === 'down' && this.needShrink()) {
            this.shrinkBanner();
          }
          this.resetTouch();
          return;
        }
        if (!this.dragging) {
          return;
        }
        this.doOnTouchEnd();
        this.resetTouch();
      },
      tabClick(index) {
        this.doAnimateByIndex(index, true);
        this.setTabIndex(index);
      },
      setTabIndex(index) {
        if (this.index !== index) {
          this.index = index;
          this.$emit('change', this.index);
        }
      },
    },
    mounted() {
      this.isReady = true;
      this.swipeWidth = this.$refs.swipe.offsetWidth;
      this.reset();
    },
    destroyed() {
      if (this.resetTimer) {
        clearTimeout(this.resetTimer);
        this.resetTimer = null;
      }
    },
  };
</script>
<style lang="less">
  @px2rem: 36;
  @index: 1;

  .kd-new-tabs {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .kd-tab {
    position: relative;
    z-index: @index + 1;
    width: 100%;
    font-size: 0;
    line-height: 0;
    background-color: #fff;
    overflow: scroll;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 0.0277778rem 0.0555556rem 0px;

    &-wrapper {
      white-space: nowrap;
      height: 100%;
    }
    &-item {
      display: inline-block;
      font-size: 16rem/@px2rem;
      color: #333333;
      text-align: center;
    }

    &-bar {
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: #000;
    }
  }

  .kd-swipe {
    position: relative;
    z-index: @index;
    height: 100%;
    white-space: nowrap;
    font-size: 0;
    line-height: 0;

    &-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      -webkit-overflow-scrolling: touch
    }
  }
  .flashSaleTabClass {
    background-color: #ED264F;
  }
</style>
