<template>
  <div>
    <div class="purchase_module_three_wrap">
      <div class="purchase_module_three">
        <div class="content-box">
          <div class="purchase_module_txt">
            <h3 class="min_tit">
              {{ $t("purchaseAndPledge.publishOrDestroy") }}
            </h3>
            <div class="main">
              <div class="purchase_module_txt_scroll">
                <!-- <p>{{ $t("purchaseModule3txt001") }}</p> -->
                <div :class="{ mobile_show_more: !viewMoreOneBoo }">
                  <!-- <p v-html='$t("purchaseAndPledge.publishOrDestroyInfo1")'></p> -->
                  <clamp :content="$t('purchaseAndPledge.publishOrDestroyInfo1')" className="content" />
                  <p>
                    {{ $t("purchaseAndPledge.destroy") }}
                  </p>
                  <!-- <p v-html='$t("purchaseAndPledge.destroyInfo")'></p> -->
                  <clamp :content="$t('purchaseAndPledge.destroyInfo')" className="content" />
                </div>
              </div>

              <div class="purchase_module_img">
                <img v-animation :data-gif_url="require('@/assets/images/purchase/gif/module3.gif')" class="page_gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="purchase_module_three mt58">
        <div class="content-box gap218">
          <div class="purchase_module_img_r">
            <img v-animation class="page_png" :data-gif_url="require('@/assets/images/purchase/gif/module4.gif')" alt="" />
          </div>
          <div class="purchase_module_txt">
            <h3 class="min_tit">
              {{ $t("purchaseAndPledge.useAndCirculation") }}
            </h3>
            <clamp :content="$t('purchaseAndPledge.useAndCirculationInfo')" className="content" />
            <!-- <p v-html='$t("purchaseAndPledge.useAndCirculationInfo")'>
            </p> -->
            <!-- <p :class="{ mobile_show_more: !viewMoreTwoBoo }">
              {{ $t("purchaseModule3txt7") }}
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 曲线图 -->
    <div class="graph">
      <div class="content-box">
        <p class="graph_tit">
          {{ $t("global.toto") }}/{{ $t("global.busd") }} {{ $t("home.price") }}
        </p>
        <div class="graph_data">
          <div class="graph_data_left">
            <p>
              <span class="total">723</span>
              <sub>
                <span class="unit">{{ $t("global.toto") }}/{{ $t("global.busd") }}</span>
                <sub class="ratio"><i>+0.231(0.30%)</i></sub>
              </sub>
            </p>
          </div>
          <ul class="graph_data_right">
            <li v-for="item in grahpTime" :key="item.value" :class="{ cur: graphTimeKey === item.value }"
              @click="grahpTimeNav(item.value)">
              {{ item.label }}
            </li>
          </ul>
        </div>
        <!-- <p class="graph_time"></p> -->
        <!-- 本体 -->
        <Chart />
      </div>
    </div>
  </div>
</template>

<script>
import Clamp from "../../components/clamp.vue";
import Chart from "../Chart";
export default {
  components: {
    Chart,
    Clamp,
  },
  data() {
    return {
      viewMoreTwoBoo: false,
      graphTimeKey: "24H",
      grahpTime: [
        { label: "24H", value: "24H" },
        { label: "1W", value: "1W" },
        { label: "1M", value: "1M" },
        { label: "1Y", value: "1Y" },
      ],
      viewMoreOneBoo: false,
    };
  },
  methods: {
    grahpTimeNav(value) {
      this.graphTimeKey = value;
    },
    viewMoreOne() {
      this.viewMoreOneBoo = !this.viewMoreOneBoo;
    },
    viewMoreTwo() {
      this.viewMoreTwoBoo = !this.viewMoreTwoBoo;
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase_module_three_wrap {
  background: url("~@/assets/images/purchase/bg1.png") no-repeat;
  background-size: 100% 100%;
}

.mt58 {
  margin-top: 0.5483rem;
}

.main {
  display: flex;
  column-gap: 0.44rem;
}

.purchase_module_three {
  .content-box {
    width: var(--content-w);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
}

.purchase_module_txt_scroll {
  width: 6.6rem;
}

.purchase_module_txt {
  h3 {
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #333;
    line-height: 0.44rem;
    font-weight: 500;
    margin-bottom: 0.24rem;
  }

  p,
  .content {
    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    color: #666;
    line-height: 0.24rem;
    font-weight: 200;
    text-align: left;
    margin-bottom: 0.1rem;
  }
}

.purchase_module_img_r {
  width: 3.1906rem;
  height: 3.4rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.purchase_module_img {
  width: 3.8215rem;
  height: 4.63rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.gap218 {
  column-gap: 2.1873rem;
}

.graph {
  background: #fff;
  width: 100%;
  margin-top: 0.7rem;

  .content-box {
    width: var(--content-w);
    box-shadow: 0px 5px 15px 7px rgba(3, 133, 242, 0.03);
    border-radius: 0.15rem;
    margin: 0 auto;
    padding: 0.4rem 0 0.2rem;
  }
}

.graph_tit {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  color: #333;
  letter-spacing: 0;
  font-weight: 400;
  padding: 0 0.4rem;
}

.graph_data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.2rem 0;
  padding: 0 0.4rem;

  .graph_data_left {
    font-family: DINNextW1G;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: flex-end;

    .total {
      font-family: DINNextW1G-Bold;
      font-size: 0.4rem;
      font-weight: inherit;
      font-weight: 500;
      white-space: nowrap;
      margin-right: 0.15rem;
    }

    .unit {
      font-family: AppleSystemUIFont;
      font-size: 0.2rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 400;
    }

    .ratio {
      font-family: AppleSystemUIFont;
      font-size: 0.2rem;
      color: #0385f2;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 400;
    }
  }

  .graph_data_right {
    display: flex;
    line-height: 0.33rem;
    background: rgba(218, 238, 255, 0.2);
    border: 1px solid rgba(151, 151, 151, 0.2);
    border-radius: 0.165rem;
    align-items: center;

    li {
      font-size: 0.16rem;
      color: #0385f2;
      width: 0.59rem;
      text-align: center;
      height: 100%;
      cursor: pointer;

      &.cur {
        background: #0385f2;
        border-radius: 0.165rem;
        color: #fff;
      }
    }
  }
}

.graph_time {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  color: #999;
}

#curve {
  width: 100%;
  height: 360px;
}
</style>
