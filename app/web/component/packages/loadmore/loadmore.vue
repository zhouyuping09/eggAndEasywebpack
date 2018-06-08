<template>
  <div
    v-infinite-scroll="handleLoadMore"
    infinite-scroll-disabled="scrollDisabled"
    infinite-scroll-distance="distance"
    infinite-scroll-listen-for-event="recheck"
    class="load-more"
  >
    <slot name="content"></slot>
    <div class="load-empty" v-if="isEmpty">
      <slot name="empty"></slot>
    </div>
    <div class="load-more-end" v-if="isEnd">
      - End -
    </div>
    <div class="load-more-error" v-if="isError">
      <kd-button
        class="error-button"
        type="primary"
        :onClick="handleReload"
      >
        Reload
      </kd-button>
    </div>
    <div class="load-more-loading-wrapper" v-show="!isEnd&&!isEmpty&&!isError">
      <div class="load-more-loading-content">
        <Icon type="md_loadingCircle" class="spin icon"/>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import './../../../asset/css/var';

  @px2rem: 36;
  .load-more {
    height: 100%;
    overflow-y: auto;
    &-loading {
      &-wrapper {
        height: 60rem/@px2rem;
        width: 100%;
        position: relative;
      }
      &-content {
        position: absolute;
        height: 30rem/@px2rem;
        width: 30rem/@px2rem;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        line-height: 30rem/@px2rem;

        .icon {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 30rem/@px2rem;
          color: @primary-color;
        }
      }
    }
    &-end {
      height: 30rem/@px2rem;
      line-height: 30rem/@px2rem;
      text-align: center;
      color: @color-content-assist  ;
      font-size: 16rem/@px2rem;
    }
    &-error {
      height: 100rem/@px2rem;
      width: 100%;
      position: relative;

      .error-button {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100rem/@px2rem;
        height: 40rem/@px2rem;
        font-size: 16rem/@px2rem;
      }
    }
  }

</style>
<script>
  import Icon from './../icon/icon.vue';
  import Button from './../button/button.vue';
  export default {
    name: 'loadMore',
    components: {
      Icon,
      'kd-button': Button,
    },
    props: {
      contentKey: {
        type: [Number, String],
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      onLoadMore: {
        type: Function,
        default() {
          return () => {};
        },
      },
      startPage: {
        type: Number,
        default: 1,
      },
      distance: {
        type: Number,
        default: 110,
      }
    },
    data() {
      return {
        loading: false,
        page: this.startPage,
        noMore: false,
        isError: false,
      };
    },
    computed: {
      scrollDisabled() {
        return this.isError || !this.isActive || this.noMore || this.loading;
      },
      isEmpty() {
        return this.page === this.startPage && this.noMore;
      },
      isEnd() {
        return this.page !== this.startPage && this.noMore;
      }
    },
    methods: {
      // 成功
      onFinish(empty = false) {
        this.loading = false;
        if (empty) {
          this.noMore = true;
        } else {
          this.page++;
        }
      },
      // 展示错误
      onError() {
        this.loading = false;
        this.isError = true;
      },
      // 重置
      onReset() {
        this.page = this.startPage;
        this.noMore = false;
        this.isError = false;
        this.loading = false;
        this.$emit('recheck');
      },
      handleLoadMore() {
        this.loading = true;
        this.onLoadMore({
          contentKey: this.contentKey,
          page: this.page,
          onFinish: this.onFinish,
          onError: this.onError,
          onReset: this.onReset
        });
      },
      handleReload() {
        this.isError = false;
      }
    }
  };
</script>
