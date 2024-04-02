<template>
  <div class="home-5">
    <p class="title">{{$t("home.joinEcosystem")}}{{$t("home.latestUpdates")}}</p>
    <a-input v-model="email" class="input" :placeholder="$t('home.placeholderEmailSummary')">
      <span slot="suffix" @click="subscribeInfo">
        <svg
          width=".44rem"
          height="21.0434783px"
          viewBox="0 0 44 21.0434783"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="2023.3.20"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="1首页"
              transform="translate(-654, -4067)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <g id="编组-5备份-2" transform="translate(30, 4034)">
                <g id="编组" transform="translate(624, 33)">
                  <polygon
                    id="路径"
                    points="34.6592179 8.60869566 0 8.60869566 0 12.4347826 34.6592179 12.4347826 27.0391061 18.3652174 30.480447 21.0434783 44 10.5217392 30.726257 8.69951454e-13 27.2849162 2.67826086"
                  ></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
    </a-input>
    <Hint ref="hint" /> 
  </div>
</template>

<script>
import { Input, Icon } from "ant-design-vue";
import Hint from '@/components/Hint/index.vue'
import logicModule from '../logic'
export default {
  components: {
    AInput: Input,
    AIcon: Icon,
    Hint
  },
  ...logicModule
};
</script>

<style lang="scss" scoped>
.home-5 {
  font-family: PingFangSC-Medium;
  padding: 0 .3rem;
  .title {
    font-family: PingFangSC-Medium;
    line-height: 0.42rem;
    font-size: 0.3rem;
    white-space: nowrap;
    color: #333;
    letter-spacing: 0;
    font-weight: 500;
    margin-bottom: 0.1rem;
  }
  .input {
    height: 0.88rem;
  }
  :global(.ant-input) {
    padding-right: 0.9rem !important;
    height: 0.88rem;
    border-radius: 0.16rem;
    &:placeholder {
      font-size: 0.24rem;
      color: #aaa;
    }
  }
  :global(.ant-input-suffix) {
    display: grid !important;
    place-items: center;
    right: 0 !important;
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 0.16rem;
    background: #0385f2;
  }
}
</style>
