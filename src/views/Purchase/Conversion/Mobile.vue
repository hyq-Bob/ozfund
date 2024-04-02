<template>
  <div class="exchange mobile">
    <div class="nav">
      <img @click="
        $router.push({
          name: 'rootLayout',
          params: { moduleFlag: 'Purchase' },
        })
        " src="@/assets/images/back.png" alt="" />
      <p>{{ $t("home.exchange") }}</p>
    </div>
    <div class="_conversion">
      <div class="content-box">
        <div v-if="type === 'b-o'" class="conversion_top">
          <div class="conversion_info">
            <div class="conversion_info_top">
              <p>{{ $t("purchaseAndPledge.from") }}</p>
              <span>{{ $t("purchaseAndPledge.quantity") }}：<i class="busd_number">{{
        busdBalance || 0
      }}</i>
                {{ $t('global.busd') }}
              </span>
            </div>
            <div class="conversion_info_input">
              <p>BUSD</p>
              <input v-model="bo.busd" @input="boBusdInput" id="usdt" type="number" placeholder="0" />
            </div>
          </div>
          <div @click="this.transitionBtn" class="conversion_icon">
            <img src="@/assets/images/purchase/icon.png" alt="" />
          </div>
          <div class="conversion_info">
            <div class="conversion_info_top">
              <p>{{ $t("purchaseAndPledge.to") }}</p>
              <span>{{ $t("purchaseAndPledge.quantity") }}：<i class="ozc_number">{{ ozcBalance || 0 }}{{
        $t('global.ozc') }}</i></span>
            </div>
            <div class="conversion_info_input">
              <p>Ozcoin</p>
              <input v-model="bo.ozc" readonly id="ozc" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div v-else class="conversion_top">
          <div class="conversion_info">
            <div class="conversion_info_top">
              <p>{{ $t("purchaseAndPledge.from") }}</p>
              <span>{{ $t("purchaseAndPledge.quantity") }}：<i class="ozc_number">{{ ozcBalance }}</i>
                {{ $t('global.ozc') }}
                <!-- <i @click="allConver('o')" class="conver_oper">{{ $t('最大限度') }}</i> -->
              </span>
            </div>
            <div class="conversion_info_input">
              <p>Ozcoin</p>
              <input v-model="ob.ozc" @input="obOzcInput" id="ozc" type="number" placeholder="0" />
            </div>
          </div>
          <div @click="this.transitionBtn" class="conversion_icon">
            <img src="@/assets/images/purchase/icon.png" alt="" />
          </div>
          <div class="conversion_info">
            <div class="conversion_info_top">
              <p>{{ $t("purchaseAndPledge.to") }}</p>
              <span>{{ $t("purchaseAndPledge.quantity") }}：<i class="busd_number">{{ busdBalance }}</i>BUSD
              </span>
            </div>
            <div class="conversion_info_input">
              <p>{{ $t('global.busd') }}</p>
              <input v-model="ob.busd" readonly id="usdt" type="number" placeholder="0" />
            </div>
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
        <span>{{ $t("home.exchange") }}</span>
      </button>
      <!-- <p class="modal_btn_oper_i">{{$t('点击授权成功后再次点击兑换')}}</p> -->
      <!-- <Hint ref="hint" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Hint from "@/components/Hint";
