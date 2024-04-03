<template>
  <div class="purchase_module_one">
    <div class="content-box">
      <div class="purchase_module_w">
        <div class="purchase_module_left">
          <h3 class="max_tit">
            {{ $t('purchaseAndPledge.purchase') }}{{$t('global.ozc')  }}
          </h3>
          <!-- <p v-html="$t('purchaseAndPledge.purchaseInfo')"></p> -->

          <Clamp :content="$t('purchaseAndPledge.purchaseInfo')" className="content" />
        </div>
        <div class="purchase_module_right">
          <img v-animation class="page_png" :data-gif_url="require('@/assets/images/purchase/gif/module1.gif')" alt="" />
        </div>
      </div>
      <div class="exchange">
        <Conversion />
      </div>
    </div>
  </div>
</template>

<script>
import Clamp from '../../components/clamp.vue';
import Conversion from "../Conversion";
export default {
  components: {
    Conversion,
    Clamp,
  },
}
</script>

<style lang="scss" scoped>
.purchase_module_one {
  background: url("~@/assets/images/purchase/module1.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.6rem;

  .content-box {
    width: var(--content-w);
    margin: 0 auto;
  }

  .purchase_module_w {
    display: flex;
    justify-content: center;
    column-gap: 0.12rem;
  }

  .purchase_module_left {
    width: 4.28rem;
    margin-top: 2.54rem;

    h3 {
      font-size: 0.64rem;
      color: #333;
      line-height: 0.68rem;
      font-weight: 900;
      margin-bottom: 0.24rem;
    }

    .content {
      font-size: 0.16rem;
      color: #666;
      line-height: 0.32rem;
      font-weight: 200;
    }
  }

  .purchase_module_right {
    flex: 1;
    aspect-ratio: 1.22 / 1;
  }

  .exchange {
    margin-top: .8764rem;
    width: 100%;
  }
}
</style>