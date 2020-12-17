import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import Lingallery from 'lingallery';
Vue.component('lingallery', Lingallery);

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'mdi',
  },
});
