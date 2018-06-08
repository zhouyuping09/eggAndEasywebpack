<template>
  <label class="kd-switch"
         :class = "{'kd-switch__disabled': disabled}">
    <input class="kd-switch-input"
           :disabled="disabled"
           @change="$emit('change', currentValue)"
           type="checkbox"
           v-model="currentValue">
    <span class="kd-switch-core"></span>
    <div class="kd-switch-label"><slot></slot></div>
  </label>
</template>

<script>
  /**
   * kd-switch
   * @module components/switch
   * @desc 切换按钮
   * @param {boolean} [value] - 绑定值，支持双向绑定
   * @param {boolean} [disabled]
   * @param {slot} - 显示内容
   *
   * @example
   * <kd-switch v-model="value"></kd-switch>
   */

  export default {
    name: 'kd-switch',

    props: {
      value: Boolean,
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      currentValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        },
      },
    },
  };
</script>


<style lang="less">
  @px2rem: 36;

  .kd-switch {
    display: flex;
    align-items: center;
    position: relative;

    &.kd-switch__disabled {
      * {
        opacity: .6;
      }
    }

    * {
      pointer-events: none;
    }

    &-label {
      margin-left: 10rem/@px2rem;
      display: inline-block;

      &:empty {
        margin-left: 0;
      }
    }

    &-core {
      display: inline-block;
      position: relative;
      width: 52rem/@px2rem;
      height: 32rem/@px2rem;
      border: 1rem/@px2rem solid #ccc;
      border-radius: 16rem/@px2rem;
      box-sizing: border-box;
      background-color: #ccc;

      &::after, &::before {
        content: "";
        position: absolute;
        transition:transform .3s;
        border-radius: 15rem/@px2rem;
      }

      &::after {
        width: 30rem/@px2rem;
        height: 30rem/@px2rem;
        background-color: #fff;
        box-shadow: 0 1rem/@px2rem 3rem/@px2rem rgba(0, 0, 0, .4);
      }

      &::before {
        width: 50rem/@px2rem;
        height: 30rem/@px2rem;
        background-color: #fdfdfd;
      }
    }

    &-input {
      display: none;

      &:checked {
        + .kd-switch-core {
          border-color: #EA5A1E;
          background-color: #EA5A1E;

          &::before {
            transform: scale(0);
          }

          &::after {
            transform: translateX(20rem/@px2rem);
          }

        }
      }
    }

  }
</style>
