<template>
  <div>
    <!-- 模块一 -->
    <div class="purchase_module_one">
      <div class="w">
        <div class="purchase_module_w">
          <div class="purchase_module_right mobile_show">
            <img
              v-if="scroll.moduleOne === 2"
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/purchase/gif/module1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/purchase/gif/module1.png"
              alt=""
            />
          </div>
          <div class="purchase_module_left">
            <h3 class="max_tit">{{ $t('购买OZC') }}</h3>
            <p>{{ $t('purchaseBanner') }}</p>
            <p>{{ $t('purchaseBanner1') }}</p>
          </div>
          <div class="purchase_module_right pc_show">
            <img
              v-if="scroll.moduleOne === 2"
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/purchase/gif/module1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/purchase/gif/module1.png"
              alt=""
            />
          </div>
          <button @click="$router.push('/purchase/ozc')" class="mobile_show mobile_to_ozc">{{ $t('去兑换') }}</button>
        </div>
        <div class="pc_show">
          <Conversion />
        </div>
      </div>
    </div>
    <!-- 模块二 -->
    <div class="purchase_module_two">
      <div class="w">
        <div class="purchase_module_left">
          <img
            v-if="scroll.moduleTwo === 2"
            ref="moduleTwo"
            class="page_gif"
            src="@/assets/images/purchase/gif/module2.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleTwo"
            class="page_gif"
            src="@/assets/images/purchase/gif/module2.png"
            alt=""
          />
        </div>
        <div class="purchase_module_right">
          <h3 class="min_tit">{{ $t('质押OZC获得TOTO') }}</h3>
          <p>{{ $t('purchaseModule2txt') }}：{{ this.stakeRate }}%</p>
          <p>{{ $t('purchaseModule2txt2') }} <br> {{ $t('purchaseModule2txt3') }}</p>
          <!-- <p class="mobile_show">
            {{ $t('可提取资产') }}：{{ this.totoStakeAmount || 0 }} Ozcoin<br>   
            {{ $t('质押中资产') }}：{{ this.totoStakeAmount || 0 }} Ozcoin
          </p> -->
          <!-- <p>
            <i>注：期满如想继续质押挖矿，需要提取原有资产重新进行质押操作。</i>
          </p> -->
          <div class="pc_show">
            <div class="purchase_btns">
              <button @click="pledgeOrExtract('pledge')" class="purchase_btn_one pledge" >
                {{$t('质押')}}<div class="arrow"><i></i></div>
              </button>
              <button @click="pledgeOrExtract('extract')" class="purchase_btn_two extract" >
                {{$t('提取')}}<div class="arrow"><i></i></div>
              </button>
            </div>
          </div>
          <div class="mobile_show">
            <div class="purchase_btns">
              <button @click="$router.push('/purchase/pledge')" class="purchase_btn_one pledge" >
                {{$t('质押')}}<div class="arrow"><i></i></div>
              </button>
              <button @click="$router.push('/purchase/extract')" class="purchase_btn_two extract" >
                {{$t('提取')}}<div class="arrow"><i></i></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 质押pop -->
    <div v-show="modal.show" class="modal_wrap">
      <div class="modal">
        <img
          @click="modal.show = false"
          class="modal_close"
          src="@/assets/images/purchase/modalClose.png"
          alt=""
        />
        <ul class="modal_head">
          <li
            @click="pledgeOrExtract('pledge')"
            :class="{ modal_head_pledge: true, cur: modal.key === 'pledge' }"
          >
            {{$t('质押')}}
          </li>
          <li
            @click="pledgeOrExtract('extract')"
            :class="{ modal_head_extract: true, cur: modal.key === 'extract' }"
          >
            {{$t('提取')}}
          </li>
        </ul>
        <div>
          <div v-if="modal.key === 'pledge'" class="modal_body modal_pledge">
            <div class="modal_input">
              <p>{{$t('数量')}}({{ this.ozcBalance || 0 }}OZC)<i @click="allPledge" class="all_pledge_number">{{$t('全部')}}</i></p>
              <input v-model="pledgeNumber" class="pledge_input" type="number" />
            </div>
            <ul class="modal_data">
              <li>
                <p>{{$t('质押数量')}}</p>
                <span><i class="pledge_number">{{ pledgeNumber }}</i> OZC</span>
              </li>
              <li>
                <p>{{$t('年化收益率')}}</p>
                <span>{{ this.stakeRate }}%</span>
              </li>
            </ul>
            <button :disabled="this.freezeTime()" @click="pledgeBtn" class="modal_btn pledge_btn">{{$t('确认')}}</button>
            <i class="modal_btn_oper_i">{{$t('pledgeTxt')}}</i>
          </div>
          <div v-if="modal.key === 'extract'" class="modal_body modal_extract">
            <ul class="modal_data" style="margin-top: 0;">
              <li>
                <p>{{ $t('质押数量') }}</p>
                <span>{{ this.totoStakeAmount || 0 }} TOTO</span>
              </li>
              <li>
                <p>{{ $t('质押数量') }}</p>
                <span>{{ this.ozcStakeAmount || 0 }} OZC</span>
              </li>
            </ul>
            <button :disabled="this.freezeTime()" @click="extractBtn" class="modal_btn extract_btn">{{$t('确认')}}</button>
            <i class="modal_btn_oper_i">{{$t('extractTxt')}}</i>
          </div>
        </div>
      </div>
    </div>
    <!-- 模块三 -->
    <div class="purchase_module_three_wrap">
      <div class="purchase_module_three">
        <div class="w">
          <div class="purchase_module_img mobile_show">
            <img
              v-if="scroll.moduleThree === 2"
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/purchase/gif/module3.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/purchase/gif/module3.png"
              alt=""
            />
          </div>
          <div class="purchase_module_txt">
            <h3 class="min_tit">{{$t('TOTO的发行与销毁机制')}}</h3>
            <div class="purchase_module_txt_scroll">
              <p>{{$t('purchaseModule3txt001')}}</p>
              <div :class="{'mobile_show_more': !this.viewMoreOneBoo}">
                <p>{{$t('purchaseModule3txt002')}}</p>
                <p v-if="$t('purchaseModule3txt003')">
                  {{$t('purchaseModule3txt003')}}<br />{{$t('purchaseModule3txt004')}}<br />{{$t('purchaseModule3txt005')}}<br />{{$t('purchaseModule3txt006')}}<br />{{$t('purchaseModule3txt007')}}
                </p>
                <p>
                  {{$t('purchaseModule3txt008')}}<br />{{$t('purchaseModule3txt009')}}<br />{{$t('purchaseModule3txt010')}}<br />{{$t('purchaseModule3txt011')}}<br />{{$t('purchaseModule3txt012')}}
                </p>
              </div>
            </div>
            <span v-show="!viewMoreOneBoo" @click="this.viewMoreOne" class="mobile_show mobile_show_more_btn">{{ $t('查看更多') }}>></span>
            <span v-show="viewMoreOneBoo" @click="this.viewMoreOne" class="mobile_show mobile_show_more_btn">{{ $t('收起') }}</span>
          </div>
          <div class="purchase_module_img pc_show">
            <img
              v-if="scroll.moduleThree === 2"
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/purchase/gif/module3.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleThree"
              class="page_gif"
              src="@/assets/images/purchase/gif/module3.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="purchase_module_three">
        <div class="w">
          <div class="purchase_module_img">
            <img
              v-if="scroll.moduleFour"
              ref="moduleFour"
              class="page_gif"
              src="@/assets/images/purchase/gif/module4.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleFour"
              class="page_gif"
              src="@/assets/images/purchase/gif/module4.png"
              alt=""
            />
          </div>
          <div class="purchase_module_txt">
            <h3 class="min_tit">{{$t('TOTO的使用与流通')}}</h3>
            <p>
              {{$t('purchaseModule3txt6')}}
            </p>
            <p :class="{'mobile_show_more': !this.viewMoreTwoBoo}">
              {{$t('purchaseModule3txt7')}}
            </p>
            <span v-show="!viewMoreTwoBoo" @click="this.viewMoreTwo" class="mobile_show mobile_show_more_btn">{{ $t('查看更多') }}>></span>
            <span v-show="viewMoreTwoBoo" @click="this.viewMoreTwo" class="mobile_show mobile_show_more_btn">{{ $t('收起') }}</span>
          </div>
        </div>
      </div>
    </div>
    <button class="mobile_show mobile_to_ozc view_plan"><a href="/purchase/plan">{{ $t('分配计划') }}</a></button>

    <!-- 曲线图 -->
    <div class="graph pc_show">
      <div class="w">
        <p class="graph_tit">TOTO/BUSD {{$t('价格')}}</p>
        <div class="graph_data">
          <div class="graph_data_left">
            <p>--</p>
            <span>TOTO/BUSD</span><i>+0.231(0.30%)</i>
          </div>
          <ul class="graph_data_right">
            <li
              v-for="item in grahpTime"
              :key="item.value"
              :class="{ cur: graphTimeKey === item.value }"
              @click="grahpTimeNav(item.value)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
        <p class="graph_time">Jul19,2022,02:12PM</p>
        <!-- 本体 -->
      </div>
    </div>
    <!-- 模块四 -->
    <div class="purchase_module_four pc_show">
      <div class="w">
        <div class="allocation">
          <p class="allocation_tit min_tit">TOTO{{$t('通证分配')}}</p>
          <div class="allocation_info">
            <div class="allocation_left">
              <ul>
                <li>
                  <p><i></i>{{$t('长期支持者占比')}}</p>
                  <span>15%</span>
                </li>
                <li>
                  <p><i></i>{{$t("OZ基金会占比")}}</p>
                  <span>30%</span>
                </li>
                <li>
                  <p><i></i>{{$t("OZ团队成员占比")}}</p>
                  <span>20%</span>
                </li>
                <li>
                  <p><i></i>{{$t("流动性质押池占比")}}</p>
                  <span>5%</span>
                </li>
                <li>
                  <p><i></i>{{$t("用户OZC投注主矿池挖矿")}}</p>
                  <span>20%</span>
                </li>
                <li>
                  <p><i></i>{{$t("VIP用户OZC投注VIP矿池挖矿")}}</p>
                  <span>10%</span>
                </li>
              </ul>
            </div>
            <div class="allocation_right">
              <!-- <img
                v-if="scroll.moduleFive === 2"
                ref="moduleFive"
                class="page_gif"
                src="@/assets/images/purchase/gif/module5.gif"
                alt=""
              />
              <img
                v-else
                ref="moduleFive"
                class="page_gif"
                src="@/assets/images/purchase/gif/module5.png"
                alt=""
              /> -->
              <img
                ref="moduleFive"
                class="page_gif"
                src="@/assets/images/purchase/gif/module55.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Hint ref="hint" />
  </div>
