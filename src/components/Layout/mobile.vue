<template>
  <div>
    <div class="mobile_nav" style="display: block;">
      <div class="header">
        <a href="/" class="mobile_logo">
          <img src="@/assets/images/logo.png" alt="" />
        </a>
        <div class="right-box">
          <img class="lange" @click="changeLange" src="@/assets/images/home/yuy.png" alt="" />
          <van-popup v-model="langeList" position="bottom">
            <SelectLang @updateLange="changeLange" />
          </van-popup>
          <template v-if="!mobileOpen">
            <svg @click="clickMenu" width=".44rem" height=".3rem" viewBox="0 0 40 30" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="2023.3.20" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="1首页" transform="translate(-668, -133)">
                  <rect fill="#FFFFFF" x="0" y="0" width="750" height="5071"></rect>
                  <g id="yuy-备份" transform="translate(668, 133)" fill="#222222" fill-rule="nonzero">
                    <g id="编组">
                      <path
                        d="M2.22044605e-15,2.30857142 C2.22044605e-15,2.91142857 0.248571437,3.51142856 0.674285727,3.93714285 C1.10285717,4.36571429 1.70285716,4.6142857 2.30857142,4.6142857 C2.91868837,4.61099565 3.50326787,4.36895923 3.93714285,3.94 C4.36571429,3.51142856 4.61428573,2.91142857 4.61428573,2.30857142 C4.61325138,1.69687853 4.372152,1.1100324 3.94285715,0.674285696 C3.50757156,0.243944377 2.92066943,0.00179595094 2.30857142,0 C1.69647343,0.00179595898 1.1095713,0.243944385 0.674285727,0.674285696 C0.245750396,1.1107665 0.00391933412,1.6968994 2.22044605e-15,2.30857142 M8.8817842e-16,14.6142857 C8.8817842e-16,15.2171428 0.245714289,15.8228571 0.674285727,16.2485714 C1.10285717,16.6771429 1.70000001,16.9228571 2.30857142,16.9228571 C2.91955672,16.9197046 3.5050763,16.6777035 3.94,16.2485714 C4.37060205,15.8134588 4.61279657,15.2264449 4.61428573,14.6142857 C4.61113319,14.0033004 4.3691321,13.4177808 3.94,12.9828571 C3.50559189,12.5529478 2.91974035,12.3108095 2.30857142,12.3085714 C1.69659561,12.3109784 1.1099155,12.5530352 0.674285727,12.9828571 C0.244376346,13.4172652 0.00223805403,14.0031168 8.8817842e-16,14.6142857 M0,26.9228571 C0,27.5257143 0.245714289,28.1285714 0.674285727,28.5571428 C1.10285717,28.9857143 1.70000001,29.2314286 2.30857142,29.2314286 C2.91955673,29.228276 3.5050763,28.9862749 3.94,28.5571428 C4.37060205,28.1220302 4.61279656,27.5350164 4.61428573,26.9228571 C4.61187878,26.3108813 4.36982194,25.7242012 3.94,25.2885714 C3.50559189,24.858662 2.91974035,24.6165238 2.30857142,24.6142857 C1.69659561,24.6166927 1.1099155,24.8587495 0.674285727,25.2885714 C0.245237772,25.7247134 0.00331694737,26.3110639 0,26.9228571 M40,2.30857142 C40,3.58285715 39.0057143,4.6142857 37.78,4.6142857 L11.4514286,4.6142857 C10.2228571,4.6142857 9.23142243,3.58571426 9.23142243,2.30857142 C9.22857142,1.02857143 10.2228571,0 11.4514286,0 L37.78,0 C39.0085714,0 40,1.03142858 40,2.30857142 M37.78,16.9228571 L11.4514286,16.9228571 C10.2228571,16.9228571 9.23142857,15.8914285 9.23142857,14.6142857 C9.23142857,13.34 10.2228571,12.3085479 11.4514286,12.3085479 L37.78,12.3085479 C39.0085714,12.3028571 40,13.3371429 40,14.6142857 C40,15.8857143 39.0057143,16.9228571 37.78,16.9228571 Z M40,26.92 C40,28.1971429 39.0057143,29.2314286 37.78,29.2314286 L11.4514286,29.2314286 C10.2228571,29.2314286 9.23142857,28.1971429 9.23142857,26.92 C9.23142857,25.6485714 10.2228571,24.6142798 11.4514286,24.6142798 L37.78,24.6142798 C39.0085714,24.6114286 40,25.6485714 40,26.92"
                        id="形状"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </template>
          <template v-if="mobileOpen">
            <svg @click="clickMenu" t="1703476114895" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="22343" width=".44rem" height=".3rem">
              <path
                d="M453.44 512L161.472 220.032a41.408 41.408 0 0 1 58.56-58.56L512 453.44 803.968 161.472a41.408 41.408 0 0 1 58.56 58.56L570.56 512l291.968 291.968a41.408 41.408 0 0 1-58.56 58.56L512 570.56 220.032 862.528a41.408 41.408 0 0 1-58.56-58.56L453.44 512z"
                fill="#3D3D3D" p-id="22344"></path>
            </svg>
          </template>
          <!-- <van-icon   style="font-size: .3rem; width: .44rem; height: .3rem;" name="cross" /> -->
          <!-- <span :class="{ cur: mobileOpen }"></span>
            <span v-show="!mobileOpen"></span>
            <span :class="{ cur: mobileOpen }"></span> -->
        </div>
      </div>
      <div :class="{ cur: this.mobileOpen, menu_info: true }">
        <van-list>
          <van-cell @click="clickMobileNav(item)" v-for="item in navList" :key="item.value" :title="$t(item.label)" />
        </van-list>
      </div>
      <!-- <div @click="mobileOpen = false" v-show="this.mobileOpen" class="menu_info_bg"></div> -->
    </div>
    <component :is="compName" />
    <div class="wallet-box" :style="{
            '--date-img': `url(${require('@/assets/images/mobileLineBg.png')})`,
          }">
      <!-- v-if="!this.address" -->
      <span v-if="address" @click="mobileLineWallet" class="mobile_line_wallet">
        {{ $t("global.connectWallet") }}
      </span>
      <span v-else @click="closeMobileLineWallet" class="mobile_line_wallet">{{
            $t("global.disconnectWallet")
          }}</span>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import SelectLang from "./SelectLang";
