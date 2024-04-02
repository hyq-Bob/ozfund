<template>
  <div :class="`_swiper-module ${className}`">
    <templateComp
      key="leftswiper"
      :swiperList="swiperList"
      :className="leftClassName"
      :options="{
        ...baseOptions,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
      }"
    />
    <templateComp
      key="rightswiper"
      :swiperList="swiperList2"
      :className="rightClassName"
      :options="{
        ...baseOptions,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: true,
        },
      }"
    />
  </div>
</template>

<script>
import templateComp from "./template.vue";
import partner2 from "@/assets/images/partner/partner2.png";
import partner3 from "@/assets/images/partner/partner3.png";
import partner4 from "@/assets/images/partner/partner4.png";
import partner6 from "@/assets/images/partner/partner6.png";
import partner7 from "@/assets/images/partner/partner7.png";
import partner8 from "@/assets/images/partner/partner8.png";
import partner9 from "@/assets/images/partner/partner9.png";
import partner10 from "@/assets/images/partner/partner10.png";
import partner11 from "@/assets/images/partner/partner11.png";
import partner12 from "@/assets/images/partner/partner12.png";
import partner13 from "@/assets/images/partner/partner13.png";
import partner14 from "@/assets/images/partner/partner14.png";
export default {
  name: "SwiperComp",
  props: {
    rightClassName: { require: false, default: "right-box" },
    leftClassName: { require: false, default: "left-box" },
    className: { require: false, default: "" },
  },
  data() {
    return {
      swiperList: [
        { img: partner2 },
        { img: partner3 },
        { img: partner4 },
        { img: partner6 },
        { img: partner7 },
        { img: partner8 },
      ],
      swiperList2: [
        { img: partner9 },
        { img: partner10 },
        { img: partner11 },
        { img: partner12 },
        { img: partner13 },
        { img: partner14 },
      ],
      baseOptions: {
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        slidesPerGroup: 1,
        speed: 4000,
        direction: "vertical",
        watchSlidesProgress: true,
      },
    };
  },
  components: {
    templateComp,
  },
};
</script>
<style lang="scss" scoped>
._swiper-module {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 0.3rem;
  width: 100%;
  height: inherit;
}
</style>
