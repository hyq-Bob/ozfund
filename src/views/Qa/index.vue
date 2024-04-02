<template>
  <div>
    <div class="qa_banner">
      <div class="w">
        <div class="qa_banner_left">
          <h2>{{$t('常见问题')}}</h2>
          <p>{{$t('fqaTxt')}}</p>
        </div>
        <div class="qa_banner_right">
          <img
            v-if="scroll.moduleTwo === 2"
            ref="moduleTwo"
            class="page_gif"
            src="@/assets/images/dynamic/gif/qa.gif"
            alt=""
          />
          <img
            v-else
            ref="moduleTwo"
            class="page_gif"
            src="@/assets/images/dynamic/gif/qa.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="w">
      <div class="qa_info">
        <ul class="qa_type_ul">
          <li class="qa_type_li">
            <p class="qa_type_p">{{$t('常见问题')}}</p>
            <ul class="qa_ul">
              <li v-for="(item, index) in qaList" :key="index" @click="clickQq(item)" :class="{ 'cur': item.open }">
                <div class="qa_ul_tit">
                  <p><i></i>{{ item.label }}</p>
                  <img src="@/assets/images/qa/arrow.png" alt="">
                </div>
                <span>{{ item.value }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import scrollGif from '@/utils/scrollGif'

export default {
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
        moduleTwo: 1,
      }
    };
  },
  mounted() {
    document.addEventListener('scroll', this.scrollChange)
    if (document.documentElement.clientWidth <= 480) this.$router.push('/qa/mobile')
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollChange)
  },
  methods: {
    scrollChange() {
      const moduleTwo = this.$refs.moduleTwo.offsetTop + this.$refs.moduleTwo.offsetParent.offsetTop
      const domList = [
        { label: 'moduleTwo', value: moduleTwo, time: 5 },
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

<style scoped lang='scss'>
  @import "~@/styles/qa.scss";
</style>