<template>
  <div class="_conversion">
    <div class="conversion_top">
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>{{ $t('purchaseAndPledge.from') }}</p>
          <span>{{ $t('purchaseAndPledge.quantity') }}：
            <i class="busd_number">
              {{ (authorizationStauts ? totoBalance : ozcBalance) || 0 }}
            </i>
            <span>{{ authorizationStauts ? transitionLange('toto') : transitionLange('ozc') }}</span>
          </span>
        </div>
        <div class="conversion_info_input">
          <p>{{ authorizationStauts ? transitionLange('toto') : transitionLange('ozc') }}</p>
          <input :readonly="disabledFn()" v-model="bo[!authorizationStauts ? 'busd' : 'ozc']" type="number"
            placeholder="0" />
        </div>
      </div>
      <!-- @click="transitionBtn" -->
      <div class="conversion_icon">
        <img src="@/assets/images/purchase/icon.png" alt="" />
      </div>
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>{{ $t('purchaseAndPledge.to') }}</p>
          <span>{{ $t('purchaseAndPledge.quantity') }}：
            <i class="ozc_number">
              {{ (authorizationStauts ? ozcBalance : totoBalance) || 0 }}
              {{ authorizationStauts ? transitionLange('ozc') : transitionLange('toto') }}
            </i>
          </span>
        </div>
        <div class="conversion_info_input">
          <p>{{ authorizationStauts ? "OZC" : "TOTO" }}</p>
          <input :readonly="!disabledFn()" v-model="bo[!authorizationStauts ? 'ozc' : 'busd']" type="number"
            placeholder="0" />
        </div>
      </div>
    </div>
    <button @click="conversionBtn" class="conversion_btn">
      {{ $t('home.exchange') }}
    </button>
    <hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { message } from 'ant-design-vue';
import Hint from "@/components/Hint/index.vue";

export default {
  data() {
    return {
      type: "b-o",
      bo: { busd: null, ozc: null },
      ob: { busd: null, ozc: null },
      authorizationStauts: false,
    };
  },
  components: { Hint },
  computed: {
    ...mapGetters('Wallet', ['ozcBalance', 'totoBalance', 'clientType', 'address']),
  },
  watch: {
    // type--》 o-b
    // 'bo.ozc'(newVal){
    //   console.log('newVal: ', newVal);
    //   this.bo.busd = newVal*10
    // },
    'bo.busd'(newVal) {
      this.bo.ozc = newVal * 10
    }

  },
  methods: {
    ...mapActions('Wallet', ['getPcBalance']),
    ...mapActions('WalletSplit', ['exchangeUsdtToToto']),
    disabledFn() {
      if (!this.authorizationStauts && this.type == 'b-o') {
        return false
      }
      if (this.authorizationStauts && this.type == 'o-b') {
        return false
      }
      return true
    },
    transitionLange(tag, isLowerCase = false) {
      tag = `global.${tag}`
      let name = this.$t(tag)
      return isLowerCase ? name.toLocaleLowerCase() : name
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
      this.bo = { busd: null, ozc: null }
      this.ob = { busd: null, ozc: null }
    },
    conversionBtn() {
      if (!this.address) return message.error(this.$t('global.pleses') + this.$t('global.connectWallet'))
      this.pcConversionBtn()
    },
    pcConversionBtn() {
      // 这里需要先授权
      // if (this.type === 'b-o') {
      if (!this.bo.busd) return message.error(this.$t('tipMessage.successTip'))
      // this.$store.dispatch('Wallet/pcApproveErc20', { type: 'b-o', unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
      this.exchangeUsdtToToto({ amount: this.bo.busd + '' }).then(({ success }) => {
        this.resHint(success)
        if (success) {
          this.getPcBalance()
        }
      })
      // }
    },
    resHint(e) {
      this.$refs.hint.modal = {
        title: this.$t('tipMessage.tip'),
        type: 'hint', // hint || connectWallet
        status: e ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: this.$t('home.exchange') + (e ? this.$t('global.success') : this.$t('global.fail')),
        cb: null
      }
      this.bo = { busd: null, ozc: null }
      this.ob = { busd: null, ozc: null }
      this.authorizationStauts = false
    }
  }
};
</script>

<style scoped lang="scss">
._conversion {
  width: var(--content-w);
  padding: .37rem .4rem;
  background: #FFF;
  box-shadow: 0 0 20px 10px rgba(3, 133, 242, 0.03);
  border-radius: .15rem;
  margin: .6rem auto 0;
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
