<template>
  <div class="dynamic_module_two">
    <div class="w">
      <ul class="news_list">
        <li v-for="(item, idx) in dynamicList" :key="idx">
          <p>{{ item.subject }}</p>
          <clamp :content='item.content' className="content" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logicModule from "../logic";
import Clamp from '../../components/clamp.vue';
export default {
  ...logicModule,
  components: {
    Clamp
  },
};
</script>

<style lang="scss" scoped>
.dynamic_module_two {
  background: url("~@/assets/images/dynamic/bg2.png") no-repeat;
  background-size: contain;
  background-position: right;
  margin-top: 0.7rem;
}

.news_list {
  li {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #fff;
    box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.05);
    border-radius: 0.15rem;
    padding: 0.3rem;

    &:not(:last-child) {
      margin-bottom: 0.3rem;
    }

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #333;
      line-height: 0.16rem;
      font-weight: 400;
      margin-bottom: 0.1rem;
    }

    .content {
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      color: #666;
      text-align: left;
      line-height: 0.24rem;
      font-weight: 200;
    }
  }
}
</style>
