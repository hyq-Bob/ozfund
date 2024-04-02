<template>
  <div class="purchase-module_2">
    <div class="img">
      <!-- <img src="../../../assets/images/purchase/gif/module2.png" alt="" />
       -->
      <img v-animation :data-gif_url="require('@/assets/images/purchase/gif/module2.gif')" alt="" />
    </div>
    <p class="title">
      {{ $t('purchaseAndPledge.obtain') }}&ensp;{{ $t('global.ozc') }}&ensp;{{ $t('purchaseAndPledge.stake') }}&ensp;{{ $t('global.toto') }}
    </p>
    <p class="summary ratio_">{{ $t('purchaseAndPledge.interestRateReference') }}：{{ stakeRate }}%</p>
    <!-- <p class="info">
      {{ $t('purchaseAndPledge.info') }}
      <br/>&ensp;{{ $t('purchaseAndPledge.note') }}
    </p> -->
    <clamp :content='$t("purchaseAndPledge.info")' className="info" />
    <div class="btn-list">
      <button primary @click="$router.push({ name: 'PurchasePledge', params: { moduleFlag: 'Purchase' } })">
        {{ $t('purchaseAndPledge.obtain') }}
        <arrowComp />
      </button>
      <button @click="$router.push({ name: 'PurchaseExtract', params: { moduleFlag: 'Purchase' } })">
        {{ $t('purchaseAndPledge.withdrawal') }}
        <arrowComp />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import arrowComp from "@/views/components/arrow.vue";
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    arrowComp,
    Clamp
  },
  computed: {
    ...mapGetters("Wallet", ["stakeRate"]),
  },
};
</script>

<style lang="scss" scoped>
.purchase-module_2 {
  padding: 0 0.4rem;
 
  .img {
    width: 3.7415rem;
    height: 4.36rem;
    margin: 0 auto;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    height: 0.8rem;
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 500;
    margin-top: 0.26rem;
  }

  .summary {
    height: 0.42rem;
    font-family: PingFangSC-Light;
    font-size: 0.26rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    &.ratio_ {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #0385f2;
      font-size: .18rem;
    }
  }

  .info {
    font-family: PingFangSC-Light;
    font-size: 0.28rem;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.42rem;
    font-weight: 200;
    margin-top: 0.2rem;
  }

  .btn-list {
    display: flex;
    height: 0.88rem;
    column-gap: 0.2rem;
    margin-top: 0.4rem;
    justify-content: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      border-radius: 0.2rem;
      font-size: 0.28rem;
      background: transparent;
      border: 1px solid rgba(3, 133, 242, 1);
      color: rgba(3, 133, 242, 1);
      column-gap: 0.2rem;

      &[primary] {
        background: #0385f2;
        color: #fff;
      }
    }
  }
}
</style>
