<template>
  <div class="purchase-module_1">
    <div class="img">
      <!-- <img src="./imgs/balance.png" alt="" /> -->
      <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/purchase/gif/module1.gif')" alt="" />
    </div>
    <p class="title">{{ $t('purchaseAndPledge.purchase') }}{{ $t('global.ozc') }}</p>
    <!-- <p class="info" v-html="$t('purchaseAndPledge.purchaseInfo')"></p> -->
    <clamp :content='$t("purchaseAndPledge.purchaseInfo")' className="info" />

    <button class="btn">
      <span @click="gotoExchange">{{ $t('home.exchange') }}</span>
    </button>
  </div>
</template>

<script>
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    Clamp,
  },
  methods: {
    gotoExchange() {
      this.$router.push({ name: 'PurchaseOzc', params: { moduleFlag: "Purchase" } })
    }
  }
};
</script>

<style lang="scss" scoped>
.purchase-module_1 {
  background: url("./imgs/bg_1.svg") no-repeat;
  background-size: 100%, 100%;
  padding: 0 0.55rem;

  .img {
    width: 6.4929rem;
    height: 5.32rem;
    margin: 0 auto;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    height: 0.68rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.68rem;
    font-weight: 500;
    text-align: center;
    margin: 0.3rem auto;
  }

  .info {
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
  }

  .btn {
    display: flex;
    width: 3.7rem;
    height: 0.88rem;
    background: #ffc200;
    border-radius: 20px;
    font-family: PingFangSC-Regular;
    margin: 0.4rem auto;
    border: none;

    >span {
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 0.28rem;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 400;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
