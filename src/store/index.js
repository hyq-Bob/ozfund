import Vue from "vue";
import Vuex from "vuex";
import Metamask from './modules/metamask'
import Wallet from './modules/wallet'
import Nav from './modules/nav'
import  WalletSplit  from "./modules/wallet_split";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Metamask,
    Wallet,
    Nav,
    WalletSplit
  }
});
