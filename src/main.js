import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

import App from './App.vue'
import './assets/styles/index.css';

// vuefire plugin Initialization
Vue.use(firestorePlugin, { wait: true });
Vue.config.productionTip = false

// vue app init
new Vue({
  render: h => h(App),
}).$mount('#app')
