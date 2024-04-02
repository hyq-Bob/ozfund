<template>
  <div class="animate__animated animate__bounceInRight">
    <!-- 模块一 -->
    <div class="presell_module_one">
      <div class="w">
        <div class="presell_module_w">
          <div class="presell_module_right mobile_show">
            <img
              v-if="scroll.moduleOne === 2"
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/presell/gif/module1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/presell/gif/module1.png"
              alt=""
            />
          </div>
          <div class="presell_module_left">
            <h3 class="max_tit">{{$t('TOTO预售2')}}</h3>
            <p>
              {{ $t('presellBanner') }}
            </p>
            <p :class="{'mobile_show_more': !this.viewMoreOneBoo}">
              {{ $t('presellBanner2') }}
            </p>
            <span v-show="!viewMoreOneBoo" @click="this.viewMoreOne" class="mobile_show mobile_show_more_btn">{{ $t('查看更多') }}>></span>
            <span v-show="viewMoreOneBoo" @click="this.viewMoreOne" class="mobile_show mobile_show_more_btn">{{ $t('收起') }}</span>
          </div>
          <div class="presell_module_right pc_show">
            <img
              v-if="scroll.moduleOne === 2"
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/presell/gif/module1.gif"
              alt=""
            />
            <img
              v-else
              ref="moduleOne"
              class="page_gif"
              src="@/assets/images/presell/gif/module1.png"
              alt=""
            />
          </div>
        </div>
        <div class="presell_time_wrap">
          <div class="presell_time_info">
            <div class="presell_time_info_left">
              <h3>{{$t('预售开始')}}</h3>
              <div class="presell_time" v-html="timeHtml">
                <p>0</p><i>d</i><p>0</p><i>h</i><p>0</p><i>m</i>
              </div>
            </div>
            <div class="presell_time_info_right">
              <img
                v-if="scroll.moduleTwo === 2"
                ref="moduleTwo"
                class="page_gif"
                src="@/assets/images/presell/gif/module2.gif"
                alt=""
              />
              <img
                v-else
                ref="moduleTwo"
                class="page_gif"
                src="@/assets/images/presell/gif/module2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w">
      <Conversion />
    </div>
    <!-- 模块二 -->
    <div class="presell_module_two">
      <div class="w">
        <div class="presell_module_left">
          <h3 class="min_tit">{{$t('合约信息')}}</h3>
          <div class="pc_show">
            <ul>
              <li><span>{{$t('全称')}}</span><i>TOTO</i></li>
              <li><span>{{$t('简称')}}</span><i>TOTO</i></li>
              <li><span>{{$t('发行网络')}}</span><i>BSC{{$t('主网')}}</i></li>
            </ul>
            <ul>
              <li><span>{{$t('通证标准')}}</span><i>EHT</i></li>
              <li>
                <span>{{$t('浏览器查询')}}</span>
                <a target="_banlk" :href="'https://bscscan.com/token/' + totoContractAddress">查看</a>
              </li>
              <li><span>{{$t('精度')}}</span><i>18</i></li>
            </ul>
            <ul>
              <li><span>{{$t('合约地址')}}</span><i :title="totoContractAddress">{{ totoContractAddress }}</i></li>
            </ul>
          </div>
          <div class="mobile_show">
            <ul>
              <li><span>{{$t('全称')}}</span><i>TOTO</i></li>
              <li><span>{{$t('简称')}}</span><i>TOTO</i></li>
              <li><span>{{$t('精度')}}</span><i>18</i></li>
            </ul>
            <ul>
              <li><span>{{$t('发行网络')}}</span><i>BSC{{$t('主网')}}</i></li>
              <li><span>{{$t('通证标准')}}</span><i>EHT</i></li>
              <li>
                <span>{{$t('浏览器查询')}}</span>
                <a target="_banlk" :href="'https://bscscan.com/token/' + totoContractAddress">跳转</a>
              </li>
            </ul>
            <ul>
              <li class="max"><span>{{$t('合约地址')}}</span><i :title="totoContractAddress">{{ totoContractAddress }}</i></li>
            </ul>
          </div>

        </div>
        <div class="presell_module_right pc_show">
          <img
            v-if="scroll.moduleThree"
            ref="moduleThree"
            class="page_gif"
            src="@/assets/images/presell/gif/module3.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleThree"
            class="page_gif"
            src="@/assets/images/presell/gif/module3.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 模块三 -->
    <div class="presell_module_three">
      <div class="w">
        <div class="presell_module_three_info">
          <img class="mobile_show" src="@/assets/images/presell/foo1.png" alt="">
          <p>
            HODL TOTO. <br />
            The best betting Infrastructure.
          </p>
          <img
            v-if="scroll.moduleFour === 2"
            ref="moduleFour"
            class="page_gif"
            src="@/assets/images/presell/gif/module4.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleFour"
            class="page_gif"
            src="@/assets/images/presell/gif/module4.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Conversion from "./Conversion";
import scrollGif from '@/utils/scrollGif'
import { mapGetters } from 'vuex'

export default {
  components: {
    Conversion
  },
  data() {
    return {
      timeHtml: null,
      timer: null,
      endTime: 1663462800000, // 结束的时间
      scroll: {
        moduleOne: 1,
        moduleTwo: 1,
        moduleThree: 1,
        moduleFour: 1,
      },
      viewMoreOneBoo: false,
    };
  },
  created() {
    clearInterval(this.timer);
    this.startTimer();
  },
  computed: {
    ...mapGetters('Wallet', ['totoContractAddress'])
  },
  mounted() {
    document.addEventListener('scroll', this.scrollChange)
  },
  destroyed() {
    clearInterval(this.timer);
    document.removeEventListener('scroll', this.scrollChange)
  },
  methods: {
    viewMoreOne() {
      this.viewMoreOneBoo = !this.viewMoreOneBoo
    },
    scrollChange() {
      const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
      const moduleTwo = this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop
      const moduleThree = this.$refs.moduleThree.offsetTop + this.$refs.moduleThree.offsetParent.offsetTop
      const moduleFour =this.$refs.moduleFour.offsetTop + this.$refs.moduleFour.offsetParent.offsetTop
      const domList = [
        { label: 'moduleOne', value: moduleOne, time: 6 },
        { label: 'moduleTwo', value: moduleTwo, time: 5 },
        { label: 'moduleThree', value: moduleThree, time: 5 },
        { label: 'moduleFour', value: moduleFour, time: 5 }
      ]
      scrollGif(this, domList)
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (new Date().getTime() > this.endTime) {
          clearInterval(this.timer);
          this.timeHtml = `<i>${this.$t('预售进行中')}</i>`;
          return;
        } else {
          this.timeHtml = this.showTime();
        }
      }, 1000);
    },
    showTime() {
      var nowTime = new Date().getTime();
      var remianAllSeconds = Math.floor((this.endTime - nowTime) / 1000); // 剩余时间
      var remainDay = Math.floor(remianAllSeconds / (60 * 60 * 24)); // 剩余天数
      var remainHour = Math.floor((remianAllSeconds / (60 * 60)) % 24); // 剩余小时
      var remainMinute = Math.floor((remianAllSeconds / 60) % 60); // 剩余分
      var remainSecond = Math.floor(remianAllSeconds % 60); // 剩余秒
      return `<p>${remainDay}</p><i>d</i><p>${remainHour}</p><i>h</i><p>${remainMinute}</p><i>m</i><p>${remainSecond}</p><i>s</i>`;
    }
  }
};
</script>

<style scoped>
@import "~@/styles/presell.css";
</style>
