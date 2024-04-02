<template>
  <div>
    <div class="home_module_five">
      <div class="w">
        <div class="home_module_left">
          <h3>{{ $t("home.investorsandPartners") }}</h3>
          <p>
            {{ $t("home.investorsandPartnersInfo") }}
            <br />
            <a href="mailto:business@ozfund.one">{{ $t("home.linkEmail") }}</a>
          </p>
          <button>
            <a href="mailto:business@ozfund.one">{{ $t("home.contactUs") }}</a>
          </button>
        </div>
        <SwiperComp className="swiper-box"/>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperComp from "../Swiper";

export default {
  components:{
    SwiperComp
  },
};
</script>

<style lang="scss" scoped>
.home_module_five {
  height: 8rem;
  margin-top: -1.11rem;
  background: url("~@/assets/images/home/module4.png") no-repeat;
  background-size: 100%;
  background-position: left bottom;
  background-color: transparent;
  .w {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  }
  .home_module_left {
    width: 34%;
  }
  .home_module_left h3 {
    font-size: .4rem;
    color: #333;
    line-height: .44rem;
    font-weight: 500;
    margin-bottom: .24rem;
    font-family: "PingFang-Medium";
  }
  .home_module_left p {
    font-size: .14rem;
    color: #666666;
    line-height: .24rem;
    font-weight: 200;
  }
  .home_module_left p a {
    color: inherit;
  }
  .home_module_left button {
    width: 1.4rem;
    height: .47rem;
    background: #0385f2;
    border-radius: .1rem;
    font-family: PingFangSC-Medium;
    font-size: .16rem;
    color: #fff;
    font-weight: 500;
    border: none;
    margin-top: .2rem;
    cursor: pointer;
  }
  .home_module_left button a {
    color: inherit;
    width: 100%;
    height: 100%;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.swiper-box{
  width: 45%;
  height: 8.25rem;
}
</style>
