'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: '',
  number: '',
};

export default new Vuex.Store({
  state,
});
