import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router';
import  store from  './store';


import  components  from  './components'

import {APP_STATUS_UPDATE} from '@/store/app'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './style/common.css'

Vue.config.productionTip = true;
Vue.use(ElementUI);

Vue.use(VueRouter);

Object.keys(components).forEach((key) => {
    let name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
});

const router = new VueRouter({
    routes
});

router.beforeEach(({meta, path}, from, next) => {
    let {title = ''} = meta;
    store.dispatch(APP_STATUS_UPDATE, {title});
    next()
});

/* eslint-disable no-new */
new Vue({
    router,
    store
}).$mount('#app');
