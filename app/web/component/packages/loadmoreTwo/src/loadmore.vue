<!--suppress ALL -->
<template>
  <div class="loadmore scroll"
       ref="scrolls"
       @scroll="scrollEvent"
       :style="{height:  boxHeight}"
  >
    <slot name="top">
      <div class="loadmore-top" v-if="true" :style="{ height:  translate + 'px', lineHeight:  translate + 'px'}">
        <div class="pullText">{{topText}}</div>
        <div class="loading" v-show="topStatus === 'isloading' && hide">
          <Icon type="md_loadingCircle" :spin="true" class="loading-icon"></Icon>
        </div>
        <div class="end" v-show="topStatus === 'end' && hide">
          <span class="end-content">- End -</span>
        </div>
        <div class="end" v-show="topStatus === 'error' && hide">
          <span class="end-content">error</span>
        </div>
        <div class="end" v-show="topStatus === 'success' && hide">
          <div>success</div>
        </div>
      </div>
    </slot>
    <div class="data-content" ref="content" >
      <slot name="content"></slot>
    </div>
    <slot name="bottom">
      <div class="loadmore-bottom" ref="bottom">
        <div class="loading" v-show="bottomStatus === 'isloading' ">
          <Icon type="md_loadingCircle" :spin="true" class="loading-icon"></Icon>
        </div>
        <div class="end" v-show="bottomStatus === 'end'">
          <span class="end-content">- End -</span>
        </div>
        <div class="btn" v-show="bottomStatus === 'error'" @click="loadMore">
          <kd-button type="primary" class="btn-content">error</kd-button>
        </div>
        <div class="end" v-show="bottomStatus === 'success'">
          <div>success</div>
        </div>
      </div>
    </slot>
      <div class="backToTop" v-show="backOpen&&backShow" @click.stop.prevent="backToTop">
          <Icon :type="'md_btn_back'" class="icon icon-up"></Icon>
      </div>
  </div>
