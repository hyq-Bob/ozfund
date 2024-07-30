<template>
  <div class="two_page">
    <div class="_conversion">
      <div class="conversion_top">
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.from') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：
              <i class="busd_number">
                {{ (authorizationStauts ? ozcBalance : (busdBalance || usdtVal)) || 0 }}
              </i>
              <span>{{ authorizationStauts ? $t('global.ozc') : $t('global.busd') }}</span>
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ authorizationStauts ? $t('global.ozcoin') : $t('global.busd') }}</p>
            <input v-model="bo[authorizationStauts ? 'ozc' : 'busd']" id="usdt" type="number" placeholder="0" />
          </div>
        </div>
        <div @click="transitionBtn" class="conversion_icon">
          <img src="@/assets/images/purchase/icon.png" alt="" />
        </div>
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.to') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：
              <i class="ozc_number">
                {{ (authorizationStauts ? (busdBalance || usdtVal) : ozcBalance) || 0 }}
                {{ authorizationStauts ? $t('global.busd') : $t('global.ozc') }}
              </i>
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ authorizationStauts ? $t('global.busd') : $t('global.ozcoin') }}</p>
            <input v-model="bo[authorizationStauts ? 'ozc' : 'busd']" readonly id="ozc" type="number" placeholder="0" />
          </div>
        </div>
      </div>
      <button @click="conversionBtn" id="conversionBtn" class="conversion_btn">
        {{ $t('home.exchange') }}
      </button>
    </div>
    <hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { message } from 'ant-design-vue';
import Hint from "@/components/Hint";
import * as operCookie from '@/utils/auth'
export default {
  data() {
    return {
      type: "b-o",
      usdtVal: 0,
      bo: { busd: 0, ozc: 0 },
      ob: { busd: 0, ozc: 0 },
      authorizationStauts: false,
    };
  },
  components: { Hint },
  created() {
    this.getUsdtVal()
  },
  computed: {
    ...mapGetters('Wallet', ['busdBalance', 'ozcBalance', 'address'])
  },
  methods: {
    ...mapActions('WalletSplit', ['approveAndExchange', 'ozcExchangeUsdt']),
    ...mapActions('Wallet', ['getMobileBalance']),
    ...mapActions('Metamask', ['getUsdtBalance']),
    getUsdtVal() {
      let address = operCookie.getToken('WALLET_ADDRESS')
      if (!address) return
      this.getUsdtBalance({ address }).then((val) => {
        this.usdtVal = val
      })
    },
    transitionBtn() {
      // false是需要授权
      if (this.type === "b-o") {
        this.type = "o-b";
        // ozc转busd不需要授权
        this.authorizationStauts = true
      } else {
        this.type = "b-o";
        this.authorizationStauts = false
      }
    },
    conversionBtn() {
      if (!this.address) return message.error(this.$t('global.pleses') + this.$t('global.connectWallet'))
      this.pcConversionBtn()

    },
    pcConversionBtn() {
      // 这里需要先授权
      if (this.type === 'b-o') {
        if (!this.bo.busd) return message.error(this.$t('tipMessage.successTip'))
        this.approveAndExchange({ amount: this.bo.busd }).then((obj) => {
          this.resHint(obj.success)
          if (obj.success) {
            this.getMobileBalance({ key: 'ozcBalance', unit: 'ether' })
            // this.getMobileBalance({key:'busdBalance', unit:'wei'})
            this.getUsdtVal()
          }
          console.log('success: ', obj);
        })
        // this.$store.dispatch('Wallet/pcApproveErc20', { type: 'b-o', unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
      }
      if (this.type === 'o-b') {
        if (!this.bo.ozc) return message.error(this.$t('tipMessage.successTip'))
        // 加权限用这个
        // this.$store.dispatch('Wallet/pcApproveErc20', { type: 'o-b', unit: 'ether', amount: this.ob.ozc })
        // 不加权限用这个
        // //this.$store.dispatch("Wallet/pcReverseExchangeOZCoin", { unit: "ether", amount: this.ob.ozc, cb: this.resHint });
        // this.$store.dispatch("Wallet/pcReverseExchangeOZCoin", { unit: "ether", amount: this.bo.ozc, cb: this.resHint });
        this.ozcExchangeUsdt({ amount: this.bo.ozc }).then((obj) => {
          this.resHint(obj.success)
          if (obj.success) {
            // this.getMobileBalance({key:'busdBalance', unit:'wei'})
            this.getMobileBalance({ key: 'ozcBalance', unit: 'ether' })
            this.getUsdtVal()
          }
          console.log('success: ', obj);
        })
      }
    },
    resHint(e) {
      this.$refs.hint.modal = {
        title: this.$t('tipMessage.tip'),
        type: 'hint', // hint || connectWallet
        status: e ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: this.$t('home.exchange') + (this.$t(e ? 'global.success' : 'global.fail')),
        cb: null
      }
      this.bo = { busd: null, ozc: null }
      this.ob = { busd: null, ozc: null }
      // this.authorizationStauts = false
    }
  }
};
</script>

<style scoped lang="scss">
._conversion {
  width: 100%;
  padding: .4rem;
  background: #FFF;
  box-shadow: 0 0 20px 10px rgba(3, 133, 242, 0.03);
  border-radius: .15rem;
}

.conversion_top {
  display: grid;
  grid-template-columns: 1fr .3rem 1fr;
  column-gap: .4rem;
  align-items: center;
}

.conversion_info {
  width: 100%;
  padding: .15rem .2rem .18rem;
  background: #F7FBFF;
  border-radius: .15rem;
}

.conversion_info_top {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .2rem;

  p {
    color: #333;
  }

  span {
    color: #999;

    i.conver_oper {
      color: #0385F2;
      cursor: pointer;
    }
  }

}

.conversion_info_input {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-family: DINNextW1G;
    font-size: .16rem;
    color: #333;
  }

  input {

    font-size: .16rem;
    color: #666;
    font-weight: 500;
    border: none;
    background: transparent;
    text-align: right;
    border: none;
  }
}

.conversion_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: .3rem;
  height: .3rem;
  background: #F7F8F9;
  border-radius: 50%;

  img {
    width: .14rem;
  }
}

.conversion_btn {
  width: 3.86rem;
  height: .5rem;
  background: #0385F2;
  border-radius: .1rem;
  font-size: .16rem;
  color: #FFF;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: block;
  margin: .3rem auto 0;
}
</style>
