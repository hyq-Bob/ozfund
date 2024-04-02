<template>
  <div class="animate__animated animate__bounceInLeft">
    <!-- 模块一 -->
    <component :is="moduleOne" />
    <!-- 模块二 -->
    <component :is="moduleTwo" />
    <!-- 模块三 -->
    <component :is="moduleThree" />
   
  </div>
</template>

<script>
import { isMobile } from "@/utils/base";
export default {
  data() {
    return {
      moduleOne: null,
      moduleTwo: null,
      moduleThree: null,
    };
  },
 
  created() {
    import(`@views/Notice/${this.isMobile() ? "Mobile" : "Client"}/module_1.vue`).then(
      (res) => {
        this.moduleOne = res.default;
      }
    );
    import(`@views/Notice/${this.isMobile() ? "Mobile" : "Client"}/module_2.vue`).then(
      (res) => {
        this.moduleTwo = res.default;
      }
    );
    import(`@views/Dynamic/${this.isMobile() ? "Mobile" : "Client"}/module_3.vue`).then(
      (res) => {
        this.moduleThree = res.default;
      }
    );
  },
  methods: {
    isMobile
  }
};
</script>
