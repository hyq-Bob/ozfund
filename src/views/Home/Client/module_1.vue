<template>
  <div class="home_module_one">
    <div class="w">
      <div class="home_module_left img-box">
        <img src="@/views/Home/imgs/Somewhere.png" alt="">
        <p>{{ $t("home.summary") }}</p>
      </div>
      <div class="home_module_right">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/home/gif/moduleOne.gif')" alt="" />
      </div>
    </div>
    <div class="_notice">
      <Notice className="_reset-notice" />
    </div>
  </div>
</template>

<script>
import Notice from "../Notice";
export default {
  components: {
    Notice,
  },
};
</script>
<style lang="scss" scoped>
._notice {
  position: absolute;
  bottom: -0.6rem;
  height: 2rem;
  width: 100%;
  background-image: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 61%);

  ._reset-notice {
    position: absolute;
    width: var(--content-w);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.home_module_one {
  position: relative;
  padding-top: 0.6rem;
  background-image: url("../imgs/module1.svg");
  background-repeat: no-repeat;
  background-size: 100%;

  // background: url("~@/assets/images/home/module1.png") no-repeat;
  // background-size: cover;
  .w {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.7rem;
    padding-bottom: 0.8rem;
  }

  .home_module_left {
    &.img-box{
        width: 4.56rem;
        height: 1.36rem;
        >img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    h3 {
      font-family: DINNextW1G;
      font-size: 0.64rem;
      color: #333;
      line-height: 0.68rem;
    }

    p {
      font-size: 0.16rem;
      color: #222;
      letter-spacing: 0;
      line-height: 0.2rem;
      margin: 0.24rem 0 0.15rem;
    }

    span {
      font-size: 0.14rem;
      color: #666;
      letter-spacing: 0;
      line-height: 0.24rem;
      font-weight: 200;
      display: block;
      text-align: justify;
    }
  }

  .home_module_right {
    position: relative;
    width: 48%;
    z-index: 88;
  }
}
</style>
