<template>
  <div class="zoology_module_one">
    <div class="content-box">
      <div class="zoology_module_left">
        <!-- <h3>
          <p v-html="$t('zoology.title')"></p>
        </h3> -->
        <div class="img-box">
          <img src="@/views/Home/imgs/compositon.png" alt="">
        </div>
        <p class="detail">
          {{ $t("zoology.info") }}
        </p>
      </div>
      <div class="zoology_module_right">
        <img
          v-animation
          class="page_png"
          :data-gif_url="require('@/assets/images/zoology/gif/module1.gif')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.zoology_module_one {
  padding-top: 0.6rem;
  padding: 0.56rem;
  background: url("../../../assets/images/zoology/module1.png") no-repeat;
  background-size: 100% 100%;
  svg {
    font-family: AppleSystemUIFont;
    font-size: 64px;
    color: #333333;
    letter-spacing: 0;
    line-height: 68px;
    font-weight: 400;
  }
  .content-box {
    display: flex;
    column-gap: 1.15rem;
    width: var(--content-w);
    margin: 0.36rem auto 0;

    .zoology_module_right {
      padding-top: 0.3rem;
      width: 6.95rem;
      height: 7.0228rem;
    }

    .zoology_module_left {
      margin-top: calc(1.28rem - 0.36rem);

      h3 {
        font-family: AppleSystemUIFont;
        font-size: 0.64rem;
        color: #333;
        letter-spacing: 0;
        line-height: 0.68rem;
        font-weight: 400;
        margin-bottom: 0.24rem;

        // > p {
        //   white-space: nowrap;
        // }
      }
      .img-box{
        width: 5.17rem;
        height: 1.36rem;
        margin-bottom: 24px;
        >img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .detail {
        font-family: PingFangSC-Light;
        font-size: 0.16rem;
        color: #333;
        // letter-spacing: 0;
        line-height: 0.32rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
      }
    }
  }
}
</style>
