<template>
  <div class="home_module_conversion pc_show">
    <div class="w">
      <div class="conversion_home_wrap">
        <div class="conversion_home_tit">
          <p>{{ $t("global.toto") }}{{ $t("home.exchange") }}</p>
          <span>{{ $t("home.homeConversion") }}</span>
        </div>
        <div class="conversion_home_info">
          <p class="conversion_home_info_tit toto_number">
            {{ $t("global.toto") }}{{ $t("home.number") }}：{{ totoBalance || 0}}
          </p>
          <div class="conversion_home_info_input">
            <div class="conversion_home_info_input_info">
              <input
                :disabled="false"
                class="toto_exchange_ozc_num"
                type="number"
                v-model="totoMapOzCoin"
                :placeholder="$t('home.placeholderExchangeSummary')"
              />
              <i><img src="@/assets/images/home/conversion.png" alt=""/></i>
              <input
                type="text"
                v-model="totoMapOzCoin"
                :placeholder="$t('Ozcion')"
                :disabled="true"
              />
            </div>
            <button class="toto_exchange_ozc" :disabled="disabledExchange && totoBalance" @click="exchangeFn">
              {{ $t("home.exchange") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Hint ref="hint" /> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Hint from '@/components/Hint/index.vue'
import { connectMetaMask } from "@/utils/metamask";
export default {
  components: {
    Hint
  },
  computed: {
    ...mapGetters("Wallet", ["totoBalance"]),
  },
  data() {
    return {
      disabledExchange:false,
      totoMapOzCoin: null,
    };
  },
  methods: {
    ...mapActions("Metamask", [
      "checkIfWalletIsConnected",
      "exchangeTOTOforOzcoin",
    ]),
    // ...mapActions("Wallet", ["pcExchangeOZCoin"]),
    // 兑换toto--> OzCoin
    async exchangeFn() {
      if(!this.totoBalance)return
      this.disabledExchange = true
      let accountAddr = await this.checkIfWalletIsConnected();
      if (accountAddr) {
        // 已连接钱包
        this.exchangeTOTOforOzcoin({
          amount: this.totoMapOzCoin,
          exchangeAddr: accountAddr,
        }).then(({ success }) => {
          if (success) {
            this.totoMapOzCoin = null;
          }else{
            this.$refs.hint.modal = {
              title: this.$t("tipMessage.tip"),
              type: "hint", // hint || connectWallet
              status: 2, // 1是成功 2是失败
              show: true,
              txt: this.$t("global.fail"),
              cb: this.pcLineWalletNext,
            };
          }
        }).finally(()=>{
          this.disabledExchange = false
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
};
</script>

<style lang="scss" scoped>
.home_module_conversion {
  height: 1.59rem;
  margin-bottom: 0.6rem;
  background-color: white;
}
.conversion_home_wrap {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 20px 10px rgba(3, 133, 242, 0.03);
  border-radius: 0.15rem;
  padding: 0.4rem;
  padding-right: 0.37rem;
  display: flex;
  align-items: center;
  .conversion_home_tit {
    margin-right: 0.5rem;
    span {
      font-size: 0.14rem;
      color: #666;
      line-height: 0.24rem;
      font-weight: 200;
      display: block;
    }
    p {
      font-family: PingFang-Medium;
      font-size: 0.22rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.1rem;
      padding-top: 0.12rem;
      position: relative;
      display: inline-block;
      &::after {
        content: "";
        width: 30%;
        height: 0.03rem;
        background: #0385f2;
        border-radius: 0.04rem;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.conversion_home_info .conversion_home_info_tit {
  font-size: 0.16rem;
  color: #333;
  font-weight: 400;
  margin-bottom: 0.1rem;
}
.conversion_home_info_input {
  display: flex;
  align-items: center;
  input {
    width: 2.6rem;
    height: 0.47rem;
    background: #f7fbff;
    border-radius: 0.08rem;
    font-size: 0.14rem;
    color: #333;
    padding: 0 0.15rem;
    border: none;
  }
  button {
    &[disabled]{
      cursor: not-allowed;
    }
    width: 1.4rem;
    height: 0.47rem;
    background: #0385f2;
    border-radius: 0.1rem;
    font-family: PingFang-Medium;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
    font-weight: 500;
    border: none;
    cursor: pointer;
    margin-left: 0.33rem;
  }
  i {
    width: 0.3rem;
    height: 0.3rem;
    background: #f7f8f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 0.2rem;
    img {
      width: 0.128rem;
    }
  }
}
.conversion_home_info_input_info {
  display: flex;
  align-items: center;
}
</style>
