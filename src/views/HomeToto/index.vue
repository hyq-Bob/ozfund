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
          amount: this.totoMapOzCoin,
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
  height: .88rem;
  padding: 0 .3rem;
  background: #fff;
  > img {
    width: .2rem;
    height: .37rem;
    object-fit: contain;
  }
  > p {
    display: flex;
    font-family: PingFangSC-Medium;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: .48rem;
    font-size: .34rem;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
  }
}

.toto_tips {
  width: 100%;
  min-height: .73rem;
  background: rgba(255, 194, 0, 0.1);
  > span {
    display: flex;
    font-family: PingFangSC-Regular;
    min-height: .33rem;
    font-size: .24rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    padding: .2rem .3rem;
  }
}

.conversion_input {
  margin: .2rem .3rem .3rem;
  background: #ffffff;
  border-radius: .15rem;
  padding: .3rem;
  .balance {
    font-family: PingFangSC-Regular;
    line-height: .45rem;
    font-size: .32rem;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
  }
  .conversion_input_info {
    display: flex;
    height: 1.04rem;
    align-items: center;
    margin-top: .3rem;
    column-gap: .3rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .unit {
    font-family: PingFangSC-Regular;
    font-size: .6rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
  }
  .input {
    font-family: PingFangSC-Regular;
    flex: 1;
    font-size: .28rem;
    color: #cccccc;
    letter-spacing: 0;
    font-weight: 400;
    border: none;
    height: .4rem;
  }
  .ozcoin {
    height: .4rem;
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
    margin-top: .2rem;
  }
}

.btn-box {
  margin: .3rem .3rem 0;
  height: .88rem;

  .conversion_input_btn {
    font-family: PingFangSC-Regular;
    width: 100%;
    height: 100%;
    font-size: .28rem;
    color: #ffffff;
    background: #0385f2;
    border-radius: .15rem;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    border: none;
  }
}
</style>
