<template>
  <ul :class="[isLine ? 'inline' : 'link']">
    <li
      :class="[item.children ? 'child' : 'no_child']"
      v-for="(item, idx) in webSiteLinkCut"
      :key="item.label + idx"
    >
      <div class="title" @click="itemClick(item)">
        <span v-if="item.label">{{ $t(item.label) }}</span>
        <img v-else :src="item.imgUrl" alt="" />
        <template v-if="item.children">
          <van-icon class="arrow" v-show="item.toggleShow" name="arrow-down" />
          <van-icon class="arrow" v-show="!item.toggleShow" name="arrow-up" />
        </template>
      </div>
      <template v-if="item.children">
        <WebSiteLinkItem
          v-show="item.toggleShow"
          :webSiteLinkCut="item.children"
          :isLine="item.inline"
        />
      </template>
    </li>
  </ul>
</template>

<script>
import { Icon } from "vant";
import { viewePdf } from "@/utils/base.js";
export default {
  name: "WebSiteLinkItem",
  components: { Icon },
  props: {
    isLine: {
      type: Boolean,
      default: false,
    },
    webSiteLinkCut: {
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    itemClick(crt) {
      let { children = [], href = "", target, toggleShow = false } = crt;
      if (children.length) {
        crt.toggleShow = !toggleShow;
      } else {
        if (href.endsWith(".pdf")) {
          viewePdf.call(this,href.split('/').at(-1),target);
          return
        }
        window.open(href, target, true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

img {
  width: 0.8rem;
  height: 0.8rem;
  object-fit: contain;
}

.arrow {
  font-size: 0.26rem;
  color: #666;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  color: #222;
}

.link {
  .no_child {
    display: flex;
    min-height: 0.84rem;
    align-items: center;
    background: #f7f7f7;
    border-radius: 0.14rem;
    padding-left: 0.2rem;

    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }
  }

  .child {
    min-height: 0.84rem;
    background: #f7f7f7;
    border-radius: 0.14rem;
    padding-left: 0.2rem;

    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }

    .title {
      height: 0.84rem;
      font-size: 0.28rem;
      padding-right: 0.2rem;
      color: #222;
    }

    .inline {
      padding-bottom: 0.2rem;
      .no_child {
        margin-bottom: 0;
      }
    }

    .link {
      .no_child {
        min-height: auto;
        margin-bottom: 0;
      }

      .title {
        height: auto;
        margin: 0.15rem 0;
        font-size: 0.24rem;
        color: #666;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
