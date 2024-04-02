<template>
  <div class="presell-module_1">
    <div class="img">
      <!-- <img src="../../../assets/images/presell/gif/module1.png" alt="" /> -->
      <img v-animation :data-gif_url="require('@/assets/images/presell/gif/module1.gif')" alt="" />
    </div>
    <p class="title">{{ $t('preSale.presale') }}</p>
    <!-- <p class="info" v-html="$t('preSale.presaleInfo')"></p> -->
    <clamp :content='$t("preSale.presaleInfo")' className="info" />
    <!-- <span class="more">{{ $t('purchaseAndPledge.seeMore') }}>></span> -->
    <div class="sell-time">
      <div class="time-box">
        <p>
          {{ $t('preSale.presale') }}{{ $t('preSale.start') }}
        </p>
        <div class="presell_time" v-html="timeHtml"></div>
      </div>
      <div class="data-info">
        <img v-animation :data-gif_url="require('@/assets/images/presell/gif/module2.gif')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    Clamp,
  },
  data() {
    return {
      timeHtml: null,
      endTime: 1663462800000, // 结束的时间
    };
  },
  created() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timer = setTimeout(() => {
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
      // var remainSecond = Math.floor(remianAllSeconds % 60); // 剩余秒
      this.timeHtml = `<p class='time'>${Math.abs(remainDay)}</p>
              <i class='unit'>d</i>
              <p class='time'>${Math.abs(remainHour)}</p>
              <i class='unit'>h</i>
              <p class='time'>${Math.abs(remainMinute)}</p>
              <i class='unit'>m</i>
             `;
    },
  },
};
</script>
<style lang="scss">
.presell_time {
  align-items: baseline;

  .time {
    font-family: DINNextW1G-Bold;
    font-size: 0.38rem;
    line-height: 0.38rem;
    color: #0385f2;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 700;
  }

  .unit {
    font-family: DINNextW1G-Medium;
    font-size: 0.2rem;
    color: #0385f2;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 500;
    margin-right: 0.15rem;
    // margin-left: .05rem;
  }
}
</style>
<style lang="scss" scoped>
.presell-module_1 {
  background: url("./imgs/bg_1.svg") no-repeat;
  background-size: 100%, 100%;
  // background-position: 0;
  padding: 0.3rem;

  .img {
    width: 6.4828rem;
    height: 5.32rem;
    margin: 0 auto;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.68rem;
    font-weight: 500;
    margin-top: 0.1rem;
  }

  .info {
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin-top: 0.3rem;
    padding: 0 0.25rem;
  }

  .more {
    font-family: PingFangSC-Light;
    display: flex;
    justify-content: center;
    height: 0.37rem;
    font-size: 0.26rem;
    color: #0385f2;
    letter-spacing: 0;
    text-align: center;
    font-weight: 200;
    margin-top: 0.1rem;
  }

  .sell-time {
    display: flex;
    background: url("./imgs/sell_bg.svg") no-repeat;
    background-size: 100%, 100%;
    background-position: 0;
    height: 2.3202rem;
    margin-top: 0.4rem;
    align-items: center;
    justify-content: center;
    column-gap: 0.58rem;
    padding: 0 0.5rem 0 0.71rem;
  }

  .time-box {
    flex-shrink: 0;

    &:first-child {
      font-family: PingFangSC-Medium;
      height: 0.37rem;
      font-size: 0.26rem;
      color: #333;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 500;
      margin-bottom: 0.1rem;
    }
  }

  .presell_time {
    display: flex;
    min-width: 1.83rem;
    height: 0.4rem;
    background: #ebf6ff;
    border: 1px solid rgba(3, 133, 242, 1);
    border-radius: 0.05rem;
    color: #0385f2;
    justify-content: center;
  }
}
</style>
