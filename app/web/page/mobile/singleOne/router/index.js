import Vue from 'vue';
import Router from 'vue-router';
import clientActivationIntroduce from '../view/clientActivationIntroduce';
import clientReSetPin from '../view/clientReSetPin';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: '/single/one',
  routes: [
    {
      path: '/home',
      name: 'clientReSetPin',
      component: clientReSetPin,
    },
    {
      path: '/',
      name: 'clientActivationIntroduce',
      component: clientActivationIntroduce
    },
  ]
});

export default router;
