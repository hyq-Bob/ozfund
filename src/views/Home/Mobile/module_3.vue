<template>
  <div class="home-3">
    <p class="title">{{ $t("home.investorsandPartners") }}</p>
    <p class="summary">
      {{ $t("home.investorsandPartnersInfo") }}
    </p>
    <p class="email">{{ $t("home.linkEmail") }}</p>
    <van-button class="contact" type="info">{{ $t("home.contactUs") }}</van-button>
    <SwiperComp  className="swiper-box"/>
  </div>
</template>

<script>
import SwiperComp from "../Swiper";
export default {
  components: {
    SwiperComp,
  },
};
</script>

<style lang="scss" scoped>
.home-3 {
  font-family: PingFangSC-Medium;
  min-height: 13.54rem;
  background-image: url("./imgs/partner.svg");
  background-repeat: no-repeat;
  // background-size: contain;
  background-size: cover;
  .title {
    padding-top: 1.13rem;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  .summary,
  .email {
    padding: 0 0.4rem;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
  }
  .contact {
    height: 0.88rem;
    width: 2.66rem;
    font-size: 0.28rem;
    color: #fff;
    background: #0385f2;
    border-radius: 0.2rem;
    margin: .3rem 0 .36rem 50%;
    transform: translateX(-50%);
  }
  .swiper-box{
    height: 8.47rem;
    padding: 0 1.05rem;
    padding-bottom: .2rem;
    box-sizing: border-box;
  }
}
</style>
