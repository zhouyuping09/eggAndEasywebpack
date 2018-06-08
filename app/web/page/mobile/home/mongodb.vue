 <template>
  <MobileLayout title="No Found">
    <div class="error">
        count: {{result}}
    </div>
    <div class="btn" @click="upCount">点击加count</div>
    <Loading v-if="loadingShow"></Loading>
  </MobileLayout>
</template>
<script>
  import Loading from 'component/packages/loading';
  import axios from 'axios';
  import Toast from 'component/packages/toast';
  export default {
    data() {
      return {
        loadingShow: false,
      };
    },
    components: {
      Loading,
    },
    methods: {
      upCount() {
        this.loadingShow = true;
        axios.get('/other/two')
          .then(res => {
            this.loadingShow = false;
            console.log(res);
          })
          .catch(err => {
            this.loadingShow = false;
            Toast('error');
          })

      }
    },
  };
</script>
<style scoped lang="less">
 @px2rem: 36;
  .error{
    width: 10rem;
    margin: 0 auto;
    line-height: 48rem/@px2rem;
    text-align: center;
  }
  .btn{
    width:10rem;
    line-height: 36rem/@px2rem;
    background-color: #cccccc;
    color:#1CB94E;
  }
</style>
