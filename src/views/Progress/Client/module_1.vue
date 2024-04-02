<template>
  <div class="progress_module_one">
    <div class="content-box">
      <div class="progress_module_left">
        <h3>{{ $t("process.timeLine") }}</h3>
      </div>
      <div class="progress_module_right">
        <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/progress/gif/module1.gif')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.progress_module_one {
  background: url("../../../assets/images/progress/bg1.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.6rem;

  .content-box {
    display: flex;
    width: var(--content-w);
    margin: 0 auto;
    justify-content: center;
  }

  .progress_module_left {
    h3 {
      font-family: PingFangSC-Medium;
      font-size: 0.56rem;
      color: #333;
      white-space: nowrap;
      line-height: 0.68rem;
      font-weight: 900;
      margin-top: 1.37rem;
    }
  }

  .progress_module_right {
    width: 7.9793rem;
    height: 5.79rem;
    margin-top: -0.2rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
