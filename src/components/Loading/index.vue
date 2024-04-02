<template>
  <div v-show="loading" class="loading_w">
  <!-- <div class="loading_w"> -->
    <div>
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="loading_txt">{{ $t('tipMessage.walletOperation') }}...</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('Wallet', ['loading'])
    }
  }
</script>

<style lang="scss" scoped>
.loading_w {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: rgba(0,0,0, .2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading_txt {
  margin-top: 20px;
  color: #222;
  font-size: 16px;
}
.loading {
  width: 80px;
  height: 40px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  justify-content: space-evenly;
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: #0385f2;
  -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load {
  0%,
  100% {
    height: 40px;
    background: #0385f2;
  }
  50% {
    height: 70px;
    margin: -15px 0;
    background: #0385f29e;
  }
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.8s;
}
</style>