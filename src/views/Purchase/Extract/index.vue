<template>
  <div class="two_page mobile">
    <div class="nav">
      <img @click="$router.push({
            name: 'rootLayout',
            params: { moduleFlag: 'Purchase' },
          })" src="@/assets/images/back.png" alt="">
      <ul class="two_page_nav">
        <li><router-link to='/purchase/pledge'>{{$t('purchaseAndPledge.obtain')}}</router-link></li>
        <li class="cur">{{$t('purchaseAndPledge.withdrawal')}}</li>
      </ul>
    </div>
    <p class="top_tips">{{$t('purchaseAndPledge.extractTxt')}}</p>
    <div class="content-box">
      <div class="pledage_w">
        <p class="pledage_top">{{ $t('purchaseAndPledge.quantity') }}：{{ this.totoStakeAmount || 0 }} {{ $t('global.busd') }}</p>
        <!-- <p class="pledage_top">{{ $t('数量') }}：{{ this.ozcStakeAmount || 0 }} OZC</p> -->
        <div class="pledage_input_w">
          <p>¥</p>
          <input type="number" v-model="drawNum"  :placeholder="$t('tipMessage.num')">
          <span @click="()=> drawNum = totoStakeAmount">{{ $t('global.all') }}</span>
        </div>
      </div>
      <div class="pledage_btn">
        <button @click="extractBtn">{{$t('global.submit')}}</button>
      </div>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { getSession } from "@/utils/base";
// import { message } from 'ant-design-vue';
import Hint from '@/components/Hint'
  export default {
    components: {
      Hint
    },
    data() {
      return {
        drawNum:0
      }
    },
    computed: {
    ...mapGetters('Wallet', ['ozcBalance', 'clientType', 'stakeRate', 'ozcStakeAmount', 'totoStakeAmount', 'address'])
  },
    methods: {
      ...mapActions('Metamask', ['withdrawStake']),
      // 提取
      extractBtn() {
        console.log('this.totoStakeAmount: ', this.drawNum);
        if (!this.drawNum) { // 不能提取
          this.$refs.hint.modal =  {
            title: this.$t('tipMessage.tip'),
            type: 'hint', // hint || connectWallet
            status: 3, // 1是成功 2是失败 3是警告
            show: true,
            txt: this.$t('global.fail'),
            cb: null
          }
          return
        }
        this.mobileExtractBtn()
      },
      mobileExtractBtn() {
        this.withdrawStake({ amount: this.drawNum, withdrawAddr: getSession('address') }).then(res=>{
          if(res.success){
            this.resHint2('success')
            this.$router.go(-1)
          }else{
            this.resHint2('fail')
          }
        })
        // this.$store.dispatch('Wallet/mobileRedemption', { cb: this.resHint2 })
      },
      resHint2(e) {
        this.$refs.hint.modal =  {
          title: this.$t('tipMessage.tip'),
          type: 'hint', // hint || connectWallet
          status: e === 'success' ? 1 : 2, // 1是成功 2是失败
          show: true,
          txt: e === 'success' ? this.$t('extractTxt2') : this.$t('global.fail'),
          cb: null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.mobile {
  height: 100%;

  .nav {
    display: flex;
    height: 0.88rem;
    padding: 0.2rem 0.3rem;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    > img {
      width: 0.2rem;
      height: 0.37rem;
      aspect-ratio: 1 / 18;
      object-fit: contain;
    }

    p {
      font-family: PingFangSC-Medium;
      flex: 1;
      font-size: 0.34rem;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
    }
  }
  .two_page_nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;

    li {
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      color: #666;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;

      &.cur {
        font-family: PingFangSC-Medium;
        font-size: 0.34rem;
        color: #333;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
      }
    }
  }
  .top_tips {
    font-family: PingFangSC-Regular;
    height: 1.06rem;
    background: rgba(255, 194, 0, 0.1);
    padding: 0.2rem 0.3rem;
    font-size: 0.24rem;
    color: #333;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 400;
  }
  .content-box {
    height: calc(100% - 1.94rem);
    background: #f5f5f5;
    padding: 0.2rem 0.3rem;
  }
  .pledage_w {
    background: #fff;
    border-radius: 0.15rem;
    padding: 0.3rem;
  }
  .pledage_top {
    font-family: PingFangSC-Regular;
    height: 0.45rem;
    font-size: 0.32rem;
    color: #333;
    letter-spacing: 0;
    font-weight: 400;
  }
  .pledage_input_w {
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-top: .3rem;
    > p {
      font-family: PingFangSC-Regular;
      width: 0.36rem;
      height: 0.84rem;
      font-size: 0.6rem;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
    ::placeholder {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #ccc;
      letter-spacing: 0;
      font-weight: 400;
    }
    > input {
      flex: 1;
      height: 0.84rem;
      border: none;
      font-size: 0.28rem;
      color: #ccc;
      padding: .2rem 0.3rem 0;
    }
    > span {
      font-family: PingFangSC-Regular;
      height: 40px;
      font-size: 28px;
      color: #0385f2;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
  .pledage_btn {
    margin-top: 0.3rem;
    > button {
      font-family: PingFangSC-Regular;
      height: 0.88rem;
      width: 100%;
      border: none;
      color: #fff;
      background: #0385f2;
      border-radius: 15px;
      font-size: 0.28rem;
    }
    p {
      font-family: PingFangSC-Regular;
      height: 40px;
      font-size: 0.28rem;
      color: #0385f2;
      letter-spacing: 0;
      font-weight: 400;
      margin-top: 0.2rem;
      text-align: center;
    }
  }
}
</style>