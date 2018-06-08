<template>
  <div :class="'kd-tabs kd-tabs-'+tabPosition">
    <div class="kd-tabs-tab" :style="barStyle">
      <div class="kd-tabs-tab-bar">
        <div
          class="kd-tabs-tab-bar-panel"
          :style="tabStyle"
          v-for="(tab, index) in tabs"
          v-bind:key="index"
          @click="handleActiveClick(index)"
        >
          {{ tab.name }}
        </div>
        <div :class="baseLineClass" :style="baseLineStyle"></div>
      </div>
    </div>
    <div class="kd-tabs-tab" :style="baseBarStyle"></div>
    <div class="kd-tabs-content" :style="contentStyle">
      <div
        class="kd-tabs-content-panel"
        v-for="(tab, index) in tabs"
        v-bind:key="index"
      >
        <div v-show="index === activeIndex">
          <slot :name="'kd-tabs-' + index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import './../../../asset/css/var.less';
  @px2rem: 36;

  .kd-tabs {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    align-items: flex-start;
    position: relative;
    // overflow: hidden;

    &-top {
      flex-direction: column;
    }
    &-bottom {
      flex-direction: column-reverse;
    }
    &-left {
      flex-direction: row;
    }
    &-right {
      flex-direction: row-reverse;
    }
    &-left,-right {
      .kd-tabs {
        &-tab {
          width: 30%!important;
          flex-direction: column;
          &-bar {
            flex-direction: column;
          }
        }
        &-content {
          flex-direction: column;
        }
      }
    }

    .kd-tabs {
      &-tab {
        height: auto;
        width: 100%;
        flex-shrink: 0;
        background-color: #fff;
        overflow: scroll;
        z-index: 1;

        &-bar {
          position: relative;
          width: 100%;
          height: auto;
          display: flex;
          overflow: visible;

          &-panel {
            text-align: center;
            color: @color-content;
            flex-shrink: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 36rem/@px2rem;
            line-height: 36rem/@px2rem;
          }
        }
        &-baseline__row {
          position: absolute;
          bottom: 0;
          top: auto;
          height: 2rem/@px2rem;
          background-color: @primary-color;
        }
        &-baseline__column {
          position: absolute;
          right: 0;
          left: auto;
          width: 2rem/@px2rem;
          background-color: @primary-color;
        }
      }
      &-content {
        position: relative;
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        overflow: visible;
        transition: all .3s;
        align-items: flex-start;
        &-panel {
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          overflow: hidden;
        }
      }
    }
  }
</style>
<script type="text/babel">
  export default {
    name: 'tabs',
    props: {
      animation: {
        type: Boolean,
        default: true,
      },
      sticky: {
        type: Boolean,
        default: false,
      },
      tabs: {
        type: Array,
        required: true,
      },
      tabPosition: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'left', 'right'].includes(value);
        }
      },
      defaultActiveIndex: {
        type: Number,
        default: 0,
      },
      onTabActive: {
        type: Function,
        default() {
          return () => {};
        }
      },
    },
    data() {
      return {
        activeIndex: this.defaultActiveIndex < this.tabs.length ? this.defaultActiveIndex : 0,
        isColumn: this.tabPosition === 'left' || this.tabPosition === 'right',
      };
    },
    computed: {
      barStyle() {
        if (this.sticky) {
          return {
            position: 'fixed',
            width: '10rem',
            zIndex: 10,
            boxShadow: '0 0.02777778rem 0.05555556rem 0 rgba(0, 0, 0, 0.13)'
          };
        } else {
          return {};
        }
      },
      baseBarStyle() {
        const height = 36;
        if (this.sticky) {
          return {
            height: `${height / 36}rem`,
          };
        } else {
          return {};
        }
      },
      tabWidth() {
        if (this.tabs.length > 0 && this.tabs.length <= 5) {
          return 100 / this.tabs.length;
        } else {
          return 100 / 5;
        }
      },
      tabStyle() {
        if (this.isColumn) {
          return {};
        } else {
          return {
            width: `${this.tabWidth}%`,
          };
        }
      },
      baseLineClass() {
        return {
          'kd-tabs-tab-baseline__column': this.isColumn,
          'kd-tabs-tab-baseline__row': !this.isColumn,
        };
      },
      baseLineStyle() {
        const style = {
          transition: this.animation ? 'all .3s ease-in-out' : '',
        };
        if (this.isColumn) {
          const height = 36 / 36;
          style.height = `${height}rem`;
          style.top = `${this.activeIndex * height}rem`;
        } else {
          style.width = `${this.tabWidth}%`;
          style.left = `${this.activeIndex * this.tabWidth}%`;
        }
        return style;
      },
      contentStyle() {
        return {
          // TODO: 列展示的时候高度不是固定的，所以需要计算每个容器的高度
          transform: this.isColumn ? `translateY(-${this.activeIndex * 100}%)` : `translateX(-${this.activeIndex * 100}%)`
        };
      },
    },
    methods: {
      handleActiveClick(index) {
        this.activeIndex = index;
        this.onTabActive(index);
      },
    },
  };
</script>