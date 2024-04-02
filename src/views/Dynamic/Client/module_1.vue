<template>
  <div class="dynamic_module_one">
    <div class="content-box">
      <div class="dynamic_module_left">
        <h3 class="max_tit">{{ $t('nav.trends') }}</h3>
      </div>
      <div class="dynamic_module_right">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/dynamic/gif/module2.gif')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.dynamic_module_one {
  background: url('../../../assets/images/dynamic/bg4.png') no-repeat;
  background-size: 100% 100%;
  padding-top: .6rem;
  padding-bottom: .25rem;

  .content-box {
    display: flex;
    width: var(--content-w);
    margin: 0 auto;
    justify-content: center;
  }


  .dynamic_module_left {
    margin-top: 1.52rem;
    margin-right: 1.7683rem;
    h3 {
      font-family: PingFangSC-Medium;
      font-size: .56rem;
      color: #333;
      letter-spacing: 0;
      line-height: .68rem;
      font-weight: 500;
    }
  }
    .dynamic_module_right {
      margin-top: -.3rem;
      width: 7.3093rem;
      height: 5.26rem;
    }
  }
</style>