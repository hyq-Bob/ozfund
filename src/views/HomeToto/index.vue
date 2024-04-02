<template>
  <div class="two_page">
    <div class="two_page_top">
      <img @click="$router.push('/')" src="@/assets/images/back.png" alt="" />
      <p>{{ $t("global.toto") }}{{ $t("home.exchange") }}</p>
    </div>
    <p class="toto_tips">
      <span>{{ $t("home.homeConversion") }}</span>
    </p>
    <div class="two_page_w">
      <div class="conversion_input">
        <p class="balance">
          {{ $t("global.toto") }}{{ $t("home.number") }}：{{ totoBalance || 0 }}
        </p>
        <div class="conversion_input_info">
          <i class="unit">¥</i>
          <input
            class="input"
            v-model="totoMapOzCoin"
            :placeholder="$t('home.placeholderExchangeSummary')"
          />
        </div>
        <p class="ozcoin">≈{{ totoMapOzCoin || 0 }}zcoin</p>
      </div>
      <div class="btn-box">
        <button
          class="conversion_input_btn"
          :disabled="disabledExchange"
          @click="exchangeFn"
        >
          {{ $t("home.exchange") }}
        </button>
      </div>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { connectMetaMask } from "@/utils/metamask";
import Hint from "@/components/Hint/index.vue";
export default {
  components: {
    Hint,
  },
  data() {
    return {
      totoMapOzCoin: null,
      disabledExchange: false,
      key: "toto",
    };
  },
  methods: {
    ...mapActions("Metamask", [
      "checkIfWalletIsConnected",
      "exchangeTOTOforOzcoin",
    ]),
    onClickTab(k) {
      this.key = k;
    },
    async exchangeFn() {
      this.disabledExchange = true;
      let accountAddr = await this.checkIfWalletIsConnected();
      if (accountAddr) {
        // 已连接钱包
        this.exchangeTOTOforOzcoin({
          amount: 100,
          exchangeAddr: accountAddr,
        })
          .then(({ success }) => {
            if (success) {
              this.totoMapOzCoin = null;
            } else {
              this.$refs.hint.modal = {
                title: this.$t("tipMessage.tip"),
                type: "hint", // hint || connectWallet
                status: 2, // 1是成功 2是失败
                show: true,
                txt: this.$t("global.fail"),
                cb: this.pcLineWalletNext,
              };
            }
          })
          .finally(() => {
            this.disabledExchange = false;
          });
        // this.pcExchangeOZCoin({
        //   amount: this.totoMapOzCoin,
        //   unit: "wei",
        // });
      } else {
        // 未连接钱包
        connectMetaMask();
      }
    },
  },
  computed: {
    ...mapGetters("Wallet", ["totoBalance"]),
  },
};
</script>

<style scoped lang="scss">
.two_page {
  height: 100%;
  background: #f5f5f5;
}
.two_page_top {
  display: flex;
  align-items: center;
  height: 88px;
  padding: 0 30px;
  background: #fff;
  > img {
    width: 20px;
    height: 37px;
    object-fit: contain;
  }
  > p {
    font-family: PingFangSC-Medium;
    flex: 1;
    text-align: center;
    height: 48px;
    font-size: 34px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
  }
}

.toto_tips {
  width: 100%;
  height: 73px;
  background: rgba(255, 194, 0, 0.1);
  > span {
    display: flex;
    font-family: PingFangSC-Regular;
    height: 33px;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    padding: 20px 30px;
  }
}

.conversion_input {
  margin: 20px 30px 30px;
  background: #ffffff;
  border-radius: 15px;
  padding: 30px;
  .balance {
    font-family: PingFangSC-Regular;
    line-height: 45px;
    font-size: 32px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
  }
  .conversion_input_info {
    display: flex;
    height: 104px;
    align-items: center;
    margin-top: 30px;
    column-gap: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .unit {
    font-family: PingFangSC-Regular;
    font-size: 60px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
  }
  .input {
    font-family: PingFangSC-Regular;
    flex: 1;
    font-size: 28px;
    color: #cccccc;
    letter-spacing: 0;
    font-weight: 400;
    border: none;
    height: 40px;
  }
  .ozcoin {
    height: 40px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
    margin-top: 20px;
  }
}

.btn-box {
  margin: 30px 30px 0;
  height: 88px;

  .conversion_input_btn {
    font-family: PingFangSC-Regular;
    width: 100%;
    height: 100%;
    font-size: 28px;
    color: #ffffff;
    background: #0385f2;
    border-radius: 15px;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    border: none;
  }
}
</style>
