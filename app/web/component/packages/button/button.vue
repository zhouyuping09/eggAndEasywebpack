<template>
  <a
    role="button"
    :class="buttonClass"
    @touchstart="startActive"
    @touchend="endActive"
    @click="btnClick"
  >
    <Icon
      class="kd-button-icon"
      :type="icon"
      v-if="showIcon"
    />
    <Icon
      class="kd-button-icon spin"
      type="md_loadingCircle"
      v-if="loading"
    />
    <span>
      <slot></slot>
    </span>
  </a>
</template>
<script>
  import Icon from './../icon/icon.vue';

  export default {
    name: 'kd-button',
    components: {
      Icon,
    },
    props: {
      type: {
        type: String,
        validator: (value) => {
          if (!value) {
            return true;
          }
          return ['primary', 'ghost', 'warning'].includes(value);
        }
      },
      className: String,
      activeClassName: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      onClick: {
        type: Function,
        default() {
          return () => {};
        }
      },
      loading: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      icon: String,
    },
    data() {
      return {
        isActive: false,
      };
    },
    computed: {
      buttonClass() {
        const classObject = {
          'kd-button': true,
          'kd-button__primary': this.type === 'primary',
          'kd-button__ghost': this.type === 'ghost',
          'kd-button__warning': this.type === 'warning',
          'kd-button__inline': this.inline,
          'kd-button__disabled': this.disabled,
          'kd-button__active': this.isActive && !this.disabled,
        };
        if (this.className) {
          classObject[this.className] = true;
        }
        if (this.activeClassName) {
          classObject[this.activeClassName] = this.isActive && !this.disabled;
        }

        return classObject;
      },
      showIcon() {
        return !!this.icon && !this.loading;
      }
    },
    methods: {
      startActive() {
        if (this.disabled || this.loading) {
          return;
        }
        this.isActive = true;
      },
      endActive() {
        if (this.disabled || this.loading) {
          return;
        }
        this.isActive = false;
      },
      btnClick() {
        if (this.disabled || this.loading) {
          return;
        }
        this.onClick();
      }
    }
  };
</script>
<style lang="less">
  @import './../../../asset/css/var.less';

  @px2rem: 36;

  .kd-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: @color-content;
    border: 1px solid @color-content-assist;
    border-radius: 2rem/@px2rem;
    padding: 10rem/@px2rem 10rem/@px2rem;
    font-size: 14rem/@px2rem;
    line-height: 24rem/@px2rem;
    text-align: center;

    &-icon {
      height: 24rem/@px2rem;
      line-height: 24rem/@px2rem;
      width: 24rem/@px2rem;
      text-align: center;
      font-size: 24rem/@px2rem;
      margin-right: 5rem/@px2rem;
    }

    &__disabled {
      color: rgba(0, 0, 0, 0.3);
      opacity: 0.6;
    }

    &__active {
      background-color: #ddd;
    }

    &__inline {
      display: inline-block;
    }

    &__primary {
      border: none;
      background-color: @primary-color;
      color: white;

      .kd-button__disabled {
        color: rgba(255, 255, 255, 0.6);
        opacity: 0.4;
      }

      &.kd-button__active {
        color: rgba(255, 255, 255, 0.3);
        background-color: #ea4700;
      }
    }

    &__ghost {
      background-color: transparent;
      color: @primary-color;
      border: 1px solid @primary-color;

      .kd-button__disabled {
        color: rgba(255, 255, 255, 0.1);
        opacity: 1;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 2rem/@px2rem;
      }

      &.kd-button__active {
        color: rgba(234, 90, 30, 0.6);
        border: 1px solid rgba(234, 90, 30, 0.6);
      }
    }

    &__warning {
      background-color: @color-error;
      color: white;
      border: none;

      .kd-button__disabled {
        color: rgba(255, 255, 255, 0.6);
        opacity: 0.4;
      }

      &.kd-button__active {
        color: rgba(255, 255, 255, 0.3);
        background-color: #d30801;
      }
    }

  }
</style>