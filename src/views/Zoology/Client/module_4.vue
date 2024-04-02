<template>
  <div class="zoology_module_four">
    <div class="content-box">
      <div class="zoology_module_left">
        <h3 class="min_tit">{{ $t("global.auPay") }}</h3>
        <p class="summary">
          {{ $t("zoology.aupayInfo") }}
        </p>
      </div>
      <div class="zoology_module_right">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/zoology/gif/module4.gif')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.zoology_module_four {
  padding: 0 0 0.57rem;

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
      font-size: 0.4rem;
      color: #333;
      line-height: 0.44rem;
      font-weight: 500;
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
