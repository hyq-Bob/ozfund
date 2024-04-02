<template>
  <div ref="swiperRefs" :class="`swiper ${className}`">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiperList" :key="item.img">
        <img :src="item.img" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  props: {
    className: {
      require: false,
      default: "",
    },
    swiperList: {
      require: true,
      default: () => [],
    },
    options: {
      require: false,
      default: () => ({}),
    },
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiperRefs, this.options);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.swiper-slide {
  box-shadow: 0 0 10px 0 rgba(3, 133, 242, 0.15);
  display: grid;
  place-items: center;
  border-radius: 0.1rem;
  padding: .2rem;
  // width: 2.25rem  !important;
  // height: 2.25rem !important;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.swiper-free-mode > .swiper-wrapper {
  padding: .1rem;
  transition-timing-function: linear !important;
  box-sizing: border-box;
}
</style>
