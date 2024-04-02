<template>
  <div class="two_page mobile">
    <div class="nav">
      <img @click="
        $router.push({
          name: 'rootLayout',
          params: { moduleFlag: 'Purchase' },
        })
        " src="@/assets/images/back.png" alt="" />
      <ul class="two_page_nav">
        <li class="cur">{{ $t("purchaseAndPledge.obtain") }}</li>
        <li>
          <router-link to="/purchase/extract">{{
        $t("purchaseAndPledge.withdrawal")
      }}</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="pledage_w">
        <p class="pledage_top">
          OZC{{ $t("purchaseAndPledge.quantity") }}：{{ ozcBalance || 0 }}
        </p>
        <div class="pledage_input_w">
          <p>¥</p>
          <input v-model="pledgeNumber" type="number" :placeholder="$t('tipMessage.num')" />
          <span @click="allPledge" class="all">{{ $t("global.all") }}</span>
        </div>
        <div class="pledage_data">
          <p>
            {{ $t("purchaseAndPledge.obtain") }}：{{ pledgeNumber || 0 }}
            {{ $t("global.ozc") }}
          </p>
          <!-- <p>{{ $t('预计获得TOTO') }}：未对接TOTO</p> -->
          <p>
            {{ $t("purchaseAndPledge.annualizedReturn") }}：{{this.stakeRate}}%
          </p>
        </div>
      </div>
      <div class="pledage_btn">
        <button @click="pledgeBtn">{{ $t("global.submit") }}</button>
        <p>
          {{ $t("purchaseAndPledge.obtain") }}
          {{ $t("global.ozc")}}
          {{ $t("purchaseAndPledge.stake") }}
          {{ $t("global.toto") }}
        </p>
      </div>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { message } from "ant-design-vue";
import Hint from "@/components/Hint";
import { getSession } from "@/utils/base";
export default {
  components: {
    Hint,
  },
  data() {
    return {
      pledgeNumber: null,
    };
  },
  computed: {
    ...mapGetters("Wallet", ["ozcBalance", "clientType", "stakeRate"]),
  },
  methods: {
    ...mapActions("Metamask", ["stakeCoin2"]),
    // 质押所有ozc
    allPledge() {
      this.pledgeNumber = this.ozcBalance || 0;
    },
    // 质押
    pledgeBtn() {
      // if (this.pledgeNumber > this.ozcBalance) return message.error(this.$t('请正确输入'))
      this.mobilePledgeBtn();
    },
    mobilePledgeBtn() {
      if (!this.pledgeNumber) return message.error(this.$t("tipMessage.successTip"));
      this.stakeCoin2({
        amount: this.pledgeNumber,
        stakeAddr: getSession("address"),
      })
        .then((res) => {
          if (res.success) {
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      // this.$store.dispatch("Wallet/mobileStake", {
      //   unit: "ether",
      //   amount: this.pledgeNumber,
      //   cb: this.resHint,
      // });
    },
    resHint(e) {
      this.$refs.hint.modal = {
        title: this.$t("提示信息"),
        type: "hint", // hint || connectWallet
        status: e === "success" ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: e === "success" ? this.$t("pledgeTxt2") : this.$t("质押失败"),
        cb: null,
      };
      setTimeout(() => {
        this.$router.push("/purchase");
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .two_page_nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;

    li {
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      color: #666;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;

      &.cur {
        font-family: PingFangSC-Medium;
        font-size: 0.34rem;
        color: #333;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
      }
    }
  }

  .content {
    height: calc(100% - 0.88rem);
    background: #f5f5f5;
    padding: 0.3rem;

    .pledage_w {
      background: #fff;
      border-radius: 0.15rem;
      padding: 0.3rem;
    }
  }

  .pledage_top {
    font-family: PingFangSC-Regular;
    height: 0.45rem;
    font-size: 0.32rem;
    color: #333;
    letter-spacing: 0;
    font-weight: 400;
  }

  .pledage_input_w {
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-top: 0.3rem;

    >p {
      font-family: PingFangSC-Regular;
      width: 0.36rem;
      height: 0.84rem;
      font-size: 0.6rem;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }

    ::placeholder {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #ccc;
      letter-spacing: 0;
      font-weight: 400;
    }

    >input {
      flex: 1;
      height: 0.84rem;
      border: none;
      font-size: 0.28rem;
      color: #ccc;
      padding: 0.2rem 0.3rem 0;
    }

    >span {
      font-family: PingFangSC-Regular;
      height: 40px;
      font-size: 28px;
      color: #0385f2;
      letter-spacing: 0;
      font-weight: 400;
    }
  }

  .pledage_data {
    margin-top: 0.2rem;

    p {
      font-family: PingFangSC-Regular;
      height: 0.37rem;
      font-size: 0.26rem;
      color: #333;
      letter-spacing: 0;
      font-weight: 400;

      &:not(:last-child) {
        margin-bottom: 0.15rem;
      }
    }
  }

  .pledage_btn {
    margin-top: 0.3rem;

    >button {
      font-family: PingFangSC-Regular;
      height: 0.88rem;
      width: 100%;
      border: none;
      color: #fff;
      background: #0385f2;
      border-radius: 15px;
      font-size: 0.28rem;
    }

    p {
      font-family: PingFangSC-Regular;
      height: 40px;
      font-size: 0.28rem;
      color: #0385f2;
      letter-spacing: 0;
      font-weight: 400;
      margin-top: 0.2rem;
      text-align: center;
    }
  }
}
</style>