import Hint from "@/components/Hint/index.vue";
import { connectMetaMask } from "@/utils/metamask";
import { setSession, getSession } from "@/utils/base";
import { mapGetters } from "vuex";
export default {
  name: "MobileLayout",
  components: {
    SelectLang,
    Hint,
  },
  computed: {
    ...mapGetters('Nav', ['getNavModuleFlag'])
  },
  watch: {
    getNavModuleFlag() {
      this.findComp("Notice");
    }
  },
  data() {
    return {
      address: true,
      langeList: false,
      compName: "",
      mobileOpen: false,
      navList: [
        { label: "nav.homePage", value: "Home" },
        { label: "nav.ecology", value: "Zoology" },
        { label: "nav.purchaseAndPledge", value: "Purchase" },
        { label: "nav.TOTOPreSale", value: "Presell" },
        { label: "nav.process", value: "Progress" },
        { label: "nav.trends", value: "Dynamic" },
        { label: "nav.notice", value: "Notice" },
      ],
    };
  },
  created() {
    this.address = !getSession('address')
    let nav = getSession('nav-site_mb')
    if (nav) {
      this.findComp(nav);
    } else {
      let { moduleFlag = "Home" } = this.$route.params || {};
      this.findComp(moduleFlag);
    }
  },
  methods: {
    changeLange() {
      this.langeList = !this.langeList;
      this.mobileOpen = false;
      document.body.style.overflow = "auto";
    },
    closeMobileLineWallet() {
      setSession("address", "");
      this.address = true;
      // this.$store.dispatch("Wallet/disconnectWallet");
    },
    mobileLineWallet() {
      connectMetaMask().then(async (provider) => {
        let account = await provider.listAccounts();
        // setSession("address", account[0]);
        setSession("address", account[0]);
        this.address = !account[0];
      });
      // this.$store.dispatch("Wallet/connectWalletConnect");
      // this.$refs.hint.close();
    },
    findComp(url) {
      if (!url) return;
      setSession('nav-site_mb', url)
      import(`@/views/${url}/index.vue`).then((res) => {
        this.compName = res.default;
      });
    },
    clickMobileNav({ value }) {
      this.findComp(value);
      this.mobileOpen = false;
      document.body.style.overflow = "auto";
    },
    clickMenu() {
      this.mobileOpen = !this.mobileOpen;
      if (this.mobileOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  line-height: 1.08rem;
  justify-content: space-between;
  padding-inline: 0.3rem 0.4rem;
}

.menu_info {
  padding-top: 0;
  top: 1.08rem;
}

.mobile_logo {
  width: auto;

  img {
    width: 1.8rem;
    height: 0.4rem;
    object-fit: contain;
  }
}

.right-box {
  display: flex;
  align-items: center;
}

.lange-box {
  display: flex;
  height: 100%;
  margin-right: 0.5rem;
  align-items: center;

  img {
    vertical-align: top;
  }
}

.lange {
  width: 0.44rem;
  height: 0.44rem;
  margin-right: 0.5rem;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wallet-box {
  display: flex;
  position: fixed;
  right: 0;
  top: 80%;
  height: 1.7rem;
  width: 1.7rem;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC-Regular;
  background-size: 100%;
  background-image: var(--date-img);
  z-index: 999;

  span {
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
  }
}
</style>
