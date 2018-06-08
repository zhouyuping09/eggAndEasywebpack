<template>
    <transition name='fade'>
        <div v-if='visible' :class='position' class='toast'>
            <span>{{message}}</span>
        </div>
    </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        position: ''
      };
    },
  };
</script>


<style scoped lang="less">
    @px3rem: 36;
    .toast {
        position: fixed;
        left:50%;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear;
        word-wrap:break-word;
        padding:11rem/@px3rem 26rem/@px3rem;
        text-align: center;
        z-index:9999;
        font-size:14rem/@px3rem;
        max-width:8rem;
        min-width:2rem;
        color: #fff;
        border-radius: 20px;
        background: rgba(0,0,0,0.60);
        overflow: hidden;
        line-height:16rem/@px3rem;

    }
    .toast.middle{
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }
    .toast.top{
        top:10%;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }
    .toast.bottom{
        top:90%;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>