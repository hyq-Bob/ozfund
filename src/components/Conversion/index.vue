<template>
  <div class="conversion">
    <div v-if="type === 'b-o'" class="conversion_top">
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>从</p>
          <span
            >数量：<i class="busd_number">{{ busdBalance }}</i>BUSD
            <i class="conver_oper">最大限度</i></span
          >
        </div>
        <div class="conversion_info_input">
          <p>BUSD</p>
          <input id="usdt" type="number" placeholder="0" />
        </div>
      </div>
      <div @click="this.transitionBtn" class="conversion_icon">
        <img src="@/assets/images/purchase/icon.png" alt="" />
      </div>
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>至</p>
          <span>数量：<i class="ozc_number">{{ ozcBalance }}OZC</i></span>
        </div>
        <div class="conversion_info_input">
          <p>Ozcoin</p>
          <input readonly id="ozc" type="number" placeholder="0" />
        </div>
      </div>
    </div>
    <div v-else class="conversion_top">
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>从</p>
          <span
            >数量：<i class="ozc_number">{{ ozcBalance }}</i>OZC
            <i class="conver_oper">最大限度</i></span
          >
        </div>
        <div class="conversion_info_input">
          <p>Ozcoin</p>
          <input readonly id="ozc" type="number" placeholder="0" />
        </div>
      </div>
      <div @click="this.transitionBtn" class="conversion_icon">
        <img src="@/assets/images/purchase/icon.png" alt="" />
      </div>
      <div class="conversion_info">
        <div class="conversion_info_top">
          <p>至</p>
          <span>数量：<i class="busd_number">{{ busdBalance }}</i>BUSD </span>
        </div>
        <div class="conversion_info_input">
          <p>BUSD</p>
          <input id="usdt" type="number" placeholder="0" />
        </div>
      </div>
    </div>
    <button
      @click="this.conversionBtn"
      id="conversionBtn"
      class="conversion_btn"
    >
      兑换
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      type: "b-o"
    };
  },
  computed: {
    ...mapGetters('Wallet', ['busdBalance', 'ozcBalance'])
  },
  methods: {
    transitionBtn() {
      if (this.type === "b-o") {
        this.type = "o-b";
      } else {
        this.type = "b-o";
      }
    },
    conversionBtn() {
      console.log("dianji");
    }
  }
};
</script>

<style scoped>
@import "~@/styles/conversion.css";
</style>
