<template>
  <div :class="`two_page ${isMobile && 'mobile'}`">
    <div class="two_page_top">
      <img @click="$router.push({name:'rootLayout', params:{moduleFlag:'Home'}})" src="@/assets/images/back.png" alt="" />
      <p>{{ $t("home.token") }}</p>
    </div>
    <div class="two_page_w">
      <clamp :content='$t("home.tokenInfo")' className="zoology_text"/>
      <!-- <p class="zoology_text">{{ $t("home.tokenInfo") }}</p> -->
      <div class="zoology_info">
        <van-tabs
          v-model="activeTabs"
          :line-width="borderLineW"
          title-inactive-color="#333"
          title-active-color="#0385F2"
          :line-height="4"
          @click="tabsClick"
        >
          <van-tab title="OZC">
            <template #title>
              <p ref="OZCEl">OZC</p>
            </template>
            <ul class="content-box">
              <li>
                <p>{{ $t("home.marketValue") }}</p>
                <span>9999999BUSD</span>
              </li>
              <li>
                <p>{{ $t("home.price") }}</p>
                <span>1OZC=1BUSD</span>
              </li>
              <li>
                <p>{{ $t("home.circulation") }}</p>
                <span>9999999BUSD</span>
              </li>
              <li>
                <a
                  target="_blank"
                  :href="'https://bscscan.com/token/' + ozcoinContractAddress"
                  >{{ ozcoinContractAddress }}
                </a>
              </li>
            </ul>
          </van-tab>
          <van-tab title="TOTO">
            <template #title>
              <p ref="TOTOEl">TOTO</p>
            </template>
            <ul class="content-box">
              <li>
                <p>{{ $t("价格") }}</p>
                <span>1TOTO=2.22OZC</span>
              </li>
              <li>
                <p>{{ $t("市值") }}</p>
                <span>99999OZC</span>
              </li>
              <li>
                <p>{{ $t("流通量") }}</p>
                <span>9999999TOTO</span>
              </li>
              <li>
                <p>{{ $t("已销毁") }}</p>
                <span>9999999TOTO</span>
              </li>
              <li>
                <a
                  target="_blank"
                  :href="'https://bscscan.com/token/' + totoContractAddress"
                >
                  {{ totoContractAddress }}
                </a>
              </li>
            </ul>
          </van-tab>
        </van-tabs>

        <!-- <ul class="zoology_info_top">
          <li @click="onClickTab('toto')" :class="key === 'toto' ? 'cur' : ''">TOTO</li>
          <li @click="onClickTab('ozc')" :class="key === 'ozc' ? 'cur' : ''">OZC</li>
        </ul>
        <div class="zoology_info_data">
          <ul>
            <li>
              <p>{{ $t('市值') }}</p><span>{{ totoSupply }} TOTO</span>
            </li>
            <li>
              <p>{{ $t('价格') }}</p><span>1 TOTO = 0.1 Ozcoin</span>
            </li>
            <li>
              <p>{{ $t('已销毁') }}</p><span>-- TOTO</span>
            </li>
            <li><a target="_blank" :href="'https://bscscan.com/token/' + totoContractAddress">{{ totoContractAddress
            }}</a></li>
          </ul>
          <ul v-show="key === 'ozc'">
            <li>
              <p>{{ $t('市值') }}</p><span>{{ ozcSupply }} OZC</span>
            </li>
            <li><a target="_blank" :href="'https://bscscan.com/token/' + ozcoinContractAddress">{{ ozcoinContractAddress
            }}</a></li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { isMobile } from "@/utils/base";
import clamp from '../components/clamp.vue';
export default {
  components: { clamp },
  setup() {
    let activeTabs = ref("OZC");
    let borderLineW = ref(63);
    let OZCEl = ref(null);
    let TOTOEl = ref(null);
    const tabsClick = (index, title) => {
      if (index == 0) {
        borderLineW.value = OZCEl.value.offsetWidth;
      } else {
        borderLineW.value = TOTOEl.value.offsetWidth;
      }
      activeTabs = title;
    };
    return {
      borderLineW,
      OZCEl,
      TOTOEl,
      isMobile,
      activeTabs,
      tabsClick,
    };
  },
  computed: {
    ...mapGetters("Wallet", [
      "totoSupply",
      "ozcSupply",
      "totoContractAddress",
      "ozcoinContractAddress",
    ]),
  },
};
</script>

<style scoped lang="scss">
.mobile {
  height: 100%;

  .two_page_top {
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
  .content-box {
    padding: 0.3rem;
    li {
      display: flex;

      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #333;
      letter-spacing: 0;
      font-weight: 400;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 0.25rem;
        height: 0.4rem;
      }
      &:last-child {
        height: 0.88rem;
        width: 100%;
        background: #0385f2;
        border-radius: 0.15rem;
      }
      span {
        color: #666;
      }
      a {
        display: flex;
        width: calc(100% - 0.4rem);
        padding: 0 0.2rem;
        color: #fff;
        // align-items: center;
        // justify-content:center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .two_page_w {
    height: calc(100% - 0.88rem);
    background: #f5f5f5;
    padding: 0.3rem;

    .zoology_text {
      // font-family: PingFangSC-Regular;
      margin: 0;
      padding: 0.3rem;
      font-size: 0.28rem;
      color: #333;
      font-weight: 400;
      background: #fff;
      line-height: 1.5;
      border-radius: 0.15rem;
    }

    .zoology_info {
      margin-top: 0.3rem;
      border-radius: 0.15rem;
      overflow: hidden;
      :global(.van-tab) {
        line-height: 1;
        font-size: 0.3rem;
      }
      :global(.van-tabs__wrap) {
        height: 0.82rem !important;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
      :global(.van-tabs__line) {
        background-color: #0385f2;
        border-radius: 0 !important;
      }
      :global(.van-tab--active .van-tab__text) {
        font-family: PingFangSC-Regular;
        font-size: 0.3rem;
        color: #0385f2;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
      }
    }
  }
}

.zoology_text {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
  padding: 15px;
  background: white;
  margin: 15px 0 10px;
  line-height: 24px;
  border-radius: 8px;
}

.zoology_info {
  background: #ffffff;
  border-radius: 8px;

  .zoology_info_top {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    li {
      height: 41px;
      font-size: 15px;
      // height: 100%;
      color: #333333;
      display: flex;
      align-items: center;
      cursor: pointer;

      &.cur {
        color: #0385f2;
        border-bottom: 2px solid #0385f2;
      }
    }
  }
}

.zoology_info_data {
  padding: 15px;

  ul {
    li {
      margin-bottom: 13px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      p {
        color: #333333;
        width: 84px;
        margin-right: 10px;
        flex-shrink: 0;
        flex-grow: 0;
        white-space: nowrap;
      }

      span {
        color: #666666;
        word-wrap: break-word;
        word-break: break-all;
      }

      button,
      a {
        width: 100%;
        background: #0385f2;
        border-radius: 8px;
        color: #ffffff;
        border: none;
        margin-top: 2px;
        word-wrap: break-word;
        word-break: break-all;
        padding: 12px;
        position: relative;
        text-align: center;
      }
    }
  }
}
</style>
