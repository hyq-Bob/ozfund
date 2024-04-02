<template>
  <div class="progress-module_1">
    <div class="bg-icon">
      <div class="icon">
        <img v-animation :data-gif_url="require('@/assets/images/progress/gif/module1.gif')" alt="" />
      </div>
    </div>
    <div class="time-box">
      <p class='time-line'>{{ $t("process.timeLine") }}</p>
      <div class="event-link">
        <ul>
          <li v-for="item in timeAxisInfo" :key="item.time">
            <div class="icon_title">
              <i class="dot-s"></i>
              <i class="line"></i>
              <i class="dot-b"></i>
              <span class="time">{{ item.time }}</span>
            </div>
            <label>{{ item.subject }}</label>
            <p class="summary">{{ item.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logicModule from "../logic";
export default {
  ...logicModule
}
</script>

<style lang="scss" scoped>
.progress-module_1 {
  .bg-icon {
    height: 5.3rem;
    width: 100%;
    background: url(./imgs/bg-1.svg) no-repeat;
    background-size: 100%, 100%;
  }

  // height:15.5rem;
  .icon {
    // background: url(./imgs/logo.svg) no-repeat;
    width: 100%;
    height: 4.4rem;

    // background-position: 0;
    // background-size: 100%, 100%;
    img {
      object-fit: contain;
    }
  }

  .time-box {
    background: url(./imgs/time_bg.svg) no-repeat;
    width: 100%;
    min-height: 4.56rem;
    max-height: 856px;
    background-size: 100%, 100%;
    padding-top: .85rem;
    margin-top: -.55rem;
  }

  .time-line {
    font-family: PingFangSC-Medium;
    font-size: 0.42rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.68rem;
    font-weight: 500;
    padding-left: 0.3rem;
  }

  .event-link {
    margin-top: 0.365rem;
    max-height: 5.62rem;
    padding: 0 0.3rem;
    overflow: auto;

    >ul {
      li {
        position: relative;
        padding-top: 0.25rem;
        border-left: 2px dashed #e5f3ff;

        .icon_title {
          display: flex;
          align-items: center;
          margin-left: -0.07rem;

          .dot-s {
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            background: #aaa;
            border-radius: 50%;
          }

          .line {
            display: inline-block;
            width: 0.4rem;
            height: 0.02rem;
            background: #aaa;
          }

          .dot-b {
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            background: #fff;
            box-shadow: 0px 0px 10px 3px rgba(3, 133, 242, 0.07);
            border-radius: 50%;
          }

          .time {
            font-family: PingFangSC-Medium;
            height: 0.4rem;
            font-size: 0.28rem;
            color: #333;
            letter-spacing: 0;
            text-align: center;
            font-weight: 500;
            margin-left: 0.2rem;
          }
        }

        .summary {
          font-family: PingFangSC-Regular;
          margin-left: 1.04rem;
          margin-top: 0.1rem;
          font-size: 22px;
          color: #666;
          letter-spacing: 0;
          text-align: justify;
          height: 0.26rem;
          line-height: 0.3rem;
          font-weight: 400;
        }

        label {
          display: inline-block;
          font-family: PingFangSC-Regular;
          margin-left: 1.04rem;
          margin-top: 0.1rem;
          font-size: 0.26rem;
          color: #666;
          letter-spacing: 0;
          text-align: justify;
          height: 0.26rem;
          line-height: 0.3rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>