import { getSession } from "@/utils/base";
import { message } from "ant-design-vue";

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
    ...mapGetters("Wallet", [
      "busdBalance",
      "ozcBalance",
      "clientType",
      "address",
    ]),
  },
  mounted() {
    // if (this.clientType === 'pc') { // 如果是pc端可以直接授权加请求
    //   this.authorizationStauts = true
    // } else { // 移动端 授权和请求分成用户两次操作
    //   this.authorizationStauts = false
    // }
  },
  methods: {
    ...mapActions('Metamask', ['exchangeUsdtForOzc', "exchangeOzcForUsdt"]),
    exchangeClick() {
      //  type b-o usdt to ozc  o-b ozc to usdt
      if (this.type == 'b-o') {
        this.exchangeUsdtForOzc({ amount: this.bo.busd, exchangeAddr: getSession('address_ozfund') })
      }
      if (this.type == 'o-b') {
        this.exchangeOzcForUsdt({ amount: this.bo.ozc, exchangeAddr: getSession('address_ozfund') })
      }
    },
    // 移动端单独授权
    mobileAuthorizationBtn() {
      if (!this.address) return message.error(this.$t("请先连接钱包"));
      let amount = null;
      if (this.type === "b-o") {
        if (!this.bo.busd) return message.error(this.$t("请正确输入"));
        amount = this.bo.busd;
        this.$store.dispatch("Wallet/mobileApproveErc20", {
          type: this.type,
          unit: process.env.NODE_ENV === "development" ? "mwei" : "ether",
          amount,
          cb: this.mobileApproveNext,
        });
      }
      if (this.type === "o-b") {
        if (!this.ob.ozc) return message.error(this.$t("请正确输入"));
        amount = this.ob.ozc;
        this.$store.dispatch("Wallet/mobileApproveErc20", {
          type: this.type,
          unit: "ether",
          amount,
          cb: this.mobileApproveNext,
        });
      }
    },
    // 移动端授权后下一步
    mobileApproveNext() {
      this.authorizationStauts = true;
    },
    obOzcInput(e) {
      this.ob.busd = e.target.value;
    },
    boBusdInput(e) {
      this.bo.ozc = e.target.value;
    },
    allConver(key) {
      if (key === "b") {
        this.bo.busd = this.busdBalance;
        this.bo.ozc = this.busdBalance;
      }
      if (key === "o") {
        this.ob.ozc = this.ozcBalance;
        this.ob.busd = this.ozcBalance;
      }
    },
    transitionBtn() {
      // false是需要授权
      if (this.type === "b-o") {
        this.type = "o-b";
        // ozc转busd不需要授权
        this.authorizationStauts = true;
      } else {
        this.type = "b-o";
        this.authorizationStauts = false;
      }
    },
    conversionBtn() {
      if (!this.address) return message.error(this.$t("请先连接钱包"));
      this.mobileConversionBtn();
    },
    pcConversionBtn() {
      // 这里需要先授权
      if (this.type === "b-o") {
        if (!this.bo.busd) return message.error(this.$t("请正确输入"));
        this.$store.dispatch("Wallet/pcApproveErc20", {
          type: "b-o",
          unit: process.env.NODE_ENV === "development" ? "mwei" : "ether",
          amount: this.bo.busd,
          cb: this.resHint,
        });
      }
      if (this.type === "o-b") {
        if (!this.ob.ozc) return message.error(this.$t("请正确输入"));
        // 加权限用这个
        // this.$store.dispatch('Wallet/pcApproveErc20', { type: 'o-b', unit: 'ether', amount: this.ob.ozc })
        // 不加权限用这个
        this.$store.dispatch("Wallet/pcReverseExchangeOZCoin", {
          unit: "ether",
          amount: this.ob.ozc,
          cb: this.resHint,
        });
      }
    },
    mobileConversionBtn() {
      if (this.type === "b-o") {
        if (!this.bo.busd) return message.error(this.$t("请正确输入"));
        this.$store.dispatch("Wallet/mobileExchangeOZCoin", {
          type: "b-o",
          unit: process.env.NODE_ENV === "development" ? "mwei" : "ether",
          amount: this.bo.busd,
          cb: this.resHint,
        });
      }
      if (this.type === "o-b") {
        if (!this.ob.ozc) return message.error(this.$t("请正确输入"));
        this.$store.dispatch("Wallet/mobileReverseExchangeOZCoin", {
          unit: "ether",
          amount: this.ob.ozc,
          cb: this.resHint,
        });
      }
    },
    resHint(e) {
      this.$refs.hint.modal = {
        title: this.$t("提示信息"),
        type: "hint", // hint || connectWallet
        status: e === "success" ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: e === "success" ? this.$t("兑换成功") : this.$t("兑换失败"),
        cb: null,
      };
      this.bo = { busd: null, ozc: null };
      this.ob = { busd: null, ozc: null };
      this.authorizationStauts = false;
      // if (this.clientType === 'mobile' && this.type === 'b-o') { // 如果是移动端还原授权状态
      //   this.authorizationStauts = false
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.mobile {
  height: 100%;

  .nav {
    display: flex;
    height: 0.88rem;
    padding: 0.2rem 0.3rem;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    >img {
      width: 0.2rem;
      height: 0.37rem;
      aspect-ratio: 1 / 18;
      object-fit: contain;
    }

    p {
      font-family: PingFangSC-Medium;
      flex: 1;
      font-size: 0.34rem;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
    }
  }
}

._conversion {
  height: calc(100% - 0.88rem);
  background: #f5f5f5;
  padding: 0.3rem;
  width: 100%;

  .content-box {
    background: #fff;
    border-radius: 0.25rem;
    padding: 0.3rem;
  }

  .conversion_info {
    background: #f7fbff;
    border-radius: 22px;
    padding: 0.32rem 0.3rem;
  }

  .conversion_info_top {
    margin-bottom: 0.22rem;
    display: flex;
    justify-content: space-between;

    >p {
      height: 0.37rem;
      font-family: PingFangSC-Light;
      font-size: 0.26rem;
      color: #333;
      letter-spacing: 0;
      font-weight: 200;
    }

    >span {
      height: 0.33rem;
      font-family: PingFangSC-Light;
      font-size: 0.24rem;
      color: #999;
      letter-spacing: 0;
      font-weight: 200;
    }
  }

  .conversion_info_input {
    display: flex;
    justify-content: space-between;

    >p {
      height: 0.26rem;
      // font-family: DINNextW1G-Light;
      font-size: 0.26rem;
      color: #333;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 200;
    }

    ::placeholder {
      color: #666;
      font-size: 0.28rem;
      font-weight: 500;
    }

    >input {
      border: none;
      background: transparent;
      color: #666;
      font-size: 0.28rem;
      text-align: right;
      font-weight: 500;
    }
  }

  .conversion_icon {
    display: flex;
    width: 0.6rem;
    height: 0.6rem;
    padding: 0.16rem;
    background: #f7f8f9;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    margin: 0.1rem auto;
  }

  .conversion_btn {
    width: 100%;
    height: 0.88rem;
    border: none;
    background: #0385f2;
    border-radius: 0.15rem;
    margin-top: 0.3rem;

    >span {
      font-family: PingFangSC-Medium;
      font-size: 0.28rem;
      color: #fff;
      letter-spacing: 0;
      font-weight: 500;
    }
  }
}
</style>
