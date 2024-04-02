<template>
  <div class="home_1">
    <div>
      <div class="img-box">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/home/gif/moduleOne.gif')" alt="" />

        <!-- <img src="@/assets/images/home/gif/moduleOne.gif" alt="" /> -->
      </div>
      <p class="summary-en">{{ $t("home.anyWhere") }}<br />{{ $t("home.rainball") }}</p>
      <p class="summary-zn">
        {{ $t("home.summary") }}
      </p>
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
  background-image: linear-gradient(to bottom,
      transparent 0,
      #ffffff 50%);

  ._reset-notice {
    position: absolute;
    width: calc(100% - .6rem);
    bottom: .08rem;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    box-sizing: border-box;
  }
}

.home_1 {
  position: relative;
  background-image: linear-gradient(54deg,
      #a6cbff 0%,
      #e5e9ff 19%,
      #f2fffb 56%,
      #ebeff9 76%,
      #dee7ff 100%,
      #dee7ff 100%,
      #dee7ff 100%);
  padding-bottom: .8rem;

  .img-box {
    margin: 0 1.26rem 0.6rem;
    box-sizing: border-box;

    img {
      width: 100%;
    }
  }

  .summary-en {
    font-family: DINNextW1G;
    font-size: 0.74rem;
    color: #333;
    text-align: center;
    white-space: nowrap;
    font-weight: 900;
    margin-bottom: 0.3rem;
    line-height: 1;
  }

  .summary-zn {
    display: flex;
    font-family: PingFangSC-Light;
    justify-content: space-between;
    max-width: 6.4rem;
    font-size: 0.28rem;
    min-height: .84rem;
    color: #222;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
