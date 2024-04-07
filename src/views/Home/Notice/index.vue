<template>
  <div :class="`notice_wrap ${className}`">
    <div v-if="noticeList.length" :class="`notice_w ${isMobile() && 'mobile'}`">
      <img class="notice_horn" src="@/assets/images/home/notice.png" alt="" />
      <div ref="swiperNotice" class="swiper swiper_notice">
        <div class="swiper-wrapper">
          <div @click="toNotice(item)" class="swiper-slide" v-for="item in noticeList" :key="item.subject">
            <p>{{ item.subject }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNotic } from "@/api/notice.js";
import { getToken } from "@/utils/auth.js";
import { setSession } from "@/utils/base";
import Swiper from "swiper/swiper-bundle.esm.js";
import "swiper/swiper-bundle.css";
import { isMobile } from "@/utils/base";
import { mapActions } from "vuex";
const langeMapping = {
  zh: 1,
  tc: 2,
  en: 3,
  jpn: 4,
};
export default {
  name: "NoticeScope",
  props: {
    className: {
      require: false,
      default: "",
    },
  },
  data() {
    return {
      noticeList: [],
    };
  },
  watch: {
    "$i18n.locale"() {
      this.getPageData();
    },
  },
  created() {
    this.getPageData()
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.noticeSwiper();
      }, 1000)
    });
  },
  methods: {
    isMobile,
    ...mapActions("Nav", ["setNavModuleFlag"]),
    noticeSwiper() {
      new Swiper(".swiper_notice", {
        loop: true,
        autoplay: {
          delay: 2000,
          pauseOnMouseEnter: true,
        },
        direction: "vertical",
      });
      // mySwiper.el.onmouseover = function () {
      //   mySwiper.autoplay.stop();
      // };
      // mySwiper.el.onmouseout = function () {
      //   mySwiper.autoplay.start();
      // };
    },
    async getPageData() {
      let { data } = await getNotic({
        pageNo: 1,
        pageSize: 100,
      });
      let { data: dataInfo } = data || {};
      let filterInfo = dataInfo.data.filter(
        (item) => item.language == langeMapping[getToken("OZFUND_LANG")]
      );
      this.noticeList = filterInfo;
    },
    toNotice() {
      setSession("nav-site", "notice");
      this.setNavModuleFlag({ value: "notice" });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice_w {
  display: flex;
  width: var(--content-w);
  height: 0.6rem;
  background: #ffffff;
  box-shadow: 0px 0px 20px 10px rgba(3, 133, 242, 0.03);
  border-radius: 0.12rem;
  padding: 0.15rem;
  margin: 0 auto;

  &.mobile {
    height: 0.8rem;
    padding: 0.26rem 0.2rem;
    width: 100%;

    .notice_horn {
      width: 0.34rem;
      height: 0.34rem;
      aspect-ratio: 1 / 1;
      margin-right: 0.2rem;
      object-fit: contain;
    }

    .swiper {
      p {
        font-size: 0.24rem;
        line-height: 1;
      }
    }
  }

  .notice_horn {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .swiper {
    height: 100%;
    width: 100%;
    padding: 0 !important;

    p {
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #333;
      line-height: 30px;
    }
  }
}
</style>
