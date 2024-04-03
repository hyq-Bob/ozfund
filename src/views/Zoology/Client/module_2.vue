<template>
  <div class="zoology_module_two">
    <div class="content-box">
      <div class="zoology_module_left">
        <img v-animation class="page_png" :data-gif_url="require('@/assets/images/zoology/gif/module2.gif')" alt="" />
      </div>
      <div class="zoology_module_right">
        <h3 class="min_tit">{{ $t("global.ozbet") }}</h3>

        <!-- <p>{{ $t("zoology.ozbetInfo") }}</p> -->
        <Clamp className="content" :content='$t("zoology.ozbetInfo")' />
        <div class="btn" @click="goOzbet">
          {{ $t("zoology.clickIn") }} {{ $t("global.ozbet") }}
          <arrowIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import logicModule from "../logic";
export default {
 ...logicModule
};
</script>

<style lang="scss" scoped>
.zoology_module_two {
  padding: 0.5rem;

  .content-box {
    display: flex;
    width: var(--content-w);
    align-items: center;
    margin: 0 auto;
    column-gap: 0.68rem;
  }

  .zoology_module_left {
    width: 4.74rem;
    height: 4.04rem;
    flex-grow: 0;
    flex-shrink: 0;

    >img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .zoology_module_right {
    flex: 1;
    font-family: PingFangSC-Medium;

    h3 {
      font-family: PingFangSC-Medium;
      letter-spacing: 0;
      font-size: 0.4rem;
      color: #333;
      line-height: 0.68rem;
      font-weight: 500;
    }

    .content {
      font-size: 0.14rem;
      color: #666;
      line-height: 0.24rem;
      font-weight: 200;
      margin: 0.24rem 0 0.2rem;
      text-align: left;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.12rem;
      height: 0.48rem;
      min-width: 1.83rem;
      background: #ffc200;
      border-radius: 0.1rem;
      font-size: 0.18rem;
      color: #fff;
      border: none;
      white-space: nowrap;
      cursor: pointer;
      column-gap: 0.15rem;
      transition: all 0.5s;

      &:hover {
        column-gap: 0.2rem;
      }

      svg {
        font-size: 0.16rem;
        width: 0.16rem;
        height: 0.16rem;
      }
    }
  }
}
</style>
