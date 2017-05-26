import Vue from 'vue';
import VueRouter from 'vue-router';

import CountryRetailer from './components/CountryRetailer';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: CountryRetailer }
  ]
});
