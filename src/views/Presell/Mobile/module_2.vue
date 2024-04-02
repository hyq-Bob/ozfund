<template>
  <div class="presell-module_2">
    <div class="purchase">
      <div class="data-transform" :style="{ order: !isTransform ? 1 : 3 }">
        <p>
          <span>
            {{ isTransform ? $t("purchaseAndPledge.to") : $t("purchaseAndPledge.from") }}
          </span>
          <span>
            {{ $t("purchaseAndPledge.quantity") }}：{{ busdBalance || 0 }}{{ $t("global.busd") }}({{ isTransform ?
        "1TOTO=0.1BUSD" : "1BUSD=10TOTO" }})
          </span>
        </p>
        <div>
          <span>{{ $t("global.busd") }}</span>
          <div>
            <input type="number" v-model="usdtVal" :placeholder="0" />
            <span @click="() => (usdtVal = busdBalance)">{{ $t("global.all") }}</span>
          </div>
        </div>
      </div>
      <div class="transform-icon" style="order: 2;" @click="transformClick">
        <img src="../../../assets/images/purchase/icon.png" alt="" />
      </div>
      <div class="data-transform" :style="{ order: !isTransform ? 3 : 1 }">
        <p>
          <span>
            {{ !isTransform ? $t("purchaseAndPledge.to") : $t("purchaseAndPledge.from") }}
          </span>
        </p>
        <div>
          <span>{{ $t("global.toto") }}</span>
          <div>
            <input type="number" v-model="totoVal" :placeholder="0" />
          </div>
        </div>
      </div>
      <!-- {{ $t("purchaseAndPledge.purchase") }} -->
      <button style="order: 4;" @click="exchangeClick">{{ $t('home.exchange') }}</button>
    </div>
    <div class="contract-info_box">
      <p>{{ $t("preSale.contractInfo") }}</p>
      <ul>
        <li>
          <p>{{ $t("preSale.fullName") }}</p>
          <p>TOTO</p>
        </li>
        <li>
          <p>{{ $t("preSale.referred") }}</p>
          <p>TOTO</p>
        </li>

        <li>
          <p>{{ $t("preSale.accuracy") }}</p>
          <p>18</p>
        </li>
        <li>
          <p>{{ $t("preSale.distribution") }}{{ $t("preSale.network") }}</p>
          <p>ETH{{ $t("preSale.mainNetwork") }}</p>
        </li>

        <li>
          <p>{{ $t("preSale.tokenStandards") }}</p>
          <p>ERC20</p>
        </li>
        <li>
          <p>{{ $t("preSale.browser") }}{{ $t("preSale.queries") }}</p>
          <p>
            <span cursor @click="jump(`https://bscscan.com/token/${totoContractAddress}`)">
              {{ $t("global.jump") }}
            </span>
          </p>
        </li>

        <li class="last-item">
          <p>{{ $t("preSale.contract") }}{{ $t("preSale.address") }}</p>
          <p :title="totoContractAddress">
            <span class="address">{{ totoContractAddress }}</span>

            <!-- <span cursor>{{ $t('global.expand') }}</span> -->
          </p>
          <!-- <clamp
            tag="span"
            :content="totoContractAddress"
            :maxLines="1"
            class="address"
          ></clamp> -->
        </li>
      </ul>
    </div>
    <div class="icon-list">
      <div class="icon-b"></div>
      <div class="icon-text"></div>
      <div class="icon-s"></div>
    </div>
  </div>
</template>

