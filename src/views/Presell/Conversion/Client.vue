<template>
    <div class="_conversion">
      <div class="conversion_top">
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.from') }}</p>
            <span v-if="!authorizationStauts">{{ $t('purchaseAndPledge.quantity') }}：
              <i class="busd_number">
                {{ (authorizationStauts ? ozcBalance : busdBalance) || 0 }}
              </i>
              <span>{{ authorizationStauts ? transitionLange('toto') : transitionLange('busd') }}</span>
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ authorizationStauts ? transitionLange('toto') : transitionLange('busd') }}</p>
            <input v-model="bo[authorizationStauts ?  transitionLange('ozc', true) : transitionLange('busd', true)]" id="usdt" type="number" placeholder="0" />
          </div>
        </div>
        <div @click="transitionBtn" class="conversion_icon">
          <img src="@/assets/images/purchase/icon.png" alt="" />
        </div>
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.to') }}</p>
            <span v-if="authorizationStauts">{{ $t('purchaseAndPledge.quantity') }}：
              <i class="ozc_number">
                {{ (authorizationStauts ? busdBalance : ozcBalance) || 0 }}
                {{ authorizationStauts ? transitionLange('busd') :  transitionLange('toto') }}
              </i>
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ authorizationStauts ? "BUSD" : "TOTO" }}</p>
            <input v-model="bo[authorizationStauts ? transitionLange('busd', true) : transitionLange('ozc', true)]" readonly id="ozc" type="number" placeholder="0" />
          </div>
        </div>
      </div>
      <button @click="conversionBtn" id="conversionBtn" class="conversion_btn">
        {{ $t('home.exchange') }}
      </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      type: "b-o",
      bo: { busd: null, ozc: null },
      ob: { busd: null, ozc: null },
      authorizationStauts: false,
    };
  },
  computed: {
    ...mapGetters('Wallet', ['busdBalance', 'ozcBalance', 'clientType', 'address'])
  },
  methods: {
    transitionLange(tag,isLowerCase=false){
      tag=`global.${tag}`
      let name = this.$t(tag)
      return isLowerCase?name.toLocaleLowerCase():name
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
      if (!this.address) return message.error(this.$t('global.pleses')+this.$t('global.connectWallet'))
      this.mobileConversionBtn()

    },
    pcConversionBtn() {
      // 这里需要先授权
      if (this.type === 'b-o') {
        if (!this.bo.busd) return message.error(this.$t('tipMessage.successTip'))
        this.$store.dispatch('Wallet/pcApproveErc20', { type: 'b-o', unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
      }
      if (this.type === 'o-b') {
        if (!this.ob.ozc) return message.error(this.$t('tipMessage.successTip'))
        // 加权限用这个
        // this.$store.dispatch('Wallet/pcApproveErc20', { type: 'o-b', unit: 'ether', amount: this.ob.ozc })
        // 不加权限用这个
        this.$store.dispatch("Wallet/pcReverseExchangeOZCoin", { unit: "ether", amount: this.ob.ozc, cb: this.resHint });
      }
    },
    mobileConversionBtn() {
      if (this.type === 'b-o') {
        if (!this.bo.busd) return message.error(this.$t('tipMessage.successTip'))
        this.$store.dispatch('Wallet/mobileExchangeOZCoin', { type: 'b-o', unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
      }
      if (this.type === 'o-b') {
        if (!this.ob.ozc) return message.error(this.$t('tipMessage.successTip'))
        this.$store.dispatch("Wallet/mobileReverseExchangeOZCoin", { unit: "ether", amount: this.ob.ozc, cb: this.resHint });
      }
    },
    resHint(e) {
      this.$refs.hint.modal = {
        title: this.$t('tipMessage.tip'),
        type: 'hint', // hint || connectWallet
        status: e === 'success' ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: this.$t('home.exchange')+( e === 'success' ? this.$t('global.success') : this.$t('global.fail')),
        cb: null
      }
      this.bo = { busd: null, ozc: null }
      this.ob = { busd: null, ozc: null }
      this.authorizationStauts = false
    }
  }
};
</script>

<style scoped>
._conversion {
  width: var(--content-w);
  padding: .37rem .4rem;
  background: #FFF;
  box-shadow: 0 0 20px 10px rgba(3, 133, 242, 0.03);
  border-radius: .15rem;
  margin:  .6rem auto 0;
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
    font-family: DINNextW1G-Bold;
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
