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
    <!-- 模块五 -->
    <component :is="moduleFive" />
    <!-- 模块六 -->
    <component :is="moduleSix" />
    <!-- <Hint ref="hint" /> -->
  </div>
</template>

<script>
import { isMobile } from "@/utils/base";
import { mapGetters } from "vuex";
import viewePdf from "@/views/pdfViewer/index.vue";
// import scrollGif from "@/utils/scrollGif";
// import Hint from "@/components/Hint";
// import Notice from "./Notice";
export default {
  components: {
    viewePdf
    // Hint,
    // Notice,
  },
  data() {
    return {
      moduleOne: null,
      moduleTwo: null,
      moduleThree: null,
      moduleFour: null,
      moduleFive: null,
      moduleSix: null,
      // 1未动  2正在动 3已动
      // scroll: {
      //   moduleOne: 1,
      //   moduleTwo: 1,
      //   moduleTwoM: 1,
      //   moduleThree: 1,
      //   moduleFour: 1,
      // },
    };
  },
  created() {
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_1.vue`).then(
      (res) => {
        this.moduleOne = res.default;
      }
    );
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_2.vue`).then(
      (res) => {
        this.moduleTwo = res.default;
      }
    );
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_3.vue`).then(
      (res) => {
        this.moduleThree = res.default;
      }
    );
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_4.vue`).then(
      (res) => {
        this.moduleFour = res.default;
      }
    );
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_5.vue`).then(
      (res) => {
        this.moduleFive = res.default;
      }
    );
    import(`@views/Home/${this.isMobile() ? "Mobile" : "Client"}/module_6.vue`).then(
      (res) => {
        this.moduleSix = res.default;
      }
    );
  },
  computed: {
    ...mapGetters("Wallet", ["totoBalance", "clientType"]),
  },

  // destroyed() {
    // document.removeEventListener("scroll", this.scrollChange);
  // },
  methods: {
    isMobile,
    // scrollChange() {
    //   const moduleOne =
    //     this.$refs.moduleOne.offsetTop +
    //     this.$refs.moduleOne.offsetParent.offsetTop;
    //   const moduleTwo = this.$refs.moduleTwo.offsetTop
    //     ? this.$refs.moduleTwo.offsetTop +
    //       this.$refs.moduleTwo.offsetParent.offsetTop
    //     : 0;
    //   // const moduleTwoM = this.$refs.moduleTwoM.offsetTop ? this.$refs.moduleTwoM.offsetTop + this.$refs.moduleTwoM.offsetParent.offsetTop : 0
    //   const homeModuleThree =
    //     this.$refs.homeModuleThree.offsetTop +
    //     this.$refs.homeModuleThree.offsetParent.offsetTop;
    //   const moduleFour =
    //     this.$refs.moduleFour.offsetTop +
    //     this.$refs.moduleFour.offsetParent.offsetTop;
    //   const domList = [
    //     { label: "moduleOne", value: moduleOne, time: 8 },
    //     { label: "moduleTwo", value: moduleTwo, time: 6 },
    //     // { label: 'moduleTwoM', value: moduleTwoM, time: 6 },
    //     { label: "moduleThree", value: homeModuleThree, time: 5 },
    //     { label: "moduleFour", value: moduleFour, time: 4 },
    //   ];
    //   scrollGif(this, domList);
    // },
  },
};
</script>

<style scopet>
/* @import "~@/styles/home.css"; */
</style>
