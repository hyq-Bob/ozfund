<template>
  <div class="zoology-module_3">
    <p class="title">{{ $t("global.ozcoin") }}({{ $t("global.ozc") }})</p>
    <!-- <span class="info">{{ $t("zoology.ozcInfo") }}</span> -->
    <clamp :content='$t("zoology.ozcInfo")' className="info" />
    <div class="img">
      <!-- <img src="../../../assets/images/zoology/gif/module3.png" alt="" /> -->
      <img v-animation :data-gif_url="require('@/assets/images/zoology/gif/module3.gif')" alt="" />
    </div>
    <p class="title toto_title">{{ $t("global.toto") }}</p>
    <clamp :content='$t("zoology.totoInfo1")' className="info"/>

    <!-- <span class="info" style="display: flex;">
      {{ $t("zoology.totoInfo1") }}
    </span>
    <span class="info" style="display: flex;">
      {{ $t("zoology.totoInfo2") }}
    </span>
    <span class="info" style="display: flex;">
      {{ $t("zoology.totoInfo3") }}
    </span> -->
  </div>
</template>

<script>
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    Clamp,
  },
};
</script>

<style lang="scss" scoped>
.zoology-module_3 {
  background: url(./imgs/bg3.svg) no-repeat;
  background-size: 100%, 100%;
  padding-top: 1.23rem;
  padding-bottom: 1.3425rem;
  min-height: 14.435rem;

  .title {
    height: 0.8rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 500;
    margin: 0 auto;
  }

  .toto_title {
    margin: 0.4rem auto 0.2rem;
  }

  .info {
    // display: flex;
    padding: 0 0.4rem;
    // height: 2.52rem;
    font-family: PingFangSC-Light;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin-top: 0.2rem;
    margin: 0 auto;
  }

  .img {
    width: 4.2rem;
    height: 2.76rem;
    margin: 0.4rem auto 0;
  }
}
</style>
