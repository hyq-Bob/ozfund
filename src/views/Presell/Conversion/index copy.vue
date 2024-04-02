<template>
  <div class="conversion">
    <div v-if="type === 'b-o'" class="conversion_top">
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>{{ $t('从') }}</p>
          <span
            >{{ $t('数量') }}：<i class="busd_number">{{ busdBalance }}</i>BUSD
            <i @click="allConver" class="conver_oper">{{ $t('最大限度') }}</i>
          </span>
        </div>
        <div class="conversion_info_input">
          <p>BUSD</p>
          <input v-model="bo.busd" @input="busdInput" id="usdt" type="number" placeholder="0" />
        </div>
      </div>
      <div class="conversion_icon">
        <img src="@/assets/images/purchase/icon.png" alt="" />
      </div>
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>{{ $t('至') }}</p>
          <span>{{ $t('数量') }}：<i class="ozc_number">{{ totoBalance }}TOTO</i></span>
        </div>
        <div class="conversion_info_input">
          <p>TOTO</p>
          <input v-model="bo.toto" readonly id="ozc" type="number" placeholder="0" />
        </div>
      </div>
    </div>
    <button
      v-if="authorizationStauts"
      @click="this.mobileAuthorizationBtn"
      id="conversionBtn"
      class="conversion_btn conversion_btn2"
    >
      {{$t('授权')}}
    </button>
    <button
      v-else
      @click="this.conversionBtn"
      id="conversionBtn"
      class="conversion_btn"
    >
      {{$t('兑换')}}
    </button>
    <p class="modal_btn_oper_i">{{$t('点击授权成功后再次点击兑换')}}</p>
    <Hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { multiply } from '@/utils/filters'
import Hint from '@/components/Hint'
import { message } from 'ant-design-vue';

export default {
  components: { Hint },
  data() {
    return {
      authorizationStauts: true,
      type: "b-o",
      bo: {
        busd: null,
        toto: null
      }
    };
  },
  computed: {
    ...mapGetters('Wallet', ['busdBalance', 'totoBalance', 'clientType', 'address'])
  },
  mounted() {
    //  if (this.clientType === 'mobile') { // true是需要授权 false不需要
    //   this.authorizationStauts = true
    //  } else {
    //   this.authorizationStauts = false
    //  }
     this.authorizationStauts = true
  },
  methods: {
    // 最大转换
    allConver() {
      this.bo.busd = this.busdBalance
      this.bo.toto = multiply(this.busdBalance, 10)
    },
    // 移动端授权
    mobileAuthorizationBtn() {
      if (!this.address) return message.error(this.$t('请先连接钱包'))
      if (!this.bo.busd) return message.error(this.$t('请正确输入'))
      this.$store.dispatch('Wallet/mobileApproveToto', { unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.mobileAuthorizationBtnNext })
    },
    mobileAuthorizationBtnNext() {
      this.authorizationStauts = false
    },
    conversionBtn() {
      if (!this.address) return message.error(this.$t('请先连接钱包'))
      if (!this.bo.busd) return message.error(this.$t('请正确输入'))
      // if (this.clientType === 'pc') {
      //   this.pcConversionBtn()
      // }
      // if (this.clientType === 'mobile') {
      //   this.mobileConversionBtn()
      // }
      this.mobileConversionBtn()
    },
    busdInput(v) {
      if (!v.target.value) return this.bo.toto = 0
      this.bo.toto = multiply(v.target.value, 10)
    },
    pcConversionBtn() {
      // 这里需要先授权
      this.$store.dispatch('Wallet/pcApproveToto', { unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
    },
    mobileConversionBtn() {
      // 这里需要先授权
      this.$store.dispatch('Wallet/mobileExchangeToto', { unit: process.env.NODE_ENV === 'development' ? 'mwei' : 'ether', amount: this.bo.busd, cb: this.resHint })
    },
    resHint(e) {
      this.$refs.hint.modal =  {
        title: this.$t('提示信息'),
        type: 'hint', // hint || connectWallet
        status: e === 'success' ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: e === 'success' ? this.$t('兑换成功') : this.$t('兑换失败'),
        cb: null
      }
      if (this.clientType === 'mobile') { // 操作之后把移动端重置为需要授权状态
        this.authorizationStauts = true
        this.bo.busd = null
        this.bo.toto = null
      }
      this.authorizationStauts = true
    }
  }
};
</script>

<style scoped>
@import "~@/styles/conversion.css";
</style>