</template>
<script>
  import Icon from '../../icon/icon.vue';
  import Button from '../../button/button.vue';
  import Throttle from './throttle';

  export default {
    data() {
      return {
        clientHeight: 0, // 视窗高度
        throttleScroll: null, // 节流函数变量
        init: true,
        // TODO 盒子高度的问题
        boxHeight: '0px',
        topLoad: false,
        translate: 0,
        initTranslate: 0,
        scrollEventTarget: null,
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        topText: '',
        pullDistance: 0,
        offsetTop: 0,
        hide: false,
        backShow: false,
      };
    },
    props: {
      // 控制组件滚动到哪里
      scrollTo: {
        type: Number,
        default: 0,
      },

      // 回到顶部按钮是否开启
      backOpen: {
        type: Boolean,
        default: false,
      },

      // 底部加载状态，接受'isloading','error','end','success'四种状态
      bottomStatus: {
        type: String,
        default: '',
      },

      // 顶部加载状态，接受'isloading','error','end','success'四种状态
      topStatus: {
        type: String,
        default: '',
      },

      // 顶部拉动文本
      pullText: {
        type: String,
        default: '下拉加载',
      },

      // 顶部拉动到最大距离时文本
      dropText: {
        type: String,
        default: '松开刷新',
      },

      // 距离底部的加载距离
      distance: {
        type: Number,
        default: 50,
      },

      // 顶部滑动比例
      distanceIndex: {
        type: Number,
        default: 1,
      },

      // 顶部下拉刷新最大拉动距离
      maxDistance: {
        type: Number,
        default: 75,
      },

      // 禁用下拉刷新,false为禁用，true为开启下拉刷新
      prohibitTopPull: {
        type: Boolean,
        default: false,
      },

      // 当前tab是否固定了位置
      tabfixed: {
        type: [Boolean, String],
        default: false,
      },

      // 当前页面tab距离顶部的距离
      tabOffsetDistance: {
        type: Number,
        default: 0,
      },

      // 确定此滑动区域滑动到顶部
      scrollTopEvent: {
        type: Boolean,
        default: false,
      },

    },
    watch: {
      topStatus(val) {
        if (this.hide && val !== 'isloading') {
          let topStatusTimer = null;
          const that = this;
          clearTimeout(topStatusTimer);
          topStatusTimer = setTimeout(() => {
            that.hideTop();
          }, 1000);
        }
      },
      scrollTo(val) {
        if (this.tabOffsetDistance > 100) {
          if (this.tabfixed && this.scrollTo <= this.tabOffsetDistance) {
            this.scrollEventTarget.scrollTop = this.tabOffsetDistance;
          } else if (!this.tabfixed) {
            this.scrollEventTarget.scrollTop = 0;
          } else {
            this.scrollEventTarget.scrollTop = this.scrollTo;
          }
        } else {
          this.scrollEventTarget.scrollTop = this.scrollTo;
        }
      },
      scrollTopEvent(val) {
        if (val) {
          this.backToTop();
          this.$emit('backToTop');
        }
      },
    },
    methods: {
      initData() {
        const offsetTop = this.offset(this.$refs.scrolls).top;
        this.boxHeight = this.clientHeight + (-offsetTop);
        this.boxHeight = `${this.boxHeight}px`;
        this.scrollEventTarget = this.$refs.scrolls;
        // 如果开启下拉刷新，挂触摸事件
        if (this.prohibitTopPull) {
          this.scrollEventTarget.addEventListener('touchstart', this.handleTouchStart);
          this.scrollEventTarget.addEventListener('touchmove', this.handleTouchMove);
          this.scrollEventTarget.addEventListener('touchend', this.handleTouchEnd);
        }
      },
      // 回到顶部
      backToTop() {
        const distance = this.scrollEventTarget.scrollTop;
        const duration = 500;
        const interval = 10;
        const total = distance / duration;
        const step = total * interval;
        const that = this;
        const timer = setInterval(() => {
          const curT = that.scrollEventTarget.scrollTop;
          if (curT === 0) {
            that.backShow = false;
            clearInterval(timer);
          }
          that.scrollEventTarget.scrollTop = curT - step;
        }, interval);
      },

      // 滑到底部加载
      loadMore() {
        const scrollTop = this.scrollEventTarget.scrollTop;
        this.$emit('scrollTop', scrollTop);
        if (this.backOpen) {
          if (scrollTop > this.clientHeight) {
            this.backShow = true;
          } else {
            this.backShow = false;
          }
        }
        if (this.bottomStatus === 'end') {
          return;
        }
        if (this.bottomStatus === 'isloading') {
          return;
        }
        const scrollHeight = this.scrollEventTarget.scrollHeight;
        const BottomOffsetTop = this.$refs.bottom.offsetTop;
        const loadingDistance = scrollTop + this.clientHeight + this.distance;
        const otherLoadingDistance = BottomOffsetTop + (-loadingDistance);
        if (this.init) {
          this.$emit('loadMoreItem', true);
          this.init = false;
          return;
        }
        if (loadingDistance > scrollHeight) {
          this.$emit('loadMoreItem', true);
          return;
        }
        if (otherLoadingDistance < this.clientHeight) {
          this.$emit('loadMoreItem', true);
        }
      },
      scrollEvent() {
        this.throttleScroll.detect();
      },
      offset(curEle) {
        let l = curEle.offsetLeft;
        let t = curEle.offsetTop;
        let p = curEle.offsetParent;
        while (p) {
          l += p.clientLeft + p.offsetLeft;
          t += p.clientTop + p.offsetTop;
          p = p.offsetParent;
        }
        return { left: l, top: t };
      },


      // 下拉加载
      handleTouchStart(event) {
        // 上次加载事件未完成
        if (this.hide) {
          return;
        }
        this.startY = event.touches[0].clientY;
        this.offsetTop = this.scrollEventTarget.offsetTop;
        this.initTranslate = this.translate;
        this.startScrollTop = this.scrollEventTarget.scrollTop;
      },
      handleTouchMove(event) {
        // 上次加载事件未完成
        if (this.hide) {
          return;
        }
        // 是否在区域内滑动
        const topArea = this.startY < this.scrollEventTarget.getBoundingClientRect().top;
        const bottomArea = this.startY > this.scrollEventTarget.getBoundingClientRect().bottom;
        if (topArea && bottomArea) {
          return;
        }
        // 当前不是在最顶端下拉
        if (this.startScrollTop > 0) {
          return;
        }

        this.currentY = event.touches[0].clientY;
        this.pullDistance = (this.currentY - this.startY) / this.distanceIndex;
        // 滑动距离为负，不要
        if (this.pullDistance < 0) {
          return;
        }
        if (this.startScrollTop === 0 && this.translate >= 20) {
          this.topText = this.pullText;
        } else {
          this.topText = '';
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.pullDistance < this.maxDistance) {
          this.translate = this.pullDistance + this.initTranslate;
        } else {
          this.pullDistance = this.maxDistance;
          this.topText = this.dropText;
          this.translate = this.pullDistance + this.initTranslate;
        }
      },
      handleTouchEnd() {
        // 上次加载事件未完成
        if (this.hide) {
          return true;
        }
        // 不是在顶部触发的时间
        if (this.startScrollTop > 0) {
          return true;
        }
        if (this.pullDistance <= 0) {
          return true;
        }

        let timer = null;
        clearInterval(timer);
        if (this.pullDistance + 5 > this.maxDistance) {
          this.topText = '';
          this.$emit('loadMoreItem', false);
          this.hide = true;
        } else {
          this.topText = '';
          this.hideTop();
        }
        timer = setInterval(() => {
          if (this.pullDistance <= 60) {
            clearInterval(timer);
            this.pullDistance = 60;
            this.translate = this.pullDistance;
          }
          this.pullDistance -= 1;
          this.translate = this.pullDistance;
        }, 5);
        return true;
      },
      hideTop() {
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
          if (this.translate <= 0) {
            clearInterval(timer);
            this.translate = 0;
          }
          if (this.translate <= 20) {
            this.hide = false;
          }
          this.translate -= 1;
        }, 5);
      },
    },
    components: {
      Icon,
      'kd-button': Button,
    },
    mounted() {
      this.$nextTick(() => {
        this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.initData();
        this.loadMore();
      });
      this.throttleScroll = new Throttle(this.loadMore, 50, 50);
    },
  };
