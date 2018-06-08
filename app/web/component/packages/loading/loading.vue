<template>
    <MobileLayout>
        <div class="loading" @click="close()">
            <Icon :type="'md_loadingCircle'" class="icon circle"></Icon>
        </div>
    </MobileLayout>
</template>
<script>
  import Icon from './../icon/icon.vue';
  export default {
    name: 'loading',
    data() {
      return {};
    },
    methods: {
      // 发出关闭子组件信息
      close() {
        this.$emit('show', 'false');
      },
    },
    porps: [
      'show',
    ],
    components: {
      Icon,
    },
    computed: {}
  };
</script>
<style scoped lang="less">
    @px3rem: 36;
    .loading{
        position: fixed;
        top:0;
        left: 0;
        z-index:999;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        .icon{
            display:block;
            color: #EA5A1E;
            position: relative;
            top:50%;
            left:50%;
            margin-top: -1rem;
            margin-left: -1rem;
            height: 2rem;
            line-height: 2rem;
            width: 2rem;
            text-align: center;
            font-size:50rem/@px3rem;
            animation: circle 1s infinite linear;


        }
    }
    @keyframes circle{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes circle{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>