<!--
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-19 17:27:28
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-07 11:19:30
 * @FilePath: /ozfund-mobile/src/views/Zoology/Client/module_4.vue
-->
<template>
  <div class="zoology_module_four">
    <div class="content-box">
      <div class="zoology_module_left">
        <h3 class="min_tit">{{ $t("global.auPay") }}</h3>
        <clamp className="summary" :content="$t('zoology.aupayInfo')"/>
        <!-- <p class="summary"> -->
          <!-- {{ $t("zoology.aupayInfo") }} -->
        <!-- </p> -->
      </div>
      <div class="zoology_module_right">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/zoology/gif/module4.gif')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import clamp from '../../components/clamp.vue';

export default {
  components: { clamp }
  };
</script>

<style lang="scss" scoped>
.zoology_module_four {
  padding: 0 0 0.57rem;
  .min_tit{
    margin-bottom: .24rem;
  }
  .content-box {
    display: flex;
    width: var(--content-w);
    align-items: center;
    column-gap: 0.91rem;
    margin: 0 auto;
    justify-content: center;
  }

  .zoology_module_left {
    line-height: 0.24rem;
    font-weight: 200;
    width: 5.69rem;
    font-size: 0.14rem;

    h3 {
      font-family: PingFangSC-Medium;
      font-size: 0.4rem;
      color: #333;
      line-height: 0.44rem;
      font-weight: 500;
      letter-spacing: 0;
    }

    p {
      color: #666;
      margin-top: 0.24rem;
    }
  }

  .zoology_module_right {
    width: 4.13rem;
    height: 3.54rem;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
