<template>
  <transition name='fade'>
    <div v-show="showModal" class="kd-modal" @click="closeOnClickModal($event)" >
      <div class="kd-modal__content">
        <h2 class="kd-modal__content-head" v-html="title" v-if="title"></h2>
        <p class="kd-modal__content-title" v-html="message">
        </p>
        <div class="kd-modal__content-btn">
          <span class="btn-cancel" @click="cancel()">{{ cancelMessage }}</span>
          <span v-if="confirmMessage" @click="confirm()" class="btn-confirm">{{ confirmMessage }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        title: '',
        message: '',
        confirm: () => {},
        cancel: () => {},
        confirmMessage: '',
        cancelMessage: '',
        showModal: false,
      };
    },
    methods: {
      closeOnClickModal(event) {
        if (event.target.classList[0] === 'kd-modal') {
          this.cancel();
        }
      }
    }
  };
</script>
<style lang="less">
  @import "./../../../asset/css/var.less";
  @px3rem: 75;
  .kd-modal {
    position: fixed;
    background-color: rgba(0, 0, 0, .3);
    width: 10rem;
    margin: auto;
    top: 0;
    transition: opacity .3s linear;
    bottom: 0;
    z-index: 1000;

    &__content {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 312rem/@px2rem;
      transform: translate3d(-50%, -50%, 0);
      background-color: #fff;
      padding: 24rem/@px2rem;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.10), 0 4px 4px 0 rgba(0,0,0,0.10);
      border-radius: 2px;
      font-size: 16rem/@px2rem;
      line-height: 19rem/@px2rem;
      word-break: break-all;
      max-height: 380rem/@px2rem;
      overflow-y: scroll;
        &-head {
            text-align: center;
            color: @color-content;
            font-size: 32rem/@px3rem;
            margin-bottom: 43rem/@px3rem;
        }
        &-title {
        color: @color-content;
        margin-bottom: 24rem/@px2rem;
        }

      &-btn {
        float: right;

        > * {
          font-weight: bold;
          text-transform: uppercase;
        }
        .btn-cancel {
          color: @color-content-assist;
        }
        .btn-confirm {
          color: @primary-color;
          margin-left: 24rem/@px2rem;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    /*transition: all 0.5s ease;*/
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>