<template>
  <div class="client">
    <div v-scroll class="header">
      <div class="header-box">
        <div class="nav">
          <a href="/" :style="{'--image-url': `url(${logoUrl})`}" class="logo"></a>
          <a-tabs :tabBarGutter="32" @change="navChanges" :activeKey="activeKey" class="nav-box">
            <a-tab-pane v-for="item in navList" :key="item.key">
              <template slot="tab">
                <template v-if="item.children?.length">
                  <Popover placement="bottom">
                    {{ $t(item.label) }}
                    <template slot="content">
                      <div class="down_nav_modal">
                        <span :class="{ active: childItem.key == childKey }" :key="childItem.key"
                          v-for="childItem in item.children" @click="childrenRouterCb(childItem)">
                          {{ $t(childItem.label) }}
                        </span>
                      </div>
                    </template>
                  </Popover>
                </template>
                <template v-else>
                  {{ $t(item.label) }}
                </template>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="icon_box">
          <div class="select_lang_w">
            <a-dropdown placement="bottomCenter">
              <a href="JavaScript:;" @click.prevent>
                <img src="@/assets/images/home/yuy.png" alt="" />
              </a>
              <template #overlay>
                <SelectLang />
              </template>
            </a-dropdown>
          </div>
          <a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">
            <img src="@/assets/images/home/youtube.png" alt="" />
          </a>
          <a target="_blank" href="https://t.me/ozfundglobal">
            <img src="@/assets/images/home/tele.png" alt="" />
          </a>
          <!-- <a target="_blank" href="https://twitter.com/OzfundOfficial">
            <img src="@/assets/images/home/tiw.png" alt="" />
          </a> -->
          <a target="_blank" class="twitter" href="https://twitter.com/OzfundOfficial">
            <img src="@/assets/images/home/tx.png" alt="" />
          </a> 
          <a-button v-if="this.address" @click="pcDisconnectWalletNext" class="line_wallet">
            <span>{{ $t("global.disconnectWallet") }}</span>
          </a-button>
          <a-button v-else @click="pcLineWallet" class="line_wallet">
            <span>{{ $t("global.connectWallet") }}</span>
          </a-button>
        </div>
      </div>
    </div>
    <!-- <slot name="content"></slot> -->
    <div class="main-box">
      <component :is="compName"></component>
    </div>
    <div class="footer" :class="{ ru_public_foo: $i18n.locale === 'ru' }">
      <div class="list">
        <span class="logo" :style="{
            '--image-url': `url(${logoUrl})`,
          }"></span>
        <ul class="link-item">
          <li @click="jumpLink('VUE_APP_OZFUND_URL')">
            {{ $t("footer.ozfund") }}
          </li>
          <li>｜</li>
          <li @click="jumpLink('VUE_APP_OZBET_URL')">
            {{ $t("footer.ozbet") }}
          </li>
          <li>｜</li>
          <li @click="jumpLink('VUE_APP_AUPAY_URL')">
            {{ $t("footer.auPay") }}
          </li>
          <li>｜</li>
          <li @click="viewePdf.call(this, 'Oz-White-Paper.pdf')">
            {{ $t("footer.whitepaper") }}
          </li>
          <li>｜</li>
          <li @click="viewePdf.call(this, 'Oz-clause.pdf')">
            {{ $t("footer.treaty") }}
          </li>
          <li>｜</li>
          <li @click="viewePdf.call(this, 'Oz-Privacy-Policy.pdf')">
            {{ $t("footer.privacy") }}
          </li>
        </ul>
        <p class="rights">
          <span>{{ $t("global.trademark") }}</span>
          <span>©️</span>
          <span>{{ $t("global.ozFund") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { viewePdf, getSession, setSession } from "@/utils/base.js";
import { mapGetters } from "vuex";
import SelectLang from "./SelectLang/index.vue";
import { Tabs, Button, Popover, Dropdown } from "ant-design-vue";
import home from "@/views/Home/index.vue";
import zoology from "@/views/Zoology/index.vue";
import purchase from "@/views/Purchase/index.vue";
import presale from "@/views/Presell/index.vue";
import progress from "@/views/Progress/index.vue";
import dynamic from "@/views/Dynamic/index.vue";
import notice from "@/views/Notice/index.vue";
import logo from "@/assets/images/logo.png";
export default {
  name: "PcLayout",
  components: {
    SelectLang,
    Popover,
    ATabs: Tabs,
    ADropdown: Dropdown,
    ATabPane: Tabs.TabPane,
    AButton: Button,
  },
  computed: {
    ...mapGetters("Wallet", ["address"]),
    ...mapGetters("Nav", ['getNavModuleFlag'])
  },
  watch: {
    getNavModuleFlag() {
      this.childrenRouterCb({
        label: "nav.notice",
        value: notice,
        parent: "children",
        key: "notice",
      })

    }

  },
  data() {
    return {
      activeKey: "home",
      childKey: "",
      compName: home,
      logoUrl: logo,
      navList: [
        { label: "nav.homePage", value: home, key: "home" },
        { label: "nav.ecology", value: zoology, key: "zoology" },
        { label: "nav.purchaseAndPledge", value: purchase, key: "purchase" },
        { label: "nav.TOTOPreSale", value: presale, key: "presale" },
        { label: "nav.process", value: progress, key: "progress" },
        {
          label: "nav.trends",
          value: "",
          key: "children",
          children: [
            {
              label: "nav.trends",
              value: dynamic,
              parent: "children",
              key: "dynamic",
            },
            {
              label: "nav.notice",
              value: notice,
              parent: "children",
              key: "notice",
            },
          ],
        },
      ],
    };
  },
  created() {
    let navSite = getSession("nav-site");
    if (!navSite) {
      setSession("nav-site", "home");
      this.activeKey = "home";
      this.compName = home;
    } else {
      this.activeKey = navSite;
      let currentObj = this.navList.find((item) => item.key == navSite) || {};
      this.compName = navSite == 'children' ? currentObj.children[0].value : currentObj.value;
    }
  },

  methods: {
    viewePdf,
    childrenRouterCb(crt) {
      this.activeKey = "children";
      this.compName = crt.value;
      this.childKey = crt.key;
    },
    navChanges(key, dataList = this.navList) {
      setSession("nav-site", key);
      if (key !== "children") {
        this.childKey = "";
        this.activeKey = key;
        let findCompByKey = dataList.find((item) => item.key == key);
        this.compName = findCompByKey.value;

      }
    },
    jumpLink(url) {
      let obj = process.env
      window.open(obj[url], "_blank", true);
    },
    pcLineWalletNext() {
      this.$parent.$refs.hint.close();
      this.$store.dispatch("Wallet/pcConnectWallet");
    },
    // pc端链接钱包
    pcLineWallet() {
      if (this.address) return this.pcLineWalletNext();
      this.$parent.$refs.hint.modal = {
        title: this.$t("global.connectWallet"),
        type: "connectWallet", // hint || connectWallet
        show: true,
        txt: this.$t("global.walletSummary"),
        cb: this.pcLineWalletNext,
      };
    },
    // 移动端断开链接
    // closeMobileLineWallet() {
    //   this.$store.dispatch("Wallet/disconnectWallet");
    // },
    // 移动端链接钱包
    // mobileLineWallet() {
    //   this.mobileLineWalletNext();
    // },
    pcDisconnectWalletNext() {
      this.$store.dispatch("Wallet/pcDisconnectWallet");
      this.$parent.$refs?.hint?.close();
    },
    navClass(path) {
      if (
        path === "/dynamic" &&
        (this.$route.path === "/notice" || this.$route.path === "/dynamic")
      )
        return "cur";
      if (path === this.$route.path) return "cur";
    },
  },
};
</script>

<style lang="scss" scoped>
.twitter{
  width: .24rem;
  height: .24rem;
  border-radius: 50%;
  overflow: hidden;
  background: #0385f3;
  padding: 0.03rem;
}
.down_nav_modal {
  span {
    cursor: pointer;
    padding: 0.05rem 0.1rem;
  }

  .active {
    color: #0385f2;
  }
}

.client {
  margin: 0 auto;

  .logo {
    display: inline-block;
    width: 1.1rem;
    height: 0.28rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: var(--image-url);
  }

  .main-box {
    overflow-y: hidden;
    // pointer-events: none;
    min-height: calc(100vh - .6rem);
  }

  .header {
    position: fixed;
    height: 0.6rem;
    width: 100%;
    top: 0;
    z-index: 999;
  }

  .header-box {
    display: flex;
    width: var(--content-w);
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;

    .nav {
      display: flex;
      flex: 1;
      align-items: center;
      column-gap: 0.85rem;
    }

    :global(.ant-tabs-bar) {
      border-bottom: none;
      margin-bottom: 0;
    }

    :global(.ant-tabs-tab) {
      display: inline-flex !important;
      align-items: center;
      height: 0.6rem !important;
      padding: 0 !important;
      white-space: nowrap;
      color: #999;
      font-size: 16px;
    }

    :global(.ant-tabs-tab-active.ant-tabs-tab) {
      color: #333;
    }

    :global(.ant-tabs-tab-active.ant-tabs-tab::before) {
      top: 0;
      border-top-color: #0385f2;
      border-radius: 1.5px;
      border-top-width: 3px;
    }

    :global(.ant-tabs-nav.ant-tabs-nav-animated) {
      height: 0.6rem !important;
      display: flex;
      align-items: center;
    }

    :global(.ant-tabs-ink-bar.ant-tabs-ink-bar-animated) {
      display: none !important;
    }

    .icon_box {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .icon_box {
      display: flex;
      gap: 0.15rem;
      flex-shrink: 0;

      img {
        width: 0.24rem;
        height: 0.24rem;
      }
    }

    .line_wallet {
      display: flex;
      align-items: center;
      min-width: 0.99rem;
      background: #f4ba00;
      border-radius: 16px;
      font-size: 0.16rem;
      color: #fff;

      padding: 0 0.16rem;

      &:hover {
        border-color: transparent;
      }

      span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .footer {
    width: var(--content-w);
    min-height: 1.08rem;
    padding: 0.46rem 0 0.44rem;
    border-top: 2px solid #0e76cd;
    margin: 0 auto;
    column-gap: 0.15rem;

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      row-gap: 20px;
      justify-content: space-evenly;

      .link-item {
        display: flex;
        align-items: center;
        column-gap: 0.15rem;
        margin: 0 0.15rem;

        >li {
          font-size: 0.14rem;
          color: #666;
          cursor: pointer;

          &:nth-child(even) {
            // margin: 0 0.15rem;
            cursor: default;
          }
        }
      }
    }

    .rights {
      flex-shrink: 0;
      font-size: 0.14rem;
      color: #aaa;

      span {
        &:nth-child(2) {
          color: rgba(0, 0, 0, 0.8);
          margin-right: 0.08rem;
        }
      }
    }
  }

  .nav-box {
    :global(.ant-tabs-tab) {
      margin-right: 0.3rem !important;
    }
  }
}
</style>
