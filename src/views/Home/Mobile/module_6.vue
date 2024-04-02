<template>
  <div class="home-6">
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
.home-6 {
  margin-top: 0.4rem;
  padding: 0 0.3rem .84rem;
}
</style>
