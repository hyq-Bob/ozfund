<template>
  <div>
    <div class="public_head w">
      <h1 class="logo">
        <a href="/"><img src="@/assets/images/logo.png" alt="" /></a>
      </h1>
      <ul class="head_nav">
        <li v-for="item in navList" :key="item.value" :class="navClass(item.value)">
          <router-link v-if="item.value !== '/dynamic'" :to="item.value" tag="a">{{ item.label }}</router-link>
          <div v-else class="down_nav">
            <Popover>
              <a>{{ item.label }}</a>
              <template slot="content">
                <div class="down_nav_modal">
                  <router-link to="/dynamic" tag="a">动态</router-link>
                  <router-link to="/notice" tag="a">公告</router-link>
                </div>
              </template>
            </Popover>
          </div>
        </li>
      </ul>
      <div class="head_operate">
        <div class="select_lang_w">
          <a href="JavaScript:;"><img src="@/assets/images/home/yuy.png" alt="" /></a>
          <SelectLang />
        </div>
        <a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ"><img
            src="@/assets/images/home/youtube.png" alt="" /></a>
        <a target="_blank" href="https://t.me/ozfundglobal"><img src="@/assets/images/home/tele.png" alt="" /></a>
        <a target="_blank" href="https://twitter.com/OzfundOfficial"><img src="@/assets/images/home/tiw.png"
            alt="" /></a>
        <!-- <button @click="pcLineWallet" class="line_wallet">{{ this.address ? $t('断开钱包') : $t('连接钱包')}}</button> -->
        <button v-if="this.address" @click="closeMobileLineWallet" class="line_wallet">
          {{ $t("断开钱包") }}
        </button>
        <button v-else @click="mobileLineWallet" class="line_wallet">
          {{ $t("连接钱包") }}
        </button>
        <!-- <button @click="$store.dispatch('Wallet/getMoreData')">获取余额</button> -->
        <!-- <button @click="linkConnect">连接啦</button> -->
      </div>
    </div>
    <div class="mobile_nav" :class="{ mobile_nav_open: mobileOpen }">
      <div class="top">
        <a href="/" class="mobile_logo">
          <img src="@/assets/images/logo.png" alt="" />
        </a>
        <div class="mobile_select_lang_w select_lang_w">
          <img src="@/assets/images/home/yuy.png" alt="" />
          <SelectLang />
        </div>
        <div @click="this.clickMenu" class="menu">
          <span :class="{ cur: this.mobileOpen === true }"></span>
          <span v-show="!this.mobileOpen"></span>
          <span :class="{ cur: this.mobileOpen === true }"></span>
        </div>
        <!-- <button v-if="!this.address" @click="mobileLineWallet" class="mobile_line_wallet">{{$t('连接钱包')}}</button>
        <button v-else @click="closeMobileLineWallet" class="mobile_line_wallet">{{ $t('断开钱包') }}</button> -->
      </div>
      <div :class="{ 'cur menu_info': this.mobileOpen === true, menu_info: true }">
        <ul class="menu_info_list">
          <li v-for="item in navList" :key="item.value" :class="navClassMobile(item.value)" @click="clickMobileNav">
            <router-link :to="item.value" tag="a">{{ item.label }}</router-link>
          </li>
          <li key="/notice" :class="navClassMobile('/notice')" @click="clickMobileNav">
            <router-link to="/notice" tag="a">公告</router-link>
          </li>
        </ul>
      </div>
      <div @click="mobileOpen = false" v-show="this.mobileOpen" class="menu_info_bg"></div>
    </div>
    <router-view />
    <!-- 链接钱包 -->
    <div class="mobile_line_wallet">
      <img src="@/assets/images/mobileLineBg.png" alt="" />
      <p v-if="!this.address" @click="mobileLineWallet">{{ $t("连接钱包") }}</p>
      <p v-else @click="closeMobileLineWallet">{{ $t("断开钱包") }}</p>
    </div>
    <!-- 公用底部 pc -->
    <div class="public_foo pc_show" :class="{ ru_public_foo: $i18n.locale === 'ru' }">
      <div class="w">
        <img class="logo" src="@/assets/images/logo.png" alt="" />
        <ul>
          <li>
            <a href="/">{{ this.$t("footer.ozfund") }}</a>
          </li>
          <li>｜</li>
          <li>
            <a href="/">{{ this.$t("footer.ozbet") }}</a>
          </li>
          <li>｜</li>
          <li>
            <a target="_blank" href="http://www.aupay.one/">{{
          this.$t("footer.auPay")
        }}</a>
          </li>
          <li>｜</li>
          <li>
            <a href="#" @click="viewePdf.call(this,'Oz-White-Paper.pdf')">{{
          this.$t("footer.whitepaper")
        }}</a>
          </li>
          <li>｜</li>
          <li>
            <a href="#" @click="viewePdf.call(this,'Oz-clause.pdf')">{{
          this.$t("footer.treaty")
        }}</a>
          </li>
          <li>｜</li>
          <li>
            <a href="#" @click="viewePdf.call(this,'Oz-Privacy-Policy.pdf')">{{
          this.$t("footer.privacy")
        }}</a>
          </li>
        </ul>
        <p class="rights">All rights reserved,Ozfund</p>
      </div>
    </div>
    <!-- 公用底部 mobile -->
    <div class="public_foo_mobile w mobile_show">
      <ul class="public_foo_mobile_ul">
        <li class="public_foo_mobile_li">
          <a class="public_foo_mobile_li_tit" href="/">
            {{this.$t("footer.ozfund")}}
          </a>
        </li>
        <li class="public_foo_mobile_li">
          <a class="public_foo_mobile_li_tit" href="/">
            {{this.$t("footer.ozbet")}}
          </a>
        </li>
        <li class="public_foo_mobile_li">
          <a class="public_foo_mobile_li_tit" target="_blank" href="http://www.aupay.one/">{{ this.$t("footer.auPay")
            }}</a>
        </li>
        <li class="public_foo_mobile_li">
          <p class="public_foo_mobile_li_tit">{{ this.$t("global.about") }}Ozfund</p>
          <ul>
            <li>
              <a href="#" @click="viewePdf('Oz-White-Paper.pdf')">{{
          this.$t("footer.whitepaper")
        }}</a>
            </li>
            <li>
              <a href="#" @click="viewePdf('Oz-clause.pdf')">{{
          this.$t("footer.treaty")
        }}</a>
            </li>
            <li>
              <a href="#" @click="viewePdf('Oz-Privacy-Policy.pdf')">{{
          this.$t("footer.privacy")
        }}</a>
            </li>
          </ul>
        </li>
        <li class="public_foo_mobile_li">
          <p class="public_foo_mobile_li_tit">{{ this.$t("关注我们") }}</p>
          <div class="public_foo_mobile_li_attention">
            <a target="_blank" href="https://t.me/ozfundglobal">
              <img src="@/assets/images/home/tele1.png" alt="" />
            </a>
            <a target="_blank" href="https://twitter.com/OzfundOfficial">
              <img src="@/assets/images/home/tiw1.png" alt="" />
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ">
              <img src="@/assets/images/home/youtube1.png" alt="" />
            </a>
          </div>
        </li>
      </ul>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setToken } from "@/utils/auth";
