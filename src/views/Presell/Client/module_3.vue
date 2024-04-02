<template>
  <div class="presell_module_three">
    <div class="presell_module_three_info">
      <p>
        <span v-html="$t('preSale.totoInfo')"></span>
      </p>
      <img v-animation class="page_gif" :data-gif_url="require('@/assets/images/presell/gif/module4.gif')" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.presell_module_three {
  margin: 0.73rem 0 0.49rem;

  .presell_module_three_info {
    width: var(--content-w);
    background: url("~@/assets/images/presell/bg2.png") no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    padding: 0.76rem 0 0.78rem;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 0.2rem;
    margin: 0 auto;
  }

  p {
    width: 5.27rem;
    text-align: left;

    span {
      font-family: DINNextW1G-Medium;
      font-size: 0.4rem;
      color: #333;
      letter-spacing: 0;
      line-height: 0.44rem;
      font-weight: 500;
      white-space: nowrap;

      &:last-child {
        font-size: 0.36rem;
      }
    }
  }

  img.page_gif {
    position: absolute;
    width: 106px;
    top: 46px;
    right: 107px;
  }
}
</style>
