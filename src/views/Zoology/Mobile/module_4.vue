<template>
  <div class="zoology_module_4">
    <div class="img">
      <!-- <img src="@/assets/images/zoology/gif/module4.png" alt="" /> -->
      <img v-animation :data-gif_url="require('@/assets/images/zoology/gif/module4.gif')" alt="" />
    </div>
    <p class="title">{{ $t('global.auPay') }}</p>
    <!-- <p class="info">
      {{ $t("zoology.aupayInfo") }}
    </p> -->
    <clamp :content='$t("zoology.aupayInfo")' className="info" />
    <div class="link-box">
      <WebSiteLinkItem :webSiteLinkCut="webSiteLinkCut" />
    </div>
  </div>
</template>

<script>
import WebSiteLinkItem from "@/views/components/render-item_link.vue";
import Clamp from '../../components/clamp.vue';
import { webSiteLinkCut } from "@/assets/js/webSiteLink.js";
export default {
  components: {
    WebSiteLinkItem,
    Clamp
  },
  data() {
    return {
      webSiteLinkCut
    };
  },
};
</script>

<style lang="scss" scoped>
.zoology_module_4 {
  padding: 0 0.4rem;

  .img {
    width: 4.13rem;
    height: 3.54rem;
    margin: 0 auto;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    height: 0.8rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 500;
    margin-top: 0.4rem;
  }

  .info {
    // min-height: 3.36rem;
    font-family: PingFangSC-Light;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin-top: 0.2rem;
  }

  .link-box {
    padding: 0.5rem 0;
  }
}
</style>