<script>
import { getSession } from "@/utils/base";
import { mapGetters,mapActions } from "vuex";
// import clamp from "../../components/clamp.vue";
export default {
  // components: { clamp },
  computed: {
    ...mapGetters("Wallet", ["totoContractAddress", 'busdBalance', 'ozcBalance', 'clientType', 'address']),
  },
  data() {
    return {
      usdtVal: 0,
      totoVal: 0,
      isTransform: false,
    };
  },
  methods: {
    ...mapActions("Metamask", ['exchangeTOTOToUsdt', "exchangeUsdtToTOTO"]),
    exchangeClick(){
      if(this.isTransform){
         // toto --> usdt
         this.exchangeTOTOToUsdt({ amount:this.usdtVal, exchangeAddr:getSession('address')})
      }else{
        // usdt --> toto
        this.exchangeUsdtToTOTO({ amount:this.totoVal, exchangeAddr:getSession('address')})
      }
    },
    transformClick() {
      this.isTransform = !this.isTransform;
    },
    jump(url) {
      window.open(url, "_banlk", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.presell-module_2 {
  margin: 0 0.3rem;
  background: #fff;

  .address {
    font-family: DINNextW1G-Light;
    height: 0.28rem;
    font-size: 0.28rem;
    color: #333;
    letter-spacing: 0;
    font-weight: 200;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    +span {
      font-family: PingFangSC-Regular;
      margin-left: 0.21rem;
    }
  }

  p {
    margin-block: 0;
    margin-inline: 0;
  }

  .icon-list {
    position: relative;
    height: 2.42rem;
    background: url("./imgs/bg_1.png") no-repeat;
    background-size: 100%, 100%;
    background-position: 0;
    margin-top: 0.4rem;
    border-radius: 0.15rem;
    overflow: hidden;

    .icon-b {
      position: absolute;
      width: 1.91rem;
      height: 1.91rem;
      top: 0.25rem;
      left: 0.21rem;
      background: url(./imgs/logo-2.svg) no-repeat;
    }

    .icon-text {
      position: absolute;
      width: 2.53rem;
      height: 1.32rem;
      top: 50%;
      left: 50%;
      background: url(./imgs/summary.svg) no-repeat;
      transform: translate(-50%, -50%);
      background-size: 100% 100%;
      z-index: 22;
    }

    .icon-s {
      position: absolute;
      width: 1rem;
      height: 0.97rem;
      top: 0.48rem;
      right: 0.35rem;
      background: url(./imgs/logo-1.svg) no-repeat;
      background-position: 0;
      background-size: 100% 100%;
    }
  }

  .purchase {
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0px 0px 20px 10px rgba(3, 133, 242, 0.05);
    border-radius: 0.25rem;
    padding: 0.3rem;

    input {
      font-family: DINNextW1G-Medium;
      height: 0.28rem;
      font-size: 0.28rem;
      color: #666;
      border: none;
      outline: 0;
      width: 100%;
      background: transparent;
      text-align: right;
      font-weight: 500;
    }

    >button {
      height: 0.88rem;
      width: 100%;
      background: #0385f2;
      border-radius: 0.2rem;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 0.28rem;
      color: #fff;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
      margin-top: 0.2rem;
    }
  }

  .data-transform {
    background: #f7fbff;
    border-radius: 0.22rem;
    padding: 0.32rem 0.3rem;

    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.22rem;

      >span {
        &:first-child {
          font-family: PingFangSC-Light;
          height: 0.37rem;
          font-size: 0.26rem;
          color: #333;
          letter-spacing: 0;
          font-weight: 200;
        }

        &:not(:first-child) {
          font-family: PingFangSC-Light;
          font-size: 0.24rem;
          color: #999;
          letter-spacing: 0;
          text-align: right;
          font-weight: 200;
        }
      }
    }

    >div {
      display: flex;
      align-items: center;
      column-gap: 0.2rem;

      >span {
        // font-family: DINNextW1G-Light;
        height: 0.33rem;
        font-size: 0.26rem;
        color: #333;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 200;
      }

      >div {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;

        >span {
          font-family: PingFangSC-Light;
          font-size: 0.24rem;
          color: #0385f2;
          letter-spacing: 0;
          font-weight: 200;
          white-space: nowrap;
          margin-left: 0.16rem;
        }
      }
    }
  }

  .transform-icon {
    width: 0.6rem;
    height: 0.6rem;
    padding: 0.16rem;
    background: #f7f8f9;
    margin: 0.1rem auto;
    border-radius: 50%;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .contract-info_box {
    >p {
      font-family: PingFangSC-Medium;
      font-size: 0.32rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 500;
      margin-top: 0.4rem;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, 33.33%);
      row-gap: 0.3rem;
      margin-top: 0.2rem;

      li {
        [cursor] {
          font-family: PingFangSC-Regular;
          cursor: pointer;
          color: #0385f2;
          font-weight: 400;
        }

        &:not(:nth-child(3n + 1)) {
          position: relative;
          padding-left: 0.1663rem;

          &::before {
            position: absolute;
            left: 0;
            content: "";
            height: 100%;
            width: 1px;
            background: #e6e6e6;
          }
        }

        p {
          &:first-child {
            font-family: PingFangSC-Light;
            height: 0.33rem;
            font-size: 0.24rem;
            color: #666;
            letter-spacing: 0;
            font-weight: 200;
          }

          &:last-child {
            font-family: DINNextW1G-Light;
            height: 0.28rem;
            font-size: 0.28rem;
            color: #333;
            letter-spacing: 0;
            font-weight: 200;
            margin-top: 0.1rem;
            line-height: 1;
            white-space: nowrap;
          }
        }
      }

      .last-item {
        overflow: hidden;
        grid-column: 1 / span 3;

        p:last-child {
          display: flex;
          align-items: center;

          span {
            &:last-child {
              flex-shrink: 1;
            }
          }
        }
      }
    }
  }
}
</style>
