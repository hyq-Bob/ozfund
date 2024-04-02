import Vue from "vue";
import Vant from 'vant';
import 'vant/lib/index.css';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from './i18n/index'
import '@/assets/js/flexible.js'
import "@/styles/reset.css";
import "@/styles/index.scss";
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Vant);
// 注册指令
Vue.use((Vue) => {
  ((requireContext) => {
      const arr = requireContext.keys().map(requireContext);
      (arr || []).forEach((directive) => {
          directive = directive.__esModule && directive.default ? directive.default : directive
          Object.keys(directive).forEach((key) => {
              Vue.directive(key, directive[key])
          })
      })
  })(require.context('./directives', false, /^\.\/.*\.js$/))
})
new Vue({
  router,
  store,
  i18n,
  // web3modal,
  render: h => h(App)
}).$mount("#app");
