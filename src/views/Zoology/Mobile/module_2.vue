<template>
  <div class="zoology-module_2">
    <div class="img">
      <!-- <img src="./imgs/dog.png" /> -->
      <img v-animation :data-gif_url="require('@/assets/images/home/gif/moduleTwo.gif')" alt="" />
    </div>
    <p class="title">{{ $t('global.ozbet') }}</p>
    <Clamp className="info" :content='$t("zoology.ozbetInfo")' />
    <!-- <span class="info">{{ $t("zoology.ozbetInfo") }}</span> -->
    <button class="btn" @click="goOzbet">
      <span>{{ $t("zoology.clickIn") }} {{ $t("global.ozbet") }}</span>
      <arrowIcon />
    </button>
  </div>
</template>

<script>
import logicModule from "../logic";
export default {
  ...logicModule
};
</script>

<style lang="scss" scoped>
.zoology-module_2 {
  background: #fff;
  padding: 0 0.4rem;

  .img {
    width: 4.7376rem;
    height: 4.04rem;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    width: 1.35rem;
    height: 0.8rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.8rem;
    font-weight: 500;
    margin: 0.3rem auto 0;
  }

  .info {
    height: 2.94rem;
    font-family: PingFangSC-Light;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
  }

  .btn {
    font-family: PingFangSC-Regular;
    display: flex;
    min-width: 3.3rem;
    height: 0.88rem;
    background: #ffc200;
    border-radius: 0.2rem;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 0.28rem;
    margin: 0.4rem auto 0.32rem;
    padding: 0 0.16rem;
    column-gap: 0.3rem;
    color: #fff;

    span {

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
