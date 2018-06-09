import store from './store/index';
import router from './router';
import app from './singleOne.vue';
import App from 'app';
// import { sync } from 'vuex-router-sync';
// sync(store, router);


export default App.init({
  ...app,
  router,
  store
});
