<template>
  <div class="purchase-module_4">
      <WebSiteLinkItem :webSiteLinkCut="webSiteLinkCut"/>
  </div>
</template>

<script>
import WebSiteLinkItem from "@/views/components/render-item_link.vue";
import { webSiteLinkCut } from "@/assets/js/webSiteLink.js";
export default {
  name: "WebSiteLink",
  components:{
    WebSiteLinkItem
  },
  data() {
    return {
      webSiteLinkCut
    };
  },
};
</script>

<style lang="scss" scoped>
.purchase-module_4 {
  margin-top: 0.6rem;
  padding: 0 0.3rem .84rem;
}
</style>
