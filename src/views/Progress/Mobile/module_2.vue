<template>
  <div class="progress-module_2">
    <p class="title mb-30">{{ $t("process.plan") }}</p>
    <ul>
      <li v-for="item in dataList" :key="item.title" class="list_items">
        <figure class="module_info">
          <img :src="item.logo" alt="" />
          <p class="title">{{ $t(item.title) }}</p>
          <clamp :content='$t(item.info)' className="figcaption" />
          <!-- <figcaption v-html="$t(item.info)"></figcaption> -->
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import { getProcess } from "@/api/process";
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    Clamp,
  },
  data() {
    return {
      dataList: [
        {
          logo: require("./imgs/NFT.svg"),
          title: "global.nft",
          info: "process.nftInfo",
        },
        {
          logo: require("./imgs/dao.svg"),
          title: "global.dao",
          info: "process.daoInfo",
        },
        {
          logo: require("./imgs/phone.svg"),
          title: "process.surroundingIndustries",
          info: "process.surroundingIndustriesInfo",
        },
        {
          logo: require("./imgs/merge.svg"),
          title: "process.projectInclude",
          info: "process.projectIncludeInfo",
        },
      ],
    };
  },
  created() {
    getProcess().then((result) => {
      console.log("result: ", result);
    });
  },
};
</script>

<style lang="scss" scoped>
.progress-module_2 {
  background: #fdfdfd;
  padding: 0 0.3rem 0;
  .title {
    font-family: PingFangSC-Medium;
    height: 0.68rem;
    font-size: 0.42rem;
    color: #333;
    letter-spacing: 0;
    line-height: 0.68rem;
    font-weight: 500;
    margin-top: -0.2rem;
  }
  .mb-30 {
    margin-bottom: 0.3rem;
  }
  .list_items {
    background: rgba(255, 255, 255, 0.4);
    padding: 0.4rem 0.3rem 0.3rem;
    box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }
    .module_info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      width: 2rem;
      height: 1.6667rem;
      object-fit: contain;
    }
    .title {
      font-family: PingFangSC-Regular;
      min-height: 0.38rem;
      height: auto;
      line-height: 1;
      font-size: 0.32rem;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
      margin-top: 0.4rem;
    }
    .figcaption {
      font-family: PingFangSC-Light;
      font-size: 0.28rem;
      color: #333;
      letter-spacing: 0;
      text-align: justify;
      line-height: 0.38rem;
      font-weight: 200;
      margin-top: 0.2rem;
    }
  }
}
</style>