import Hint from "@/components/Hint";
import SelectLang from "./SelectLang";
import { connect } from "@/walletConnect/provideModal";
import { Popover } from "ant-design-vue";
import { viewePdf } from "@/utils/base.js";
export default {
  components: {
    Hint,
    SelectLang,
    Popover,
  },
  data() {
    return {
      mobileOpen: false,
      navList: [
        { label: this.$t("首页"), value: "/homes" },
        { label: this.$t("生态"), value: "/zoology" },
        { label: this.$t("购买与质押"), value: "/purchase" },
        { label: this.$t("TOTO预售"), value: "/presale" },
        { label: this.$t("进程"), value: "/progress" },
        { label: this.$t("动态"), value: "/dynamic" },
      ],
    };
  },
  computed: {
    ...mapGetters("Wallet", ["address"]),
  },
  watch: {
    "$i18n.locale"() {
      this.navList = [
        { label: this.$t("首页"), value: "/homes" },
        { label: this.$t("生态"), value: "/zoology" },
        { label: this.$t("购买与质押"), value: "/purchase" },
        { label: this.$t("TOTO预售"), value: "/presale" },
        { label: this.$t("进程"), value: "/progress" },
        { label: this.$t("动态"), value: "/dynamic" },
      ];
    },
  },
  created() {
    if (this.address) {
      this.$store.dispatch("Wallet/connectWalletConnect");
    }
  },
  methods: {
    viewePdf,
    linkConnect() {
      connect();
    },
    langChange(e) {
      console.log("e", e);
    },
    // 切换语言
    langSwitch() {
      if (this.$i18n.locale === "zh") {
        this.$i18n.locale = "en";
        setToken("OZFUND_LANG", "en");
      } else {
        this.$i18n.locale = "zh";
        setToken("OZFUND_LANG", "zh");
      }
    },
    clickMenu() {
      this.mobileOpen = !this.mobileOpen;
    },
    navClass(path) {
      if (
        path === "/dynamic" &&
        (this.$route.path === "/notice" || this.$route.path === "/dynamic")
      )
        return "cur";
      if (path === this.$route.path) return "cur";
    },
    navClassMobile(path) {
      if (path === this.$route.path) return "cur";
    },
    clickMobileNav() {
      this.mobileOpen = false;
    },
    // 移动端链接钱包
    mobileLineWallet() {
      // this.$refs.hint.modal = {
      //   title: this.$t('连接钱包'),
      //   type: 'connectWallet', // hint || connectWallet
      //   show: true,
      //   txt: this.$t('linkWallet'),
      //   cb: this.mobileLineWalletNext
      // }
      this.mobileLineWalletNext();
    },
    mobileLineWalletNext() {
      this.$store.dispatch("Wallet/connectWalletConnect");
      this.$refs.hint.close();
    },
    // pc端链接钱包
    pcLineWallet() {
      if (this.address) return this.pcLineWalletNext();
      this.$refs.hint.modal = {
        title: this.$t("连接钱包"),
        type: "connectWallet", // hint || connectWallet
        show: true,
        txt: this.$t("linkWallet"),
        cb: this.pcLineWalletNext,
      };
    },
    pcLineWalletNext() {
      this.$refs.hint.close();
      this.$store.dispatch("Wallet/pcConnectWallet");
      // this.$store.dispatch("Wallet/connectWalletConnect");
    },
    // 移动端断开链接
    closeMobileLineWallet() {
      this.$store.dispatch("Wallet/disconnectWallet");
    },
  },
};
</script>

<style lang="scss">
.mobile_line_wallet {
  position: fixed;
  right: 0;
  top: 80%;
  z-index: 2;
  // background: url('~@/assets/images/mobileLineBg.png') no-repeat;
  background-size: cover;
  background-color: transparent;
  border: none;
  // width: 100px;
  height: 90px;
  display: none;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
  }

  p {
    text-align: right;
    position: absolute;
    z-index: 3;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: white;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.2;
  }
}

.mobile_select_lang_w {
  position: absolute;
  right: 67px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
}

.mobile_select_lang_w .lang_list {
  right: 0px;
  left: auto;
  transform: translateX(0);

  li {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
}

@media (max-width: 768px) {
  .mobile_line_wallet {
    display: flex;
  }
}
</style>
