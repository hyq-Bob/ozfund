<template>
  <div class="animate__animated animate__bounceInLeft">
    <!-- 模块一 -->
    <component :is="moduleOne" />
    <!-- 模块二 -->
    <component :is="moduleTwo" />
    <!-- 模块三 -->
    <component :is="moduleThree" />
    <!-- 模块四 -->
    <component :is="moduleFour" />
    <!-- <Hint ref="hint" /> -->
  </div>
</template>

<script>
// import Conversion from "./Conversion";
// import Chart from "./Chart";
// import { mapGetters } from 'vuex'
// import scrollGif from '@/utils/scrollGif'
// import Hint from '@/components/Hint'
// import { message } from 'ant-design-vue';
import {isMobile} from '@/utils/base'
export default {
  // components: {
    // Conversion,
    // Chart,
    // Hint
  // },
  data() {
    return {
      moduleOne: null,
      moduleTwo: null,
      moduleThree: null,
      moduleFour: null,
      // pledgeNumber: null,
      // grahpTime: [
      //   { label: "24H", value: "24H" },
      //   { label: "1W", value: "1W" },
      //   { label: "1M", value: "1M" },
      //   { label: "1Y", value: "1Y" }
      // ],
      // graphTimeKey: "24H",
      modal: {
        show: false,
        key: ""
      },
      // scroll: {
      //   moduleOne: 1,
      //   moduleTwo: 1,
      //   moduleTwoM: 1,
      //   moduleThree: 1,
      //   moduleFour: 1,
      //   moduleFourM: 1,
      //   moduleFive: 1,
      // },
      // viewMoreOneBoo: false,
      // viewMoreTwoBoo: false,
    };
  },
  // computed: {
  //   ...mapGetters('Wallet', ['ozcBalance', 'clientType', 'stakeRate', 'ozcStakeAmount', 'totoStakeAmount', 'address'])
  // },
  // watch: {
  //   'address'() {
  //     if (this.address) {
  //       this.$store.dispatch('Wallet/getOkcoinStake')
  //     }
  //   }
  // },
  created() {
    import(`@views/Purchase/${this.isMobile() ? "Mobile" : "Client"}/module_1.vue`).then(
      (res) => {
        this.moduleOne = res.default;
      }
    );
    import(`@views/Purchase/${this.isMobile() ? "Mobile" : "Client"}/module_2.vue`).then(
      (res) => {
        this.moduleTwo = res.default;
      }
    );
    import(`@views/Purchase/${this.isMobile() ? "Mobile" : "Client"}/module_3.vue`).then(
      (res) => {
        this.moduleThree = res.default;
      }
    );
    import(`@views/Purchase/${this.isMobile() ? "Mobile" : "Client"}/module_4.vue`).then(
      (res) => {
        this.moduleFour = res.default;
      }
    );
  },
  // mounted() {
  //   document.addEventListener('scroll', this.scrollChange)
  //   if (this.address) {
  //     this.$store.dispatch('Wallet/getOkcoinStake')
  //   }
  // },
  // destroyed() {
  //   document.removeEventListener('scroll', this.scrollChange)
  // },
  methods: {
    isMobile,
  //   // 查看更多
  //   viewMoreOne() {
  //     this.viewMoreOneBoo = !this.viewMoreOneBoo
  //   },
  //   viewMoreTwo() {
  //     this.viewMoreTwoBoo = !this.viewMoreTwoBoo
  //   },
  //   // scrollChange() {
  //   //   const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
  //   //   const moduleTwo = this.$refs.moduleTwo.offsetTop ? this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop : 0
  //   //   const moduleThree = this.$refs.moduleThree.offsetTop + this.$refs.moduleThree.offsetParent.offsetTop
  //   //   const moduleFour = this.$refs.moduleFour.offsetTop ? this.$refs.moduleFour.offsetTop + this.$refs.moduleFour.offsetParent.offsetTop : 0
  //   //   const moduleFive = this.$refs.moduleFive.offsetTop + this.$refs.moduleFive.offsetParent.offsetTop
  //   //   const domList = [
  //   //     { label: 'moduleOne', value: moduleOne, time: 6 },
  //   //     { label: 'moduleTwo', value: moduleTwo, time: 6 },
  //   //     { label: 'moduleThree', value: moduleThree, time: 5 },
  //   //     { label: 'moduleFour', value: moduleFour, time: 5 },
  //   //     { label: 'moduleFive', value: moduleFive, time: 4 },
  //   //   ]
  //   //   scrollGif(this, domList)
  //   // },
  //   // 冻结时间计算
  //   freezeTime() {
  //     return false
  //   },
  //   // 质押所有ozc
  //   allPledge() {
  //     this.pledgeNumber = this.ozcBalance
  //   },
  //   grahpTimeNav(value) {
  //     this.graphTimeKey = value;
  //   },
  //   pledgeOrExtract(key) {
  //     if (!this.address) return message.error(this.$t('请先连接钱包'))
  //     if (key === 'pledge' && !Number(this.ozcBalance)) return message.error('暂无OZC请先兑换')
  //     this.pledgeNumber = null
  //     this.modal = {
  //       show: true,
  //       key
  //     };
  //   },
  //   // 质押
  //   pledgeBtn() {
  //     if (this.pledgeNumber > this.ozcBalance) return message.error(this.$t('请正确输入'))
  //     // if (this.clientType === 'pc') {
  //     //   this.pcPledgeBtn()
  //     // }
  //     // if (this.clientType === 'mobile') {
  //     //   this.mobilePledgeBtn()
  //     // }
  //     this.mobilePledgeBtn()
  //   },
  //   pcPledgeBtn() {
  //     if (!this.pledgeNumber) return message.error(this.$t('请正确输入'))
  //     this.$store.dispatch('Wallet/pcStake', { unit: 'ether', amount: this.pledgeNumber, cb: this.resHint })
  //   },
  //   mobilePledgeBtn() {
  //     if (!this.pledgeNumber) return message.error(this.$t('请正确输入'))
  //     this.$store.dispatch('Wallet/mobileStake', { unit: 'ether', amount: this.pledgeNumber, cb: this.resHint })
  //   },
  //   // 提取
  //   extractBtn() {
  //     if (!Number(this.totoStakeAmount)) { // 不能提取
  //       this.closeModal()
  //       this.$refs.hint.modal =  {
  //         title: this.$t('提示信息'),
  //         type: 'hint', // hint || connectWallet
  //         status: 3, // 1是成功 2是失败 3是警告
  //         show: true,
  //         txt: this.$t('extractTxt3'),
  //         cb: null
  //       }
  //       return
  //     }
  //     // if (this.clientType === 'pc') {
  //     //   this.pcExtractBtn()
  //     // }
  //     // if (this.clientType === 'mobile') {
  //     //   this.mobileExtractBtn()
  //     // }
  //     this.mobileExtractBtn()
  //   },
  //   pcExtractBtn() {
  //     this.$store.dispatch('Wallet/pcRedemption', { cb: this.resHint2 })
  //   },
  //   mobileExtractBtn() {
  //     this.$store.dispatch('Wallet/mobileRedemption', { cb: this.resHint2 })
  //   },
  //   closeModal() {
  //     this.modal = { show: false, key: "" }
  //   },
  //   resHint(e) {
  //     this.closeModal()
  //     this.$refs.hint.modal =  {
  //       title: this.$t('提示信息'),
  //       type: 'hint', // hint || connectWallet
  //       status: e === 'success' ? 1 : 2, // 1是成功 2是失败
  //       show: true,
  //       txt: e === 'success' ? this.$t('pledgeTxt2') : this.$t('质押失败'),
  //       cb: null
  //     }
  //   },
  //   resHint2(e) {
  //     this.closeModal()
  //     this.$refs.hint.modal =  {
  //       title: this.$t('提示信息'),
  //       type: 'hint', // hint || connectWallet
  //       status: e === 'success' ? 1 : 2, // 1是成功 2是失败
  //       show: true,
  //       txt: e === 'success' ? this.$t('extractTxt2') : this.$t('提取失败'),
  //       cb: null
  //     }
  //   }
  }
};
</script>

<style scoped>
@import "~@/styles/purchase.css";
.freeze_i {
  color: #999999;
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
}
</style>
