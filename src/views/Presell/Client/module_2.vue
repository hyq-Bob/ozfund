<template>
  <div class="presell_module_two">
    <div class="presell_module_left">
      <h3 class="min_tit">{{ $t('preSale.contractInfo') }}</h3>
      <ul>
        <li>
          <p>{{ $t('preSale.fullName') }}</p>
          <p>{{$t('global.toto')}}</p>
        </li>
        <li>
          <p>{{ $t('preSale.referred') }}</p>
          <p>{{$t('global.toto')}}</p>
        </li>
        <li>
          <p>{{ $t('preSale.distribution') }}{{ $t('preSale.network') }}</p>
          <p>
            <!-- {{$t('global.erc20')}} -->
           ETH{{ $t('preSale.mainNetwork') }}
          </p>
        </li>
        <li>
          <p>{{ $t('preSale.tokenStandards') }}</p>
          <!-- <p>{{$t('global.ber20')}}</p> -->
          <p>ERC20</p>
        </li>
        <li>
          <p>{{ $t('preSale.browser') }}{{ $t('preSale.queries') }}</p>
          <p>
            <span cursor @click="jump(`https://bscscan.com/token/${totoContractAddress}`)">
              {{ $t('home.view') }}
            </span>
          </p>
        </li>
        <li>
          <p>{{ $t('preSale.accuracy') }}</p>
          <p>18</p>
        </li>
        <li class="last-item">
          <p>{{ $t('preSale.contract') }}{{$t('preSale.address') }}</p>
          <p :title="totoContractAddress">
            {{ totoContractAddress }}
          </p>
        </li>
      </ul>
    </div>
    <div class="presell_module_right">
      <img ref="moduleThree" class="page_gif" src="@/assets/images/presell/gif/module3.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('Wallet', ['totoContractAddress'])
  },
  methods: {
    jump(url) {
      window.open(url, '_banlk', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.presell_module_two {
  display: flex;
  margin-top: 1.06rem;
  width: var(--content-w);
  margin: 1.06rem auto 0;

  .presell_module_right {
    width: 3.0278rem;
    height: 2.2697rem;
    padding-right: 0.6rem;
    >img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .presell_module_left {
    flex: 1;
    h3 {
      font-size: 30px;
      color: #333333;
      line-height: 68px;
      font-weight: 500;
      margin-bottom: 3px;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, 33.33%);
      row-gap: 0.3rem;

      li {
        [cursor] {
          cursor: pointer;
        }
        &:not(:nth-child(3n + 1)) {
          position: relative;
          padding-left: 0.1663rem;
          &::before {
            position: absolute;
            left: 0;
            content: "";
            height: 100%;
            width: 1px;
            background: #e6e6e6;
          }
        }
        p {
          &:first-child {
            font-family: PingFangSC-Regular;
            font-size: 0.16rem;
            color: #666;
            letter-spacing: 0;
            font-weight: 400;
          }

          &:last-child {
            font-family: PingFangSC-Semibold;
            font-size: 0.25rem;
            color: #333;
            letter-spacing: 0;
            font-weight: 600;
          }
        }
      }

      .last-item {
        grid-column: 1 / span 3;
      }
    }
  }
}
</style>