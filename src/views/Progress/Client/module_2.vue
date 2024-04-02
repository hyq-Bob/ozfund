<template>
  <div class="progress_module_two">
    <div class="content-box">
      <div class="time-axis">
        <ul>
          <li
            v-for="(item, index) in timeAxisInfo"
            :key="item.createTime"
            :class="[index % 2 ? 'even' : 'odd']"
          >
            <template v-if="index % 2">
              <img
                v-if="index + 1 != timeAxisInfo.length"
                class="time-axis_bg"
                src="../imgs/time-line.png"
              />
              <div class="info">
                <p>{{ item.time }}</p>
                <p class="title">{{ item.subject }}</p>
                <p>{{ item.content || "--" }}</p>
              </div>
              <span class="line">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span></span>
            </template>
            <template v-else>
              <img
                v-if="index + 1 != timeAxisInfo.length"
                class="time-axis_bg"
                src="../imgs/time-line.png"
              />
              <span></span>
              <span class="line">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <div class="info">
                <p>{{ item.time }}</p>
                <p class="title">{{ item.subject }}</p>
                <p>{{ item.content || "--" }}</p>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import logicModule from '../logic'
export default {
  ...logicModule
};
</script>

<style lang="scss" scoped>
$line-w: (
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem,
  1.85rem
);
.progress_module_two {
  position: relative;
  padding-top: 1.045rem;
  background: url(../imgs/bg.svg) no-repeat;
  background-size: 100%, 100%;
  background-position-y: -5.1rem;
}
.mask {
  position: absolute;
  width: 100%;
  height: 1rem;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #fff 100%);
}
.content-box {
  width: var(--content-w);
  margin: 0 auto;
  overflow-x: hidden;
}

.time-axis {
  position: relative;
  // min-height: 15.02rem;

  .time-axis_bg {
    position: absolute;
    width: 100px;
    height: 100%;
    top: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    // background: url(../imgs/site.svg) no-repeat;
    // background-size: 100% 100%;
  }
  .even {
    .time-axis_bg {
      left: 41.7%;
      transform: rotateY(-180deg) translateX(-50%);
    }
  }
  .l {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .c {
    display: block;
    height: 2px;
    background: #aaa;
  }

  .b-c {
    display: inline-block;
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(3, 133, 242, 0.07);
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 50%;
  }

  .s-c {
    display: inline-block;
    background: #aaa;
    width: 0.14rem;
    height: 0.14rem;
    border-radius: 50%;
  }

  ul {
    @for $i from 1 through length($line-w) {
      $item: nth($line-w, $i);

      @if ($i ==2) {
        li:nth-child(#{$i}) .line {
          @extend .l;

          i:nth-child(1) {
            @extend .b-c;
          }

          i:last-child {
            @extend .s-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      } @else if($i ==4) {
        li:nth-child(#{$i}) .line {
          @extend .l;

          i:nth-child(1) {
            @extend .b-c;
          }

          i:last-child {
            @extend .s-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      } @else if($i ==6) {
        li:nth-child(#{$i}) .line {
          @extend .l;

          i:nth-child(1) {
            @extend .b-c;
          }

          i:last-child {
            @extend .s-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      } @else if($i ==8) {
        li:nth-child(#{$i}) .line {
          @extend .l;

          i:nth-child(1) {
            @extend .b-c;
          }

          i:last-child {
            @extend .s-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      } @else if($i ==10) {
        li:nth-child(#{$i}) .line {
          @extend .l;

          i:nth-child(1) {
            @extend .b-c;
          }

          i:last-child {
            @extend .s-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      } @else {
        li:nth-child(#{$i}) .line {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          i:nth-child(1) {
            @extend .s-c;
          }

          i:last-child {
            @extend .b-c;
          }

          i:nth-child(2) {
            @extend .c;
            width: $item;
          }
        }
      }
    }

    li {
      position: relative;
      display: grid;
      grid-template-columns: 4.3rem auto 4.3rem;
      align-items: baseline;
      min-height: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      // margin-top: -10px;
      z-index: 2;
      &:not(:first-child) {
        margin-top: -8px;
      }
      .info-f {
        p {
          &:first-child {
            font-family: PingFangSC-Medium;
            font-size: 0.24rem;
            color: #333;
            letter-spacing: 0;
            font-weight: 500;
            margin-bottom: 0.15rem;
          }
          &.title{
            font-family: PingFangSC-Regular;
            font-size: 0.18rem;
            color: #666;
            letter-spacing: 0;
            line-height: 0.26rem;
            font-weight: 400;
          }
          &:last-child {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666;
            letter-spacing: 0;
            line-height: 0.26rem;
            font-weight: 400;
          }
        }
      }

      &.even {
        .info {
          text-align: right;
          margin-right: 0.36rem;
          @extend .info-f;
        }
      }

      &.odd {
        .info {
          margin-left: 0.36rem;
          @extend .info-f;
        }
      }
    }
  }
}
</style>
