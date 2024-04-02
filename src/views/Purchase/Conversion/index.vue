<template>
  <component :is="compName" />
</template>

<script>
import { isMobile } from "@/utils/base.js";
export default {
  data() {
    return {
      compName: null
    }
  },
  created() {
    import(`./${this.isMobile() ? 'Mobile' : "Client"}.vue`).then(res => {
      this.compName = res.default
    })
  },
  methods:{
    isMobile
  }
}
</script>
