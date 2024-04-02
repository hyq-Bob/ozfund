<template>
  <div class="_problem-module">
    <div class="content-box">
      <p class="title">{{ $t('problem.title') }}</p>
      <p class="summary">{{ $t('problem.problemInfo') }}</p>
      <div class="list-info">
        <ul class="list-box">
          <li v-for="item in problemList" :key="item.id">
            <p class="problem-title">
              <span>{{ item.title }}</span>
              <i class="circle" @click="() => item.isOpen = !item.isOpen">
                <template>
                  <svg v-show="!item.isOpen" width="21px" height="21px" viewBox="0 0 21 21" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>编组</title>
                    <g id="2023.3.14" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="6动态备份-5" transform="translate(-917, -1471)" fill="#333333" fill-rule="nonzero">
                        <g id="编组" transform="translate(917, 1471)">
                          <path
                            d="M19.0731563,9.03659375 L11.0365625,9.03659375 L11.0365625,1 C11.0365625,0.44771875 10.5888437,0 10.0365625,0 C9.48428125,0 9.0365625,0.44771875 9.0365625,1 L9.0365625,9.03659375 L1,9.03659375 C0.44771875,9.03659375 -8.8817842e-16,9.4843125 -8.8817842e-16,10.0365937 C-8.8817842e-16,10.588875 0.44771875,11.0365937 1,11.0365937 L9.0365625,11.0365937 L9.0365625,19.0731563 C9.0365625,19.6254375 9.48428125,20.0731563 10.0365625,20.0731563 C10.5888437,20.0731563 11.0365625,19.6254375 11.0365625,19.0731563 L11.0365625,11.0365937 L19.0731563,11.0365937 C19.6254375,11.0365937 20.0731563,10.588875 20.0731563,10.0365937 C20.0731563,9.4843125 19.6254375,9.03659375 19.0731563,9.03659375 Z"
                            id="路径"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </template>
                <template>
                  <svg v-show="item.isOpen" width="21px" height="3px" viewBox="0 0 21 3" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>编组</title>
                    <g id="2023.3.14" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="6动态备份-5" transform="translate(-977, -1580)" fill="#333333" fill-rule="nonzero">
                        <g id="编组" transform="translate(977, 1580.0366)">
                          <path
                            d="M19.0731563,0 L11.0365625,0 L9.0365625,0 L1,0 C0.44771875,0 0,0.44771875 0,1 C0,1.55228125 0.44771875,2 1,2 L9.0365625,2 L11.0365625,2 L19.0731563,2 C19.6254375,2 20.0731563,1.55228125 20.0731563,1 C20.0731563,0.44771875 19.6254375,0 19.0731563,0 Z"
                            id="路径"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </template>
              </i>
            </p>
            <div v-show="item.isOpen" class="answer" :style="{ height: item.isOpen ? 'auto' : 0 }">
              <label v-for="childItem in item?.children" :key="childItem.id">{{ childItem.summary }}</label>
            </div>
          </li>
        </ul>
        <div class="icon">
          <img src="../imgs/icon.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import problemModule from "../logic/problem";
export default {
  ...problemModule,
};
</script>
<style lang="scss" scoped>
._problem-module {
  position: relative;
  padding-top: 1.26rem;
  padding-bottom: 0.8rem;
  background: url(../../../assets/images/dynamic/bg6.png) no-repeat;
  background-size: 100%, 100%;

  .content-box {
    width: var(--content-w);
    margin: 0 auto;
  }

  .mask {
    position: absolute;
    bottom: 0;
    height: 1rem;
    width: 100%;
    background: linear-gradient(to bottom, transparent, #fff);
  }

  .list-info {
    display: flex;

    .icon {
      width: 2.5rem;
      height: 2rem;
      margin-left: 1.54rem;
      margin-top: 1rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .list-box {
    li {
      background: rgba(248, 248, 248, 0.2);
      border-radius: 5px;
      border-style: solid;
      border-width: 2px;
      border-image: linear-gradient(to right, #fff, #f2f2f2) 1;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-size: 100%, 100%;
      padding: 0.3rem;
      width: 6.15rem;

      label {
        font-family: PingFangSC-Regular;
        display: inline-block;
        font-size: 0.14rem;
        color: #666;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 400;
        margin-top: 0.22rem;
      }

      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }

      &:nth-child(even) {
        margin-left: 0.6rem;
      }
    }

    .problem-title {
      font-family: PingFangSC-Regular;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.16rem;
      color: #333;
      letter-spacing: 0;
      font-weight: 400;
    }

    .circle {
      display: flex;
      width: 0.36rem;
      height: 0.36rem;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 0 0 5px 2px rgba(3, 133, 242, 0.05);
      cursor: pointer;
    }
  }

  .title {
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.68rem;
    font-weight: 500;
  }

  .summary {
    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    color: #666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 0.24rem;
    font-weight: 200;
    margin-bottom: 0.4rem;
  }
}</style>
