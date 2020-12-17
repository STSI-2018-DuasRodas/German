import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

Vue.prototype.$host = store.state.host;
Vue.prototype.$port = store.state.port;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
