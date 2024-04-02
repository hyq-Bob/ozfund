<template>
  <div class="progress_module_two">
    <div class="content-box">
      <div class="time-axis">
        <span class="time-axis_bg"></span>
        <ul>
          <li v-for="(item, index) in timeAxisInfo" :key="item.time" :class="[index % 2 ? 'even' : 'odd']">
            <template v-if="index % 2">
              <div class="info">
                <p>{{ item.time }}</p>
                <p v-html="$t(item.event)"></p>
              </div>
              <span class="line">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span></span>
            </template>
            <template v-else>
              <span></span>
              <span class="line">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <div class="info">
                <p>{{ item.time }}</p>
                <p v-html="$t(item.event)"></p>
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
export default {
  data() {
    return {
      timeAxisInfo: [
        {
          time: '2022.8',
          event: 'process.timeEvent1'
        },
        {
          time: '2023.5',
          event: 'process.timeEvent2'
        },
        {
          time: '2023.6',
          event: 'process.timeEvent3'
        },
        {
          time: '2023.8',
          event: 'process.timeEvent4'
        },
        {
          time: '2023.10',
          event: 'process.timeEvent5'
        },
        {
          time: '2024.1',
          event: 'process.timeEvent6'
        },
        {
          time: '2024.6',
          event: 'process.timeEvent7'
        },
        {
          time: '2024.9',
          event: 'process.timeEvent8'
        },
        {
          time: '2025.3',
          event: 'process.timeEvent9'
        },
        {
          time: '2026.3',
          event: 'process.timeEvent10'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$line-w: (
  1.3rem,
  1.2rem,
  1.03rem,
  1.12rem,
  1.3rem,
  1.75rem,
  1.88rem,
  1.8rem,
  1.43rem,
  1.35rem
);
.progress_module_two {
  position: relative;
  padding-top: 1.045rem;
  background: url(../imgs/bg.svg) no-repeat;
  background-size: 100%, 100%;
  background-position-y: -5.1rem;
}
.mask{
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
  min-height: 15.02rem;

  .time-axis_bg {
    position: absolute;
    width: calc(100% - 8.6rem);
    height: 14.1143316rem;
    top: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    background: url(../imgs/site.svg) no-repeat;
    background-size: 100% 100%;
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
      }

      @else if($i ==4) {
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
      }

      @else if($i ==6) {
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
      }

      @else if($i ==8) {
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
      }

      @else if($i ==10) {
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
      }

      @else {
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
      height: 1.57rem;
      overflow: hidden;
      text-overflow: ellipsis;
      
      z-index: 2;

      .info-f {
        p {
          &:first-child {
            font-family: PingFangSC-Medium;
            font-size: .24rem;
            color: #333;
            letter-spacing: 0;
            font-weight: 500;
            margin-bottom: .15rem;
          }

          &:last-child {
            font-family: PingFangSC-Regular;
            font-size: .18rem;
            color: #666;
            letter-spacing: 0;
            line-height: .26rem;
            font-weight: 400;
          }
        }
      }

      &.even {
        .info {
          text-align: right;
          margin-right: .36rem;
          @extend .info-f;
        }
      }

      &.odd {
        .info {
          margin-left: .36rem;
          @extend .info-f;
        }
      }
    }
  }
}</style>