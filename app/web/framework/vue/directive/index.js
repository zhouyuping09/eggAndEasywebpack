import Lazyload from 'mint-ui/lib/lazyload';
import InfiniteScroll from 'mint-ui/lib/infinite-scroll';
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueLocalStorage from 'vue-localstorage';
import VueMeta from 'vue-meta';


// 定制化
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require(''),
  loading: require(''),
  attempt: 1
});
Vue.use(InfiniteScroll);
Vue.use(VueCookie);
Vue.use(VueLocalStorage);
Vue.use(VueMeta);
