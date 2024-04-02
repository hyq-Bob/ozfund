<template>
  <div class="purchase-module_3">
    <ul>
      <li v-for="(item) in pageInfo" :key="item.id">
        <div class="img">
          <!-- <img :src="item.imgUrl" alt="" /> -->
          <img v-animation :data-gif_url="item.imgGifUrl" alt="" />
        </div>
        <p class="title">{{ $t(item.title) }}</p>
        <!-- <p class="info" v-html="$t(item.info)"></p> -->

        <clamp :content="$t(item.info)" className="info" />
        <!-- <span class="more" @click="moreClickCb(item, index)" v-if="item.isMore">
          {{ $t(item.moreName) }}>></span
        > -->
      </li>
    </ul>
    <div class="btn-box">
      <button class="btn" @click="$router.push({ name: 'PurchasePlan', params: { moduleFlag: 'Purchase' } })">
        {{ $t('purchaseAndPledge.seePlant') }}
      </button>
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
      pageInfo: [
        {
          id: 1,
          title: "purchaseAndPledge.publishOrDestroy",
          info: "purchaseAndPledge.publishOrDestroyInfo1",
          moreInfo: "purchaseAndPledge.publishOrDestroyInfo1",
          isMore: true,
          deplay: 3500,
          moreName: "purchaseAndPledge.seeMore",
          imgUrl: require("../../../assets/images/purchase/gif/module3.png"),
          imgGifUrl: require("../../../assets/images/purchase/gif/module3.gif"),
        },
        {
          id: 2,
          title: "purchaseAndPledge.useAndCirculation",
          info: "purchaseAndPledge.useAndCirculationInfo",
          moreInfo: "purchaseAndPledge.useAndCirculationInfo",
          isMore: true,
          deplay: 6000,
          moreName: "purchaseAndPledge.seeMore",
          imgUrl: require("../../../assets/images/purchase/gif/module4.png"),
          imgGifUrl: require("../../../assets/images/purchase/gif/module4.gif"),
        },
      ],
    };
  },
  methods: {
    moreClickCb(crt, idx) {
      let [info, moreInfo] = [crt.moreInfo, crt.info];
      this.pageInfo = this.pageInfo.with(idx, {
        ...crt,
        isMore: false,
        info,
        moreInfo,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase-module_3 {
  padding: 0 0.4rem;

  .img {
    width: 3.1906rem;
    height: 3.4rem;
    margin: 0 auto;
    margin-top: 0.3rem;

    &:first-child {
      width: 3.8215rem;
      height: 4.63rem;
      margin-top: 0.54rem;
    }

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    min-height: 0.8rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 500;
    margin-top: 0.3rem;
  }

  .info {
    min-height: 1.68rem;
    font-family: PingFangSC-Light;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin-top: 0.2rem;
  }

  .more {
    display: flex;
    justify-content: center;
    height: 0.37rem;
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #0385f2;
    letter-spacing: 0;
    text-align: center;
    font-weight: 200;
    margin-top: 0.2rem;
  }

  .btn-box {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #fff;
    letter-spacing: 0;

    .btn {
      width: 3.7rem;
      height: 0.88rem;
      background: #0385f2;
      border: none;
      border-radius: 0.2rem;
      font-weight: 400;
    }
  }
}
</style>