</template>

<script>
import Conversion from "../Conversion";
import { mapGetters } from 'vuex'
import scrollGif from '@/utils/scrollGif'
import Hint from '@/components/Hint'
import { message } from 'ant-design-vue';

export default {
  components: {
    Conversion,
    Hint
  },
  data() {
    return {
      pledgeNumber: null,
      grahpTime: [
        { label: "24H", value: "24H" },
        { label: "1W", value: "1W" },
        { label: "1M", value: "1M" },
        { label: "1Y", value: "1Y" }
      ],
      graphTimeKey: "24H",
      modal: {
        show: false,
        key: ""
      },
      scroll: {
        moduleOne: 1,
        moduleTwo: 1,
        moduleTwoM: 1,
        moduleThree: 1,
        moduleFour: 1,
        moduleFourM: 1,
        moduleFive: 1,
      },
      viewMoreOneBoo: false,
      viewMoreTwoBoo: false,
    };
  },
  computed: {
    ...mapGetters('Wallet', ['ozcBalance', 'clientType', 'stakeRate', 'ozcStakeAmount', 'totoStakeAmount', 'address'])
  },
  watch: {
    'address'() {
      if (this.address) {
        this.$store.dispatch('Wallet/getOkcoinStake')
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollChange)
    if (this.address) {
      this.$store.dispatch('Wallet/getOkcoinStake')
    }
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollChange)
  },
  methods: {
    // 查看更多
    viewMoreOne() {
      this.viewMoreOneBoo = !this.viewMoreOneBoo
    },
    viewMoreTwo() {
      this.viewMoreTwoBoo = !this.viewMoreTwoBoo
    },
    scrollChange() {
      const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
      const moduleTwo = this.$refs.moduleTwo.offsetTop ? this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop : 0
      const moduleThree = this.$refs.moduleThree.offsetTop + this.$refs.moduleThree.offsetParent.offsetTop
      const moduleFour = this.$refs.moduleFour.offsetTop ? this.$refs.moduleFour.offsetTop + this.$refs.moduleFour.offsetParent.offsetTop : 0
      const moduleFive = this.$refs.moduleFive.offsetTop + this.$refs.moduleFive.offsetParent.offsetTop
      const domList = [
        { label: 'moduleOne', value: moduleOne, time: 6 },
        { label: 'moduleTwo', value: moduleTwo, time: 6 },
        { label: 'moduleThree', value: moduleThree, time: 5 },
        { label: 'moduleFour', value: moduleFour, time: 5 },
        { label: 'moduleFive', value: moduleFive, time: 4 },
      ]
      scrollGif(this, domList)
    },
    // 冻结时间计算
    freezeTime() {
      return false
    },
    // 质押所有ozc
    allPledge() {
      this.pledgeNumber = this.ozcBalance
    },
    grahpTimeNav(value) {
      this.graphTimeKey = value;
    },
    pledgeOrExtract(key) {
      if (!this.address) return message.error(this.$t('请先连接钱包'))
      if (key === 'pledge' && !Number(this.ozcBalance)) return message.error('暂无OZC请先兑换')
      this.pledgeNumber = null
      this.modal = {
        show: true,
        key
      };
    },
    // 质押
    pledgeBtn() {
      if (this.pledgeNumber > this.ozcBalance) return message.error(this.$t('请正确输入'))
      console.log('this.clientType: ', this.clientType);
      if (this.clientType === 'pc') {
        this.pcPledgeBtn()
      }
      if (this.clientType === 'mobile') {
        this.mobilePledgeBtn()
      }
      // this.mobilePledgeBtn()
    },
    pcPledgeBtn() {
      if (!this.pledgeNumber) return message.error(this.$t('请正确输入'))
      this.$store.dispatch('Wallet/pcStake', { unit: 'ether', amount: this.pledgeNumber, cb: this.resHint })
    },
    mobilePledgeBtn() {
      if (!this.pledgeNumber) return message.error(this.$t('请正确输入'))
      this.$store.dispatch('Wallet/mobileStake', { unit: 'ether', amount: this.pledgeNumber, cb: this.resHint })
    },
    // 提取
    extractBtn() {
      if (!Number(this.totoStakeAmount)) { // 不能提取
        this.closeModal()
        this.$refs.hint.modal =  {
          title: this.$t('提示信息'),
          type: 'hint', // hint || connectWallet
          status: 3, // 1是成功 2是失败 3是警告
          show: true,
          txt: this.$t('extractTxt3'),
          cb: null
        }
        return
      }
      // if (this.clientType === 'pc') {
      //   this.pcExtractBtn()
      // }
      // if (this.clientType === 'mobile') {
      //   this.mobileExtractBtn()
      // }
      this.mobileExtractBtn()
    },
    pcExtractBtn() {
      this.$store.dispatch('Wallet/pcRedemption', { cb: this.resHint2 })
    },
    mobileExtractBtn() {
      this.$store.dispatch('Wallet/mobileRedemption', { cb: this.resHint2 })
    },
    closeModal() {
      this.modal = { show: false, key: "" }
    },
    resHint(e) {
      this.closeModal()
      this.$refs.hint.modal =  {
        title: this.$t('提示信息'),
        type: 'hint', // hint || connectWallet
        status: e === 'success' ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: e === 'success' ? this.$t('pledgeTxt2') : this.$t('质押失败'),
        cb: null
      }
    },
    resHint2(e) {
      this.closeModal()
      this.$refs.hint.modal =  {
        title: this.$t('提示信息'),
        type: 'hint', // hint || connectWallet
        status: e === 'success' ? 1 : 2, // 1是成功 2是失败
        show: true,
        txt: e === 'success' ? this.$t('extractTxt2') : this.$t('提取失败'),
        cb: null
      }
    }
  }
};
</script>

<style scoped>
@import "~@/styles/purchase.css";
.freeze_i {
  color: #999999;
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
}
</style>