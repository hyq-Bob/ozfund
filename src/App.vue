<template>
  <div id="app" style="height:100%">
    <router-view />
    <Loading></Loading>
  </div>
</template>

<script>
  import * as operCookie from '@/utils/auth'
  import Loading from '@/components/Loading'

  export default {
    components: {
      Loading
    },
    created() {
      this.$store.commit("Wallet/SAVE_WALLET_INFO", { key: "loading", value: false })
      // 判断协议 跳转https
      // if (document.location.protocol === 'http:' && process.env.NODE_ENV === "production") {
      //   document.location.href = 'https://' + document.location.host + document.location.pathname
      //   return
      // }
      // 判断移动端
      // if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      //   if (operCookie.getToken('mobileToken')) {
      //     this.$store.dispatch("Wallet/connectWalletConnect");
      //   }
      //   this.$store.commit('Wallet/SAVE_WALLET_INFO', { key: 'clientType', value: 'mobile' })
      // } else {
      //   if (operCookie.getToken('pcToken')) {
      //     this.$store.dispatch("Wallet/pcConnectWallet");
      //   }
      //   this.$store.commit('Wallet/SAVE_WALLET_INFO', { key: 'clientType', value: 'pc' })
      // }
    },
    beforeDestroy() {
      operCookie.removeToken('WALLET_ADDRESS')
      localStorage.removeItem('walletconnect')
      this.$store.dispatch("Wallet/disconnectWallet");
    }
  }
</script>
