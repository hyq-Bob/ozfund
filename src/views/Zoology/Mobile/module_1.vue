<template>
  <div class="zoology_module_box">
    <div class="img">
      <!-- <img src="@/assets/images/zoology/gif/module1.png" alt="" /> -->
      <img v-animation :data-gif_url="require('@/assets/images/zoology/gif/module1.gif')" alt="" />
    </div>
    <p class="summary" v-html="$t('zoology.title')"></p>
    <p class="info">
      {{ $t("zoology.info") }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.zoology_module_box {
  background: url(./imgs/bg.svg) no-repeat;
  background-size: 100%, 100%;
  min-height: 9.88rem;

  .img {
    width: 5.11rem;
    height: 5.1593rem;
    margin: 0 auto;
    padding-top: 0.4rem;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .summary {
    width: 5.93rem;
    height: 1.6rem;
    font-family: DINNextW1G;
    font-size: 0.74rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 400;
    margin: 0.38rem auto 0;
  }

  .info {
    width: 6.4rem;
    height: 0.84rem;
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin: 0.3rem auto 0;
  }
}
</style>
