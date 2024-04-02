<template>
  <div  class="animate__animated animate__bounceInRight">
    <!-- 模块一 -->
    <div class="dynamic_module_one">
      <div class="w">
        <div class="dynamic_module_left pc_show">
          <h3 class="max_tit">公告</h3>
        </div>
        <div class="dynamic_module_right">
          <img
            v-if="scroll.moduleOne === 2"
            ref="moduleOne"
            class="page_gif"
            src="@/assets/images/dynamic/gif/module2.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleOne"
            class="page_gif"
            src="@/assets/images/dynamic/gif/module2.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 模块二 -->
    <div class="dynamic_module_two">
      <div class="w">
        <h3 class="max_tit mobile_show">{{$t('动态')}}</h3>
        <ul class="news_list">
          <li>
            <p>我是公告标题</p>
            <span>
              我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容
            </span>
          </li>
          <li>
            <p>我是公告标题</p>
            <span>
              我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容
            </span>
          </li>
          <li>
            <p>我是公告标题</p>
            <span>
              我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容
            </span>
          </li>
          <li>
            <p>我是公告标题</p>
            <span>
              我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容
            </span>
          </li>
          <li>
            <p>我是公告标题</p>
            <span>
              我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 模块三 -->
    <QA></QA>
  </div>
</template>

<script>
import scrollGif from '@/utils/scrollGif'
import QA from '@/components/QA'

export default {
  components: { QA },
  data() {
    return {
      qaList: [
        {
          label: this.$t("如何获得OZC"),
          value: this.$t('如何获得OZCanswer')
        },
        {
          label: this.$t("如何获得TOTO"),
          value: this.$t('如何获得TOTOanswer')
        },
        {
          label: this.$t("投注返水规则是什么"),
          value: this.$t('投注返水规则是什么answer')
        },
        {
          label: this.$t("VIP会员福利有什么"),
          value: this.$t('VIP会员福利有什么answer')
        },
        {
          label: this.$t("如何成为Ozbet代理合作伙伴"),
          value: this.$t('如何成为Ozbet代理合作伙伴answer')
        }
      ],
      scroll: {
        moduleOne: 1,
      }
    };
  },
  watch: {
    '$i18n.locale'() {
      this.qaList = [
        {
          label: this.$t("如何获得OZC"),
          value: this.$t('如何获得OZCanswer')
        },
        {
          label: this.$t("如何获得TOTO"),
          value: this.$t('如何获得TOTOanswer')
        },
        {
          label: this.$t("投注返水规则是什么"),
          value: this.$t('投注返水规则是什么answer')
        },
        {
          label: this.$t("VIP会员福利有什么"),
          value: this.$t('VIP会员福利有什么answer')
        },
        {
          label: this.$t("如何成为Ozbet代理合作伙伴"),
          value: this.$t('如何成为Ozbet代理合作伙伴answer')
        }
      ]
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollChange)
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollChange)
  },
  methods: {
    scrollChange() {
      const moduleOne = this.$refs.moduleOne.offsetTop + this.$refs.moduleOne.offsetParent.offsetTop
      const domList = [
        { label: 'moduleOne', value: moduleOne, time: 6 },
      ]
      scrollGif(this, domList)
    },
    clickQq(v) {
      if (v.open) return this.$set(v, "open", false);
      return this.$set(v, "open", true);
    }
  }
};
</script>

<style scoped>
@import "~@/styles/dynamic.css";
</style>
