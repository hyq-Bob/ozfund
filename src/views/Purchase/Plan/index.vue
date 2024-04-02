<template>
  <div :class="`${isMobile() ? 'mobile ' : ''}two_page`">
    <div class="nav">
      <img
        @click="
          $router.push({
            name: 'rootLayout',
            params: { moduleFlag: 'Purchase' },
          })
        "
        src="@/assets/images/back.png"
        alt=""
      />
      <p>{{ $t("purchaseAndPledge.plant") }}</p>
    </div>
    <div class="two_page_w">
      <!-- 曲线图 -->
      <div class="graph">
        <div class="w">
          <p class="graph_tit">{{$t('global.toto')}}/{{$t('global.busd')}} {{ $t("home.price") }}</p>
          <div class="graph_data">
            <div class="graph_data_left">
              <p>723</p>
              <span>{{$t('global.toto')}}/{{$t('global.busd')}}</span><i>+0.231(0.30%)</i>
            </div>
            <ul class="graph_data_right">
              <li
                v-for="item in grahpTime"
                :key="item.value"
                :class="{ cur: graphTimeKey === item.value }"
                @click="grahpTimeNav(item.value)"
              >
                {{ item.label }}
              </li>
            </ul>
          </div>
          <!-- <p class="graph_time">Jul19,2022,02:12PM</p> -->
          <!-- 本体 -->
          <div class="chart-box">
            <Chart />
          </div>
        </div>
      </div>
      <!-- 模块四 -->
      <div class="purchase_module_four">
        <div class="w">
          <div class="allocation">
            <p class="allocation_tit">{{$t('global.toto')}}{{ $t("tokenAllocation") }}</p>
            <div class="allocation_info">
              <div class="allocation_right">
                <img
                  ref="moduleFive"
                  class="page_gif"
                  src="@/assets/images/purchase/gif/module55.png"
                  alt=""
                />
              </div>
              <div class="allocation_left">
                <ul>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.supporters") }}</p>
                    <span>15%</span>
                  </li>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.foundation") }}</p>
                    <span>30%</span>
                  </li>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.members") }}</p>
                    <span>20%</span>
                  </li>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.liquidity1") }}</p>
                    <span>5%</span>
                  </li>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.poolMining1") }}</p>
                    <span>20%</span>
                  </li>
                  <li>
                    <p><i></i>{{ $t("purchaseAndPledge.vipPoolMining1") }}</p>
                    <span>10%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "../Chart/index.vue";
import { isMobile } from "@/utils/base";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      grahpTime: [
        { label: "24H", value: "24H" },
        { label: "1W", value: "1W" },
        { label: "1M", value: "1M" },
        { label: "1Y", value: "1Y" },
      ],
      graphTimeKey: "24H",
    };
  },
  methods: {
    isMobile,
    grahpTimeNav(value) {
      this.graphTimeKey = value;
    },
  },
};
</script>
<style scoped lang="scss">
.mobile {
  $color-list: #3CEA97, #0385F2, #FFC200, #6477E0, #9EBFFF, #FF9053;
  height: 100%;

  .nav {
    display: flex;
    height: 0.88rem;
    padding: 0.2rem 0.3rem;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    > img {
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

  .graph_tit {
    font-family: PingFangSC-Regular;
    height: 0.33rem;
    font-size: 0.24rem;
    color: #333;
    letter-spacing: 0;
    font-weight: 400;
  }

  .graph_data_left {
    display: flex;
    align-items: baseline;
    column-gap: 0.1rem;

    > p {
      font-family: DINNextW1G-Medium;
      height: 0.68rem;
      font-size: 0.44rem !important;
      color: #333;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 500;
    }

    > span {
      font-family: DINNextW1G-Medium;
      font-size: 0.23rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 500;
    }

    > i {
      font-family: DINNextW1G-Medium;
      font-size: 0.24rem;
      color: #0385f2;
      letter-spacing: 0;
      line-height: 0.68rem;
      font-weight: 500;
    }
  }

  .graph_data_right {
    display: flex;
    height: 0.6rem !important;
    width: fit-content;
    background: rgba(218, 238, 255, 0.2);
    border: 1px solid rgba(151, 151, 151, 0.2);
    border-radius: 0.3rem;
    align-items: center;

    li {
      width: 1rem !important;
      font-size: 0.16rem;
      color: #0385f2;
      text-align: center;
      height: 100%;
      cursor: pointer;

      &.cur {
        background: #0385f2;
        border-radius: 0.3rem !important;
        color: #fff;
      }
    }
  }

  .chart-box {
    margin-top: 0.2rem;
  }

  .graph {
    background: #fff;
    border-radius: 0.15rem;

    .w {
      padding: 0.3rem;
    }
  }

  .two_page_w {
    padding: 0.3rem;
    background: #f5f5f5;
  }
  .purchase_module_four {
    margin-top: 0.2rem;
    .w {
      padding: 0.3rem;
    }
    .allocation_tit {
      font-family: PingFangSC-Medium;
      height: 0.44rem;
      font-size: 0.34rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.44rem;
      font-weight: 500;
      text-align: center;
      margin-bottom: 0.45rem;
    }
  }
  .allocation_right {
    width: 80%;
    margin: 0 auto;
  }
  .allocation_left {
    margin-top: 0.6rem;
    ul > li {
      display: flex;
      height: 0.24rem;
      font-family: PingFangSC-Light;
      font-size: 0.26rem;
      color: #666;
      letter-spacing: 0;
      line-height: 0.24rem;
      font-weight: 200;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 0.24rem;
      }
      @for $i from 1 through length($color-list) {
        $item: nth($color-list, $i);

        &:nth-child(#{$i}) p i {
          background: $item;
        }
      }
      p {
        i {
          width: .2rem;
          height: .2rem;
          display: inline-block;
          border-radius: 50%;
          margin-right: .2rem;
        }
      }
    }
  }
}

.graph {
  margin-top: 15px;
}

.graph .w {
  padding: 15px;
  border-radius: 7px;
}

.graph_data .graph_data_left p {
  font-size: 22px;
}

.graph_data .graph_data_right {
  height: 30px;
  margin: 5px 0 10px;
}

.graph_data .graph_data_right li {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graph_data .graph_data_right li.cur {
  border-radius: 15px;
}

.purchase_module_four .w {
  border-radius: 7px;
  background: #ffffff;
  /* box-shadow: 0px 5px 15px 7px rgba(3,133,242,0.03); */
  padding: 15px;
}

.allocation {
  padding: 0;
  box-shadow: none;
}

.allocation_tit {
  font-size: 17px;
  color: #333;
  font-weight: 500;
  font-family: PingFangSC-Medium;
  margin-bottom: 15px;
}

.allocation_right {
  margin-top: 0;
  margin-bottom: 20px;
  width: 90%;
}

.allocation_left {
  padding: 0;
}

.allocation_left ul li {
  font-size: 13px;
  margin-bottom: 10px;
}

.allocation_left ul li:nth-last-child(1) {
  margin-bottom: 0;
}

.allocation_left ul li p i {
  width: 10px;
  height: 10px;
  margin-right: 10px;
}

.purchase_module_four {
  margin: 10px 0 0;
}
</style>
