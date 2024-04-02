<template>
  <div class="home_module_six">
    <div class="w">
      <div class="home_module_left" ref="moduleFour">
        <img
          class="page_gif"
          src="@/assets/images/home/gif/module55.png"
          alt=""
          gifTime="4"
        />
      </div>
      <div class="home_module_right">
        <img
          src="@/assets/images/home/gif/module51.gif"
          alt=""
          class="home_module_right_gif"
        />
        <div class="home_module_right_content">
          <h3 class="pc_show">
            {{ $t("home.joinEcosystem") }}<br />{{ $t("home.latestUpdates") }}
          </h3>
          <div class="input_email">
            <input
              v-model="email"
              @keyup.enter="subscribeInfo"
              id="emailInput"
              type="text"
              :placeholder="$t('home.placeholderEmailSummary')"
            />
            <div @click="subscribeInfo" class="arrow email_sub">
              <img src="@/assets/images/home/arrow3.png" alt="" />
            </div>
          </div>
        </div>
        <div class="pc_show">
          <div class="head_operate head_operate_mobile">
            <!-- <a @click="langSwitch" href="JavaScript:;"><img src="@/assets/images/home/yuy.png" alt=""/></a> -->
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ"
              ><img src="@/assets/images/home/youtube.png" alt=""
            /></a>
            <a target="_blank" href="https://t.me/ozfundglobal"
              ><img src="@/assets/images/home/tele.png" alt=""
            /></a>
            <a target="_blank" href="https://twitter.com/OzfundOfficial"
              ><img src="@/assets/images/home/tiw.png" alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>
    <Hint ref="hint" /> 
  </div>
</template>

<script>
import logicModule from "../logic";
import Hint from '@/components/Hint/index.vue'
export default {
  ...logicModule,
  components:{Hint},
};
</script>

<style lang="scss" scoped>
.home_module_six {
  padding: 1.09rem 0 0.7rem;
  .w {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .home_module_left {
    margin-right: 1.34rem;
  }
  .home_module_left img {
    width: 2.9231rem;
  }
  .home_module_right_gif {
    width: 1.9rem;
  }
  .home_module_right_content {
    padding-left: 0.73rem;
    margin-top: -0.5rem;
    margin-left: 0.15rem;
  }
  .home_module_right {
    h3 {
      font-size: 0.32rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.2rem;
    }
  }
  .input_email {
    width: 3.9rem;
    height: 0.6rem;
    background: #fff;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 0.16rem;
      padding: 0 0.65rem 0 0.2rem;
      border-radius: 0.08rem;
      border: 1px solid rgba(230, 230, 230, 1);
    }
    .arrow {
      width: 0.6rem;
      height: 100%;
      background: #0385f2;
      border-radius: 0.08rem;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .arrow {
      img {
        width: 0.23rem;
      }
    }
  }
}
</style>
