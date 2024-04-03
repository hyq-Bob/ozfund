<!--
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-19 17:27:28
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-03 16:54:34
 * @FilePath: /ozfund-mobile/src/views/Zoology/Client/module_3.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="zoology_module_three">
    <div class="content-box">
      <div class="zoology_module_tit">
        <h3 class="min_tit">
          {{ $t("global.ozcoin") }}({{ $t("global.ozc") }})
        </h3>
        <p class="summary">{{ $t("zoology.ozcInfo") }}</p>
      </div>
      <img v-animation class="img page_png" :data-gif_url="require('@/assets/images/zoology/gif/module3.gif')" alt="" />
      <div class="zoology_module_tit">
        <h3 class="min_tit">{{ $t("global.toto") }}</h3>
        <!-- <p>{{ $t("zoology.totoInfo1") }}</p> -->
        <p  v-html='$t("zoology.totoInfo1")'></p>
        <!-- <p>{{ $t("zoology.totoInfo2") }}</p>
        <p>{{ $t("zoology.totoInfo3") }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import clamp from '../../components/clamp.vue';
export default {
  components: { clamp },};
</script>

<style lang="scss" scoped>
.zoology_module_three {
  padding: 1.8rem 0 1.47rem;
  background: url("~@/assets/images/zoology/module2.png") no-repeat;
  background-size: 100% 100%;

  .content-box {
    display: flex;
    width: var(--content-w);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .zoology_module_tit {
    width: 9.84rem;
    text-align: center;
  }

  h3 {
    font-family: PingFangSC-Medium;
    letter-spacing: 0;
    font-size: 0.4rem;
    color: #333;
    line-height: 0.44rem;
    font-weight: 500;
    margin-bottom: 0.24rem;
  }

  .summary,
  p, .content {
    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    color: #666;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.24rem;
    font-weight: 200;
  }

  .img {
    width: 4.6rem;
    height: 3.02rem;
    object-fit: contain;
    margin: 0.64rem 0 0.4rem;
  }
}
</style>
