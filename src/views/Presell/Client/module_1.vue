<template>
  <div>
    <div class="presell_module_one">
      <div class="content-box">
        <div class="presell_module_w">
          <div class="presell_module_left">
            <h3 class="max_tit">
              {{ $t("global.toto") }}{{ $t("preSale.presale") }}
            </h3>
            <clamp :maxLines="maxLine" :content="$t('preSale.presaleInfo')" className="content" />
          </div>
          <div class="presell_module_right">
            <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/presell/gif/module1.gif')"
              alt="" />
          </div>
        </div>
      </div>
      <div class="presell_time_wrap">
        <div class="content-box presell-box">
          <div class="presell_time_info_left">
            <h3>{{ $t("preSale.presale") }}{{ $t("preSale.start") }}</h3>
            <p class="presell_time" v-html="timeHtml"></p>
          </div>
          <div class="presell_time_info_right">
            <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/presell/gif/module2.gif')"
              alt="" />
          </div>
        </div>
      </div>
    </div>
    <Conversion />
  </div>
</template>

<script>
import { langeMapShowLine } from "../../../utils/base";
import Clamp from "../../components/clamp.vue";
import Conversion from "../Conversion";
export default {
  components: {
    Conversion,
    Clamp,
  },

  data() {
    return {
      maxLine:0,
      timeHtml: null,
      endTime: 1663462800000, // 结束的时间
    };
  },
  watch:{
    '$i18n.locale':{
      handler(newVal){
        this.maxLine = langeMapShowLine(newVal)
        this.startTimer()
      },
      immediate: true
    }
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (new Date().getTime() > this.endTime) {
          clearInterval(this.timer);
          this.timeHtml = `${this.$t("preSale.progress")}`;
        } else {
          this.timeHtml = this.showTime();
        }
      }, 1000);
    },
    showTime() {
      var nowTime = new Date().getTime();
      var remianAllSeconds = Math.floor((this.endTime - nowTime) / 1000); // 剩余时间
      var remainDay = Math.floor(remianAllSeconds / (60 * 60 * 24)); // 剩余天数
      var remainHour = Math.floor((remianAllSeconds / (60 * 60)) % 24); // 剩余小时
      var remainMinute = Math.floor((remianAllSeconds / 60) % 60); // 剩余分
      var remainSecond = Math.floor(remianAllSeconds % 60); // 剩余秒
      return `<p>${remainDay}</p><i>d</i><p>${remainHour}</p><i>h</i><p>${remainMinute}</p><i>m</i><p>${remainSecond}</p><i>s</i>`;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  width: var(--content-w);
  margin: 0 auto;
}

.presell_module_one {
  background: url("../../../assets/images/purchase/module1.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.6rem;

  .presell_module_left {
    width: 4.82rem;
    padding-top: 1rem;

    h3 {
      font-family: PingFangSC-Medium;
      font-size: 0.64rem;
      color: #333;
      line-height: 0.68rem;
      font-weight: 900;
      padding-bottom: 0.24rem;
    }

    p,
    .content {
      font-family: PingFangSC-Light;
      font-size: 0.16rem;
      color: #666;
      line-height: 0.32rem;
      font-weight: 200;
      text-align: left;
    }
  }

  .presell_module_right {
    flex: 1;
    aspect-ratio: 1.22 / 1;
  }
}

.presell_module_w {
  display: flex;
  align-items: center;
  column-gap: 0.3183rem;
}

.presell_time_wrap {
  margin-top: 0.74rem;
  width: 100%;
  height: 2.3rem;
  background: linear-gradient(to bottom, transparent 50%, #fff 100%);
  border-radius: 0.25rem;
}

// margin-top: 74px;
//   width: 100%;
//   padding: 30px;

// }

.presell-box {
  display: flex;
  background: url("~@/assets/images/presell/bg1.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.0893rem 0 0.71rem;
  height: 100%;
}

.presell_time_info_left {
  h3 {
    font-family: PingFangSC-Medium;
    font-size: 0.22rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 0.13rem;
    text-align: justify;
  }

  .presell_time {
    background: #ebf6ff;
    height: 0.42rem;
    width: 1.83rem;
    border: 1px solid #0385f2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: DINNextW1G;
    font-size: 0.2rem;
    color: #0385f2;
    font-weight: 500;
    line-height: 1;
    margin-right: 0.15rem;

    p {
      font-family: DINNextW1G-Bold;
      font-size: 38px;
      color: #0385f2;
      font-weight: 700;
      line-height: 41px;
      line-height: 1;
      margin-right: 1px;
    }
  }
}

.presell_time_info_right {
  width: 47%;
}

.conversion {
  margin-top: 60px;
}
</style>
