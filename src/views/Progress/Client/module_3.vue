<template>
  <div class="dynamic_module_two">
    <div class="w">
      <h4 class="dynamic_module_tit">{{ $t("process.plan") }}</h4>
      <ul class="dynamic_ul">
        <li>
          <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/dynamic/gif/ul4.gif')" alt="" />
          <div class="dynamic_ul_txt">
            <p>{{ $t("global.nft") }}</p>
            <span v-html="$t('process.nftInfo')"></span>
          </div>
        </li>
        <li>
          <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/dynamic/gif/ul1.gif')" alt="" />
          <div class="dynamic_ul_txt">
            <p>{{ $t("global.dao") }}</p>
            <span v-html="$t('process.daoInfo')"></span>
          </div>
        </li>
        <li>
          <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/dynamic/gif/ul2.gif')" alt="" />

          <div class="dynamic_ul_txt">
            <p>{{ $t("process.surroundingIndustries") }}</p>
            <span v-html="$t('process.surroundingIndustriesInfo')"></span>
          </div>
        </li>
        <li>
          <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/dynamic/gif/ul3.gif')" alt="" />

          <div class="dynamic_ul_txt">
            <p>{{ $t("process.projectInclude") }}</p>
            <span v-html="$t('process.projectIncludeInfo')"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {

};
</script>

<style lang="scss" scoped>
// .dynamic_module_two {
// background: url('../../../assets/images/dynamic/bg2.png') no-repeat;
// background-size: contain;
// background-position: right;
// }

.dynamic_module_tit {
  font-family: PingFangSC-Medium;
  font-size: 0.4rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 0.54rem;
}

.dynamic_ul {
  margin-bottom: 0.6rem;

  li {
    display: flex;
    height: 2rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.05),
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    border-radius: 0.2rem;
    padding: 0 0.4rem;

    &:not(:last-child) {
      margin-bottom: 0.24rem;
    }

    img {
      width: 1.2rem;
      height: 1rem;
      aspect-ratio: 1.2 / 1;
      margin-right: 0.4rem;
      object-fit: contain;
    }

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #333;
      margin-bottom: 0.1rem;
    }

    span {
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      color: #666;
      letter-spacing: 0;
      text-align: justify;
      line-height: 0.24rem;
      font-weight: 200;
    }
  }
}
</style>
