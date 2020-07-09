import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

import App from './App.vue'
import './assets/styles/index.css';

Vue.use(firestorePlugin, { wait: true });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
