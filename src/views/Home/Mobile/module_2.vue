<template>
  <div class="home-2">
    <div class="img-box">
      <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/home/gif/moduleTwo.gif')" alt="" />
    </div>
    <p class="title">{{ $t("home.foundation") }}</p>
    <clamp :content='$t("home.info")' className="summary" />
    <!-- <p class="summary">
      {{ $t("home.info") }}
    </p> -->
    <p class="address">{{ $t("home.webSite") }}</p>
    <div class="btn-box">
      <div class="btn-item" @click="viewePdf.call(this,'Oz-White-Paper.pdf')">
        <span class="name">{{ $t("home.view") }}{{ $t("home.whitePaper") }}</span>
        <div class="icon">
          <arrowIcon />
        </div>
      </div>
      <div class="btn-item">
        <span class="name">{{ $t("home.view") }}{{ $t("home.auditReport") }}</span>
        <div class="icon">
          <arrowIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { viewePdf } from "@/utils/base.js";
import arrowIcon from "@/views/components/arrow.vue";
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    arrowIcon,
    Clamp,
  },
  methods: { viewePdf },
};
</script>

<style lang="scss" scoped>
.home-2 {
  font-family: PingFangSC-Medium;
  margin-top: 1.32rem;
  background: #fff;

  .img-box {
    padding: 0 1.4rem;

    img {
      width: 100%;
    }
  }

  .title {
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    font-weight: bolder;
    padding: 0.2rem 0;
  }

  .summary,
  .address {
    padding: 0 0.4rem;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
  }

  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    margin: 0.6rem 0 0.3rem;

    .btn-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.88rem;
      width: 2.66rem;
      border-radius: 0.2rem;
      column-gap: 0.3rem;
      padding: 0 0.1rem;
      background: #fff;
      border: 1px solid rgba(255, 194, 0, 1);

      &:hover {
        background: #ffc200;

        .name,
        .icon {
          color: #fff;
        }
      }
    }

    .name {
      font-size: 0.28rem;
      color: #ffc200;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      border-radius: 50%;
      width: 0.36rem;
      height: 0.36rem;
      color: #ffc200;
    }
  }
}
</style>
