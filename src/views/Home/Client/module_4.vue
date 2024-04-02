<template>
  <div class="home_module_four pc_show">
    <div class="w">
      <div class="home_modul_tit">
        <h3>
          {{ $t("home.token") }}{{ $t("global.ozc") }}{{ $t("home.and")
          }}{{ $t("global.toto") }}
        </h3>
        <p>
          {{ $t("home.tokenInfo") }}
        </p>
      </div>
      <div class="module_card" ref="homeModuleThree">
        <!-- toto模块 -->
        <div class="card_i">
          <div class="card_i_top">
            <img v-animation class="card_i_top_img page_gif"
              :data-gif_url="require('@/assets/images/home/gif/ozc1.gif')" alt="" />
            <i class="card_i_top_foundation"></i>
          </div>
          <ul class="card_data">
            <li>
              <p>{{ $t("home.price") }}</p>
              <span>1TOTO = 0.1Ozcoin</span>
            </li>
            <li>
              <p>{{ $t("home.marketValue") }}</p>
              <span>{{ totoMarketCap }} TOTO</span>
            </li>
            <li>
              <p>{{ $t("home.destroyed") }}</p>
              <span>{{ totoDestroy }} TOTO</span>
            </li>
            <li>
              <p>{{ $t("home.circulation") }}</p>
              <span>{{ totoCirculatingSupply }} TOTO</span>
            </li>
          </ul>
          <!-- <p class="card_address">{{ totoContractAddress }}</p> -->
          <a target="_blank" :href="'https://bscscan.com/token/' + totoContractAddress" class="card_arrow">
            <img src="@/assets/images/home/arrow.png" alt="" />
          </a>
        </div>
        <!-- ozc模块 -->
        <div class="card_i">
          <div class="card_i_top">
            <!--  v-if="scroll.moduleThree === 2" -->
            <img v-animation class="card_i_top_img page_gif"
              :data-gif_url="require('@/assets/images/home/gif/toto1.gif')" alt="" />
            <i class="card_i_top_foundation"></i>
          </div>
          <ul class="card_data">
            <li>
              <p>{{ $t("home.price") }}</p>
              <span>1TOTO = 1BUSD</span>
            </li>
            <li>
              <p>{{ $t("home.marketValue") }}</p>
              <span>{{ ozcMarketCap || 0 }} OZC</span>
            </li>
            <li>
              <p>{{ $t("home.circulation") }}</p>
              <span>{{ ozcCirculatingSupply || 0 }} OZC</span>
            </li>
          </ul>
          <!-- <p class="card_address">{{ this.ozcoinContractAddress }}</p> -->
          <a target="_blank" :href="'https://bscscan.com/token/' + ozcoinContractAddress" class="card_arrow">
            <img src="@/assets/images/home/arrow.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState('WalletSplit', ['ozcMarketCap', 'destroyOzc', 'totoMarketCap', 'totoDestroy']),
    ...mapGetters("Wallet", ["totoContractAddress","ozcoinContractAddress"]),
    // ozc 流通量
    ozcCirculatingSupply() {
      return this.ozcMarketCap - this.destroyOzc
    },
    // toto 流通量
    totoCirculatingSupply() {
      return this.totoMarketCap - this.totoDestroy
    }
  },
  methods: {
    ...mapActions('WalletSplit', ['ozcPublish', 'circulatingSupplyFn','totoPublish', 'totoDestroyed'])
  },
  created() {
    this.ozcPublish()
    this.circulatingSupplyFn()
    this.totoPublish()
    this.totoDestroyed()
  }
};
</script>

<style lang="scss" scoped>
.home_module_four {
  background: url("~@/assets/images/home/module2.png") no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  padding: 1.45rem 0 1.8rem;
  position: relative;
  z-index: 2;

  .home_modul_tit {
    text-align: center;
    width: 86%;
    margin: 0 auto;
  }

  .home_modul_tit h3 {
    font-size: 0.4rem;
    color: #333;
    line-height: 0.44rem;
    font-weight: 500;
    margin-bottom: 0.24rem;
    font-family: "PingFang-Medium";
  }

  .home_modul_tit p {
    font-size: 0.14rem;
    color: #666;
    line-height: 0.24rem;
    font-weight: 200;
  }
}

.module_card {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.54rem;

  .card_i {
    width: 3.82rem;
    position: relative;
    padding: 1.6rem 0.61rem 0.96rem;

    &:nth-child(1) {
      background: url("~@/assets/images/home/card1.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 50px;
    }

    &:nth-child(2) {
      background: url("~@/assets/images/home/card2.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}

.card_i_top {
  width: 100%;
  position: absolute;
  top: -25%;
  left: 0;
  text-align: center;

  .card_i_top_img {
    width: 2.1rem;
  }

  .card_i_top_foundation {
    width: 1.28rem;
    height: 0.24rem;
    background: #edc341;
    display: none;
    border-radius: 50%;
    margin: 0 auto;
  }
}

.card_data {
  li {
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.24rem;

    p {
      font-size: 0.14rem;
      color: #554100;
    }

    span {
      font-family: DINNextW1G-Bold;
      font-size: 0.2rem;
      color: #554100;
      text-align: right;
      font-weight: 700;
    }
  }
}

.card_address {
  font-size: 0.14rem;
  color: #554100;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
  margin-top: 0.2rem;
}

.card_arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -6%;
  width: 0.9rem;
  height: 0.9rem;
  background: #0385f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    img {
      transform: translateX(5px);
    }
  }

  img {
    width: 0.29rem;
    transition: all 0.5s ease;
  }
}

.module_card {
  .card_i {
    &:nth-child(2) {
      .card_i_top_foundation {
        background: #469ce5;
      }

      .card_arrow {
        background: #ffc200;
      }
    }
  }
}
</style>
