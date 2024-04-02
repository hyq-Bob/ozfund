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
  </div>
</template>

<script>
// import scrollGif from '@/utils/scrollGif'
import { isMobile } from '@/utils/base'
  export default {
    data() {
      return {
        moduleOne: null,
        moduleTwo: null,
        moduleThree: null,
        moduleFour: null,
        // scroll: {
        //   moduleOne: 1,
        //   moduleTwo: 1,
        //   moduleTwoM: 1,
        //   moduleThree: 1,
        //   moduleFour: 1,
        // }
      }
    },
    created() {
    import(`@views/Zoology/${this.isMobile() ? "Mobile" : "Client"}/module_1.vue`).then(
      (res) => {
        this.moduleOne = res.default;
      }
    );
    import(`@views/Zoology/${this.isMobile() ? "Mobile" : "Client"}/module_2.vue`).then(
      (res) => {
        this.moduleTwo = res.default;
      }
    );
    import(`@views/Zoology/${this.isMobile() ? "Mobile" : "Client"}/module_3.vue`).then(
      (res) => {
        this.moduleThree = res.default;
      }
    );
    import(`@views/Zoology/${this.isMobile() ? "Mobile" : "Client"}/module_4.vue`).then(
      (res) => {
        this.moduleFour = res.default;
      }
    );
  },

    mounted() {
      // document.addEventListener('scroll', this.scrollChange)
    },
    destroyed() {
      // document.removeEventListener('scroll', this.scrollChange)
    },
    methods: {
      isMobile,
      // scrollChange() {
      //   const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
      //   const moduleTwo = this.$refs.moduleTwo.offsetTop ? this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop : 0
      //   // const moduleTwoM = this.$refs.moduleTwoM.offsetTop ? this.$refs.moduleTwoM.offsetTop + this.$refs.moduleTwoM.offsetParent.offsetTop : 0
      //   const moduleThree = this.$refs.moduleThree.offsetTop + this.$refs.moduleThree.offsetParent.offsetTop
      //   const moduleFour = this.$refs.moduleFour.offsetTop + this.$refs.moduleFour.offsetParent.offsetTop
      //   const domList = [
      //     { label: 'moduleOne', value: moduleOne, time: 5 },
      //     { label: 'moduleTwo', value: moduleTwo, time: 5 },
      //     // { label: 'moduleTwoM', value: moduleTwoM, time: 5 },
      //     { label: 'moduleThree', value: moduleThree, time: 5 },
      //     { label: 'moduleFour', value: moduleFour, time: 5 },
      //   ]
      //   scrollGif(this, domList)
      // }
    }
  }
</script>

<style scoped>
@import "~@/styles/zoology.css";
</style>
