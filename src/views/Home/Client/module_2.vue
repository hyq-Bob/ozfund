<template>
  <div class="home_module_two">
    <div class="w" :style="{ alignItems: toggle ? 'flex-end' : 'center' }">
      <div class="home_module_left">
        <img
          v-animation
          class="page_png"
          :data-gif_url="require('@/assets/images/home/gif/moduleTwo.gif')"
          alt=""
        />
      </div>
      <div class="home_module_right">
        <h3>{{ $t("home.foundation") }}</h3>
        <!-- <p >{{ $t("home.info") }}</p> -->
        <clamp :content="$t('home.info')" className="summary" />
        <p>{{ $t("home.webSite") }}</p>
        <div class="button_report_w">
          <button @click="viewePdf.call(this, 'Oz-White-Paper.pdf')">
            <!-- <a  target="_blank" href="/static/Oz-White-Paper.pdf"> -->
            {{ $t("home.view") }}{{ $t("home.whitePaper") }}
            <img src="@/assets/images/home/arrow2.png" alt="" />
            <!-- </a> -->
          </button>
          <button class="button_report">
            <a
              target="_blank"
              href="https://beosin.com/audits/Ozfund_202212071800.pdf"
            >
              {{ $t("home.view") }}{{ $t("home.auditReport") }}
              <img src="@/assets/images/home/arrow22.png" alt="" />
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { viewePdf } from "@/utils/base.js";
import Clamp from "../../components/clamp.vue";
export default {
  components: {
    Clamp,
  },
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    viewePdf,
    isFold(toggle, expanded) {
      toggle();
      this.toggle = expanded;
    },
  },
};
</script>

<style lang="scss" scoped>
.home_module_two {
  background: #fff;
  padding: 1.06rem 0 2.26rem;
  margin-top: 0.6rem;

  .w {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    column-gap: 30px;
  }

  .home_module_left {
    width: 45%;
  }

  .home_module_right {
    width: 46%;

    h3 {
      font-family: PingFangSC-Medium;
      letter-spacing: 0;
      font-size: 0.4rem;
      color: #333;
      line-height: 0.44rem;
      font-weight: 500;
      margin-bottom: 0.24rem;
    }

    p,
    .summary {
      font-size: 0.14rem;
      color: #666666;
      font-weight: 200;
      text-align: justify;
      text-align: left;
      line-height: 24px;
    }

    button {
      padding: 0 0.15rem;
      height: 0.48rem;
      background: #ffc200;
      border-radius: 0.1rem;
      font-size: 0.18rem;
      color: #fff;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      &.button_report {
        background: transparent;
        color: #ffc200;
        border: 1px solid #ffc200;
        margin-left: 0.2rem;
      }

      &:hover {
        img {
          transform: translateX(5px);
        }
      }

      a {
        color: inherit;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 100%;
      }

      img {
        width: 0.16rem;
        margin-left: 0.1rem;
        transition: all 0.5s ease;
      }
    }
  }
}

.button_report_w {
  display: flex;
  margin-top: 0.2rem;
}
</style>
