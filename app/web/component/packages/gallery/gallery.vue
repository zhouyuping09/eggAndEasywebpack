<template>
  <transition name="fade">
    <div class="kd-gallery"
         v-if="show" ref="mask">
      <div class="kd-gallery__header" v-ripple>
        <div @click="hideImg">
          <Icon type="md_btn_close" class="icon"></Icon>
        </div>
      </div>
      <div class="kd-gallery__wrap">
        <kd-swipe ref="list"
                  :auto="0"
                  animating="true"
                  :defaultIndex="activeIndex"
                  :show-indicators="false"
                  @change="changeIndex">
          <kd-swipe-item v-for="(item, index) in imgList"
                         :key="index"
                         ref="item">
            <img :src="item.img" alt="" class="kd-gallery__img">
          </kd-swipe-item>
        </kd-swipe>
        <div class="kd-gallery__down">
          <a :href="downloadUrl" download v-ripple>
            <Icon type="icon_download" class="icon"></Icon>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Icon from './../icon/icon';
  import Swipe from './../swipe/swipe';
  import SwipeItem from './../swipe/swipe-item';
  import Ripple from './../ripple/directive';

  export default {
    name: 'gallery',
    directives: {
      ripple: Ripple,
    },
    components: {
      Icon,
      'kd-swipe': Swipe,
      'kd-swipe-item': SwipeItem,
    },
    model: {
      prop: 'show',
      event: 'change',
    },
    props: {
      protalUrl: {
        type: String,
        default: '',
      },
      imgList: {
        type: Array,
        default: [],
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activeIndex: 0,
      };
    },
    computed: {
      downloadUrl() {
        return this.imgList[this.activeIndex].img;
      },
    },
    methods: {
      changeIndexByProtalImage() {
        const imgList = this.imgList;
        for (let i = 0; i < imgList.length; i++) {
          const img = imgList[i].img;
          if (this.protalUrl === img) {
            this.activeIndex = i;
            return;
          }
        }
      },
      changeIndex(index) {
        this.activeIndex = index;
      },
      hideImg() {
        this.$emit('update:show', false);
        this.$emit('change', false);
      },
    },
    watch: {
      show(val) {
        this.show = val;
      },
      protalUrl(val) {
        this.changeIndexByProtalImage();
      },
    },
    mounted() {
      window.onload = function full() {
        if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
          const bodyTag = document.getElementsByTagName('body')[0];
          const style = (document.documentElement.clientWidth / screen.width) * screen.height;
          bodyTag.style.height = `${style}px`;
        }
        setTimeout(() => {
          window.scrollTo(0, 1);
        }, 0);
      };
      this.changeIndexByProtalImage();
    },
  };
</script>

<style lang='less' scoped>
  @px2rem: 36;

  .kd-gallery{
    position: fixed;
    top: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 1);
    overflow: hidden;
    width: 10rem;
    height: 100%;
    text-align: center;
    display: block;
    &.appWrap{
      padding-top: 52rem/@px2rem;
    }
    &__header{
      width: 48rem/@px2rem;
      height: 48rem/@px2rem;
      position: absolute;
      right: 4rem/@px2rem;
      top: 4rem/@px2rem;
      div{
        width: 24rem/@px2rem;
        height: 24rem/@px2rem;
        position: absolute;
        top: 12rem/@px2rem;
        right: 12rem/@px2rem;
        display: block;
        text-align: center;
        font-size: 24rem/@px2rem;
        color: #FFFFFF;
      }
      .icon {
        font-size: 24rem/@px2rem;
      }
    }
    &__wrap{
      width: 360rem/@px2rem;
      min-height: 360rem/@px2rem;
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .kd-swipe{
      height: 360rem/@px2rem;
      left: 0;
      &-item{
        img{
          width: 360rem/@px2rem;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &__down{
      width: 360rem/@px2rem;
      height: 60rem/@px2rem;
      position: relative;
      display: block;
      color: #FFFFFF;
      text-align: center;
      padding-top: 12rem/@px2rem;
      a{
        display: block;
        width: 48rem/@px2rem;
        height: 48rem/@px2rem;
        line-height: 48rem/@px2rem;
        text-align: center;
        margin: 0 auto;
        color: #FFFFFF;
        .icon{
          font-size: 24rem/@px2rem;
        }
      }
    }
  };
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
