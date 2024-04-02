<template>
  <div class="notice-module_1">
    <div class="bg-icon">
      <div class="icon">
        <img v-animation :data-gif_url="require('@/assets/images/dynamic/gif/module2.gif')" alt="" />
      </div>
    </div>
    <div class="content-box">
      <p class="title">公告</p>
      <ul>
        <li v-for="item in noticeList" :key="item.id" class="dynamic_items">
          <p class="items_title">{{ item.subject }}</p>
          <clamp :content="item.content" className="items_info" />
        </li>
      </ul>
    </div>
    <div></div>
  </div>
</template>

<script>
import logicModule from "../logic";
import Clamp from '../../components/clamp.vue';
export default {
  ...logicModule,
  components: {
    Clamp
  },
};
</script>
<style lang="scss" scoped>
.notice-module_1 {

  // background-color:#f5f5f5;
  .bg-icon {
    height: 5.3rem;
    width: 100%;
    background: url(./imgs/bg-1.svg) no-repeat;
    background-size: 100%, 100%;
  }

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

  .content-box {
    padding: 0 0.3rem;
  }

  .title {
    font-family: PingFangSC-Medium;
    height: 0.68rem;
    font-size: 0.42rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.68rem;
    font-weight: 500;
    margin: 0.3rem 0;
  }

  .dynamic_items {
    box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    background: rgba(255, 255, 255, 0.4);
    padding: 0.4rem 0.3rem;
    margin-bottom: 0.4rem;

    &:not(:last-child) {
      margin-bottom: 0.3rem;
    }

    .items_title {
      font-family: PingFangSC-Regular;
      height: 0.38rem;
      font-size: 0.32rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.38rem;
      font-weight: 400;
      margin-bottom: 0.2rem;
    }

    .items_info {
      display: inline-block;
      font-family: PingFangSC-Light;
      font-size: 0.28rem;
      width: 100%;
      color: #333;
      letter-spacing: 0;
      line-height: 0.38rem;
      font-weight: 200;
      word-break: break-all;
    }
  }
}
</style>
