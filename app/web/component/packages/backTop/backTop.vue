<template>
  <div v-if="backShow"
       class="kd-back-up"
       :style="propsStyle"
       @click="moveTop">
    <slot>
      <div class="kd-back-up-fault">
        <Icon></Icon>
      </div>
    </slot>
  </div>
</template>

<script>
  import Icon from './../icon/icon.vue';
  import throttle from 'lodash/throttle';
  import { backTop } from './assist';
  export default {
    name: 'kd-back-top',
    data() {
      return {
        backShow: false,
      };
    },
    components: {
      Icon
    },
    props: {
      height: {
        type: Number,
        default: 200
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      durations: {
        type: Number,
        default: 500
      },
      callBack: {
        type: Function,
        default: () => {
        }
      }
    },
    computed: {
      propsStyle() {
        return {
          right: `${this.right}px`,
          bottom: `${this.bottom}px`
        };
      }
    },
    methods: {
      moveTop() {
        backTop(this.durations, this.callBack);
      },
      scrollListener() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        this.backShow = top >= this.height;
      }
    },
    mounted() {
      this._scrollListener = throttle(this.scrollListener, 100);
      window.addEventListener('scroll', this._scrollListener, false);
      window.addEventListener('resize', this._scrollListener, false);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this._scrollListener, false);
      window.removeEventListener('resize', this._scrollListener, false);
    }
  };
</script>

<style lang="less" scoped>
  .kd-back-up {
    position: fixed;
    z-index: 100;
    cursor: pointer;
    display: block;
    border-radius: 4px;
    &-default {
      background-color: rgba(126,87,194,.6);
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
      transition: all .2s ease-in-out;
      display: block;
    }
    i {
      color: #fff;
      font-size: 24px;
      padding: 8px 12px;
    }
  }
</style>