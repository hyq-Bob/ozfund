<template>
  <div class="two_page">
    <div class="two_page_top mobile_show">
      <img @click="$router.push('/dynamic')" src="@/assets/images/back.png" alt="">
      <p>常见问题</p>
    </div>
    <ul class="mobile_qa_ul">
      <li class="mobile_qa_li">
        <p class="mobile_qa_li_tit">A类问题</p>
        <ul class="mobile_qa_min_ul">
          <li v-for="(item, index) in qaList" :key="index" class="mobile_qa_min_li" @click="clickQq(item)" :class="{ 'cur': item.open }">
            <p>{{ item.label }} <img src="@/assets/images/qa/arrow.png" alt=""></p>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </li>
      <li class="mobile_qa_li">
        <p class="mobile_qa_li_tit">B类问题</p>
        <ul class="mobile_qa_min_ul">
          <li v-for="(item, index) in qaList" :key="index" class="mobile_qa_min_li" @click="clickQq(item)" :class="{ 'cur': item.open }">
            <p>{{ item.label }} <img src="@/assets/images/qa/arrow.png" alt=""></p>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </li>
    </ul>
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
  .two_page {
    background: #FFFFFF;
  }
  .mobile_qa_ul {
    padding: 0 20px;
    width: 100%;
    .mobile_qa_li_tit {
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #333333;
      font-weight: 500;
      border-bottom: 1px solid rgba(230,230,230,1);
      padding: 20px 0 12px;
    }
  }
  .mobile_qa_min_ul {
    .mobile_qa_min_li {
      border-bottom: 1px solid rgba(230,230,230,1);
      padding: 18px 0;
      &.cur {
        span {
          display: block;
        }
        img {
          transform: rotate(0);
          transition: all .2s ease;
        }
      }
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333333;
        img {
          width: 16px;
          transform: rotate(-90deg);
        }
      }
      span {
        font-size: 14px;
        color: #333333;
        margin-top: 13px;
        display: none;
      }
    }
  }
</style>