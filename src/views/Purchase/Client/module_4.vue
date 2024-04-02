<template>
  <div class="purchase_module_four">
    <div class="allocation">
      <p class="allocation_tit min_tit">
        {{ $t('global.toto') }} {{ $t('purchaseAndPledge.tokenAllocation') }}
      </p>
      <div class="allocation_info">
        <div class="allocation_left">
          <ul>
            <li>
              <p><i></i>{{ $t('purchaseAndPledge.supporters') }}</p>
              <span>15%</span>
            </li>
            <li>
              <p><i></i>{{ $t("purchaseAndPledge.foundation") }}</p>
              <span>30%</span>
            </li>
            <li>
              <p><i></i>{{ $t("purchaseAndPledge.members") }}</p>
              <span>20%</span>
            </li>
            <li>
              <p><i></i>{{ $t("purchaseAndPledge.liquidity") }}</p>
              <span>5%</span>
            </li>
            <li>
              <p><i></i>{{ $t("purchaseAndPledge.poolMining") }}</p>
              <span>20%</span>
            </li>
            <li>
              <p><i></i>{{ $t("purchaseAndPledge.vipPoolMining") }}</p>
              <span>10%</span>
            </li>
          </ul>
        </div>
        <div class="allocation_right">
          <img v-animation class="page_png" :data-gif_url="require('@/assets/images/purchase/gif/module5.gif')"
            alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$color-list: #3CEA97, #0385F2, #FFC200, #6477E0, #9EBFFF, #FF9053;

.purchase_module_four {
  margin: .5rem 0 .6rem;
}

.allocation {
  padding: .5rem 0;
  width: var(--content-w);
  background: #FFF;
  box-shadow: 0px 5px 15px 7px rgba(3, 133, 242, 0.03);
  border-radius: 15px;
  margin: 0 auto;
}

.allocation_info {
  display: flex;
  align-items: center;

}

.allocation_left {
  width: 50%;
  // padding: 0 109px;
  background: url('~@/assets/images/purchase/segment.png') no-repeat;
  background-position: right;

  ul {
    li {
      display: flex;
      padding: 0 .95rem 0 1.09rem;
      margin-bottom: .1rem;
      font-size: .14rem;
      color: #666;
      line-height: .24rem;
      font-weight: 200;
      align-items: center;
      justify-content: space-between;

      @for $i from 1 through length($color-list) {
        $item: nth($color-list, $i);

        &:nth-child(#{$i}) p i {
          background: $item;
        }
      }

      p {
        i {
          width: .14rem;
          height: .14rem;
          display: inline-block;
          border-radius: 50%;
          margin-right: .2rem;
        }
      }
    }
  }
}

.allocation_tit {
  font-family: PingFangSC-Medium;
  text-align: center;
  font-size: .4rem;
  color: #333;
  line-height: .44rem;
  font-weight: 500;
  margin-bottom: .48rem;
}

.allocation_right {
  width: 50%;
  text-align: center;

  img {
    width: 60%;
  }
}
</style>