<template>
  <div class="kd-radio">
    <input type="radio" id="" name="" value="">
    <div>
      Icon
    </div>
    <div class="kd-radio-content">
      <div class="content-text" v-if="align === 'right'">
        <slot></slot>
      </div>
      <div class="content-btn" @click="handleClick">
        <Icon type="radio-choosen" v-if="checkStatus" class="icon"></Icon>
        <Icon type="chkR-circle" v-else="checkStatus" class="icon"></Icon>
      </div>
      <div class="content-text" v-if="align === 'left'">
        <slot></slot>
      </div>
    </div>
    <input type="radio" class="kd-radio-label">
  </div>
</template>
<style lang="less">
  @import './../../../asset/css/var.less';
  @px2rem: 36;

  .kd-radio {
    width: 100%;
    height: 100%;
    position: relative;

    &-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .content {
        &-text {
          line-height: 1;
          flex: 1;
        }
        &-btn {
          .icon {
            height: 30rem/@px2rem;
            line-height: 30rem/@px2rem;
            width: 30rem/@px2rem;
            font-size: 30rem/@px2rem;
            color: @primary-color;
          }
        }
        &-input {
          display: none;
        }
      }
    }

    &-label {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
<script>
  import Icon from './../icon/icon.vue';

  export default {
    name: 'radio',
    components: {
      Icon,
    },
    props: {
      align: {
        type: String,
        default: 'left',
        validator: (value) => {
          return ['left', 'right'].includes(value);
        }
      },
      checked: {
        type: Boolean,
        default: false,
      },
      onChange: {
        type: Function,
        default() {
          return () => {};
        }
      },
      holeLine: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        checkStatus: this.checked,
      };
    },
    methods: {
      handleClick() {

      },
    },
  };
</script>
