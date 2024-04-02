<template>
  <div>
    <component v-if="ComponentName" :is="ComponentName">
      <template #content>
        <router-view />
      </template>
    </component>
    <!-- 链接钱包 -->
    <!-- <div class="mobile_line_wallet">
      <img src="@/assets/images/mobileLineBg.png" alt="" />
      <p v-if="!this.address" @click="mobileLineWallet">{{ $t('连接钱包') }}</p>
      <p v-else @click="closeMobileLineWallet">{{ $t('断开钱包') }}</p>
    </div>-->
    <Hint ref="hint" /> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { setToken } from '@/utils/auth'
import Hint from '@/components/Hint/index.vue'
import { isMobile } from '@/utils/base'
// import { connect } from '@/walletConnect/provideModal'
export default {
  components: {
    Hint,
  },
  data() {
    return {
      ComponentName: '',
    }
  },
  computed: {
    ...mapGetters('Wallet', ['address']),
  },

  created() {
    if (isMobile()) {
      this.ComponentName = import('./mobile.vue').then(
        ({ default: defaultComp }) => {
          this.ComponentName = defaultComp
        }
      )
    } else {
      import('./pc.vue').then(({ default: defaultComp }) => {
        this.ComponentName = defaultComp
      })
    }
    if (this.address) {
      isMobile()? this.$store.dispatch('Wallet/connectWalletConnect'): this.$store.dispatch('Wallet/pcConnectWallet')
    }
  },
  methods: {
    // linkConnect() {
    //   connect()
    // },
    // langChange(e) {
    //   console.log('e', e)
    // },
    // 切换语言
    // langSwitch() {
    //   if (this.$i18n.locale === 'zh') {
    //     this.$i18n.locale = 'en'
    //     setToken('OZFUND_LANG', 'en')
    //   } else {
    //     this.$i18n.locale = 'zh'
    //     setToken('OZFUND_LANG', 'zh')
    //   }
    // },
    // 移动端链接钱包
    // mobileLineWallet() {
    //   this.mobileLineWalletNext()
    // },
    // mobileLineWalletNext() {
    //   this.$store.dispatch('Wallet/connectWalletConnect')
    //   this.$refs.hint.close()
    // },

    // 移动端断开链接
    // closeMobileLineWallet() {
    //   this.$store.dispatch('Wallet/disconnectWallet')
    // },
  },
}
</script>