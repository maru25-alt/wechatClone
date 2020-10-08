import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from '@/plugins/i18n';
import './assets/css/style.css';
import Sidebar from './components/sidebar/Sidebar.vue'
//import IntlTelInput from 'vue-intl-telephone-input';
import vueCountryRegionSelect from 'vue-country-region-select';
import Loading from './util/Loading';
import { firestore } from 'firebase';
import { auth } from './store/firebase';
import moment from 'moment'

import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);
//Vue.component('intl-tel-input', IntlTelInput);
Vue.component('sidebar', Sidebar)
Vue.component('loading', Loading)
Vue.use(vueCountryRegionSelect)
Vue.prototype.moment =  (moment)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
  created(){
    auth.onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoSignin')
      }
    })
  }
}).$mount('#app')
