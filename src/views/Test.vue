<template>
  <div class="home">
    <p>我是首页呀</p>
    <button @click="linkWallet">链接钱包</button>
    <button @click="approve">授权busd转Ozc</button>
    <button @click="stake">质押</button>
    <button @click="extract">提取</button>
    <button @click="close">断开链接</button>
  </div>
</template>

<script>
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
  import Vconsole from 'vconsole';
  import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      connector: null
    };
  },
  computed: {
    ...mapGetters(["address", "chainId", "status"])
  },
  created() {
    new Vconsole();
    // this.connector = new WalletConnect({
    //   bridge: "https://bridge.walletconnect.org", // Required
    //   qrcodeModal: QRCodeModal,
    // });
  },
  methods: {
    linkWallet() {
      this.$store.dispatch("Wallet/connectWalletConnect");
    },
    approve() {
      // 授权
      // this.$store.dispatch('Wallet/approveErc20', { type: 'b-o', unit: 'mwei', amount: 100 })
      // u 转 ozc
      this.$store.dispatch('Wallet/exchangeOZCoin', { unit: 'mwei', amount: 100 })
      // ozc 转 u
      // this.$store.dispatch("Wallet/reverseExchangeOZCoin", {
      //   unit: "ether",
      //   amount: 100
      // });
    },
    extract() {
      this.$store.dispatch("Wallet/redemption");
    },
    stake() {
      this.$store.dispatch("Wallet/stake", { amount: "100", unit: "ether" });
    },
    close() {
      this.$store.dispatch("Wallet/disconnectWallet", { amount: "100", unit: "ether" });
    }
  }
};
</script>
