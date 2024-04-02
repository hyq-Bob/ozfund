<template>
  <div class="_exchange">
  <component :is="compName" />
</div>
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
<style scoped>
._exchange{
  width: 100%;
  background: #fff;
}
</style>
