<template>
  <div class="two_page">
    <MobileTemp/>
    <div class="two_page_top mobile_show">
      <img @click="$router.push('/purchase')" src="@/assets/images/back.png" alt="">
      <p>{{ $t('home.exchange') }}</p>
    </div>
    <div class="_conversion">
      <div v-if="type === 'b-o'" class="conversion_top">
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.from') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：<i class="busd_number">{{ busdBalance||0 }}</i>{{ $t('global.busd') }}
              <!-- <i @click="allConver('b')" class="conver_oper">{{ $t('最大限度') }}</i> -->
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ $t('global.busd') }}</p>
            <input v-model="bo.busd" @input="boBusdInput" id="usdt" type="number" placeholder="0" />
          </div>
        </div>
        <div @click="this.transitionBtn" class="conversion_icon">
          <img src="@/assets/images/purchase/icon.png" alt="" />
        </div>
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.to') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：<i class="ozc_number">{{ ozcBalance||0 }}{{ $t('global.ozc') }}</i></span>
          </div>
          <div class="conversion_info_input">
            <p>{{ $t('global.ozcoin') }}</p>
            <input v-model='bo.ozc' readonly id="ozc" type="number" placeholder="0" />
          </div>
        </div>
      </div>
      <div v-else class="conversion_top">
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.from') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：<i class="ozc_number">{{ ozcBalance }}</i>{{ $t('global.ozc') }}
              <!-- <i @click="allConver('o')" class="conver_oper">{{ $t('最大限度') }}</i> -->
            </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ $t('global.ozcoin') }}</p>
            <input v-model="ob.ozc" @input="obOzcInput" id="ozc" type="number" placeholder="0" />
          </div>
        </div>
        <div @click="this.transitionBtn" class="conversion_icon">
          <img src="@/assets/images/purchase/icon.png" alt="" />
        </div>
        <div class="conversion_info">
          <div class="conversion_info_top">
            <p>{{ $t('purchaseAndPledge.to') }}</p>
            <span>{{ $t('purchaseAndPledge.quantity') }}：<i class="busd_number">{{ busdBalance }}</i>{{ $t('global.busd') }} </span>
          </div>
          <div class="conversion_info_input">
            <p>{{ $t('global.busd') }}</p>
            <input v-model="ob.busd" readonly id="usdt" type="number" placeholder="0" />
          </div>
        </div>
      </div>
      <!-- <button
          v-if="!authorizationStauts"
          @click="this.mobileAuthorizationBtn"
          id="conversionBtn"
          class="conversion_btn conversion_btn2"
        >
          {{$t('授权')}}
        </button> -->
      <button @click="exchangeClick" id="conversionBtn" class="conversion_btn">
        {{ $t('home.exchange') }}
      </button>
      <!-- <p class="modal_btn_oper_i">{{$t('点击授权成功后再次点击兑换')}}</p> -->
      <!-- <Hint ref="hint" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters , mapActions} from 'vuex'
import { getSession } from "@/utils/base";
import Hint from '@/components/Hint'
import { message } from 'ant-design-vue';

export default {
  components: {
     Hint,
  },
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
    ...mapActions('Metamask', ['exchangeUsdtForOzc','exchangeOzcForUsdt']),
    // 移动端单独授权
    mobileAuthorizationBtn() {
      if (!this.address) return message.error(this.$t('global.pleses')+this.$t('global.connectWallet'))
      let amount = null
      if (this.type === 'b-o') {
        if (!this.bo.busd) return message.error(this.$t('tipMessage.successTip'))
        amount = this.bo.busd
        this.$store.dispatch('Wallet/mobileApproveErc20', { type: this.type, unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount, cb: this.mobileApproveNext })
      }
      if (this.type === 'o-b') {
        if (!this.ob.ozc) return message.error(this.$t('tipMessage.successTip'))
        amount = this.ob.ozc
        this.$store.dispatch('Wallet/mobileApproveErc20', { type: this.type, unit: 'ether', amount, cb: this.mobileApproveNext })
      }
    },
    // 移动端授权后下一步
    mobileApproveNext() {
      this.authorizationStauts = true
    },
    obOzcInput(e) {
      this.ob.busd = e.target.value
    },
    boBusdInput(e) {
      this.bo.ozc = e.target.value
    },
    allConver(key) {
      if (key === 'b') {
        this.bo.busd = this.busdBalance
        this.bo.ozc = this.busdBalance
      }
      if (key === 'o') {
        this.ob.ozc = this.ozcBalance
        this.ob.busd = this.ozcBalance
      }
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

    
    // conversionBtn() {
    //   if (!this.address) return message.error(this.$t('global.pleses')+this.$t('global.connectWallet'))
    //   this.mobileConversionBtn()

    // },

    exchangeClick(){
      //  type b-o usdt to ozc  o-b ozc to usdt
      if (this.type == 'b-o') {
        this.exchangeUsdtForOzc({ amount: this.bo.busd, exchangeAddr: getSession('address_ozfund') })
      }
      if (this.type == 'o-b') {
        this.exchangeOzcForUsdt({ amount: this.bo.ozc, exchangeAddr: getSession('address_ozfund') })
      }
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
      // if (this.clientType === 'mobile' && this.type === 'b-o') { // 如果是移动端还原授权状态
      //   this.authorizationStauts = false
      // }
    }
  }
};
</script>

<style scoped>
._conversion {
  margin-top: 86px;
  width: 100%;
  padding: 40px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 10px rgba(3,133,242,0.03);
  border-radius: 15px;
}
.conversion_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.conversion_info {
  width: 42%;
  padding: 15px 20px;
  background: #F7FBFF;
  border-radius: 15px;
}
.conversion_info_top {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
}
.conversion_info_top p {
  color: #333333;
}
.conversion_info_top span {
  color: #999999;
}
.conversion_info_top span i.conver_oper {
  color: #0385F2;
  cursor: pointer;
}
.conversion_info_input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.conversion_info_input p {
  /* font-family: DINNextW1G; */
  font-size: 16px;
  color: #333333;
}
.conversion_info_input input {
  font-family: DINNextW1G-Bold;
  font-size: 16px;
  color: #666666;
  font-weight: 500;
  border: none;
  background: transparent;
  text-align: right;
}
.conversion_icon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: #F7F8F9;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
}
.conversion_icon img {
  width: 14px;
}
.conversion_btn {
  width: 386px;
  height: 50px;
  background: #0385F2;
  border-radius: 10px;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: block;
  margin: 30px auto 0;
}
.conversion_btn2 {
  background: #ffc200;
}
</style>