</script>
<style scoped lang="less">
    @px2rem: 36;
    .scroll {
        width: 10rem;
        margin: 0 auto;
        position: relative;
        -webkit-overflow-scrolling:touch;
        overflow-y: scroll;
    }

    .data-content {
        width: 10rem;
        margin: 0 auto;
        height: auto;
        -webkit-overflow-scrolling:touch;
        overflow-y: scroll;
    }

    .loadmore-bottom {
        width: 10rem;
        height: 58rem/@px2rem;
        line-height: 58rem/@px2rem;
        margin: 0 auto;
        text-align: center;
        // background-color: #EBEBEC;
        // background-color: #ffffff;
        .loading {
            height: 58rem/@px2rem;
            line-height: 58rem/@px2rem;
            color: #EA5A1E;
            .loading-icon {
              display: block;
              margin-left:151rem/@px2rem;
              width: 58rem/@px2rem;
              height: 58rem/@px2rem;
              font-size: 22rem/@px2rem;
              animation: circle 1s infinite linear;
            }
        }
        .end {
            height: 58rem/@px2rem;
            line-height: 58rem/@px2rem;
            color: #999999;
            .end-content {
                font-size: 16rem/@px2rem;
            }

        }
        .btn {
            height: 58rem/@px2rem;
            line-height: 58rem/@px2rem;
            padding-top: 9rem/@px2rem;
            .btn-content {
                width: 40%;
                margin: 0 auto;
                height: 40rem/@px2rem;
            }

        }

    }

    .loadmore-top {
        width: 10rem;
        margin: 0 auto;
        text-align: center;
        background-color: #ffffff;
        .loading {
            color: #EA5A1E;
            .loading-icon {
                font-size: 22rem/@px2rem;
            }
        }
        .end {
            color: #999999;
            .end-content {
                font-size: 16rem/@px2rem;
            }

        }
    }

    .backToTop {
        position: fixed;
        right: 32rem/@px2rem;
        bottom: 96rem/@px2rem;
        z-index:300;
        width: 48rem/@px2rem;
        height: 48rem/@px2rem;
        line-height: 48rem/@px2rem;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        border-radius: 50%;
        text-align: center;
        background-color: #FAFAFA;
        color: #222222;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
        .icon{
            font-size: 28rem/@px2rem;
        }
    }
    @keyframes circle {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

</style>
