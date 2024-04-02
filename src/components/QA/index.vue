<template>
  <div class="dynamic_module_three">
    <div class="w">
      <h4 class="dynamic_module_tit min_tit">{{ $t('常见问题') }}</h4>
      <p class="dynamic_module_tit_min pc_show">
        {{ $t('fqaTxt') }}
      </p>
      <ul class="dynamic_qa_type">
        <li @click="toQa">
          <p>{{ $t('常见问题') }}</p>
          <img src="@/assets/images/qa/arrow.png" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

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
    toQa() {
      if (document.documentElement.clientWidth <= 480) {
        this.$router.push('/qa/mobile')
      } else {
        this.$router.push('/qa')
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.dynamic_module_three {
  margin-bottom: 80px;
  background: url('~@/assets/images/dynamic/bg6.png') no-repeat;
  background-size: 100% 100%;
}

.dynamic_qa_type {
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: -30px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 30px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    width: 380px;
    margin-bottom: 30px;
    margin-right: 30px;
    cursor: pointer;

    p {
      font-size: 18px;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    img {
      width: 15px;
      transform: rotate(-90deg);
    }
  }
}

@media(max-width: 1219px) {
  .dynamic_qa_type {
    margin-right: -3%;

    li {
      width: 30%;
      margin-right: 3%;
    }
  }
}

@media(max-width: 768px) {
  .dynamic_qa_type {
    margin-right: 0;

    li {
      width: 100%;
      margin-right: 0%;
      margin-bottom: 20px;

      p {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 480px) {
  .dynamic_qa_type {
    margin-top: 15px;
  }

  .dynamic_qa_type li {
    padding: 15px;
    margin-bottom: 10px;
  }
}</style>