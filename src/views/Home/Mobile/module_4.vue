<template>
  <div class="btn-box">
      <div class="btn-item hover" @click="ecologicalToken">
        <span class="name">{{ $t("home.token") }}</span>
        <div class="icon">
          <arrowIcon />
        </div>
      </div>
      <div class="btn-item" @click="redemption">
        <span class="name">{{ $t("global.toto") }}{{ $t('home.exchange') }}</span>
        <div class="icon">
          <arrowIcon />
        </div>
      </div>
    </div>
</template>

<script>
import arrowIcon from "@/views/components/arrow.vue";
export default {
  components: {
    arrowIcon,
  },
  methods:{
    // 生态通证
     ecologicalToken(){
        this.jumpTarget('/home/zoology')
     },
    //  TOTO兑换
     redemption(){
      this.jumpTarget("/home/toto")
     },
     jumpTarget(url){
      if(!url) return
      this.$router.push(url)
     }
  }
}
</script>
<style lang="scss" scoped>
.btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    margin: 0.5rem 0 .6rem;
    .btn-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.88rem;
      width: 2.66rem;
      border-radius: 0.2rem;
      padding: 0 .1rem;
      background: #fff;
      border: 1px solid #0385F2;
      column-gap: .3rem;
      &.hover{
        background:#0385F2;
        .name, .icon{
          color: #fff;
        }
      }
    }
    .name {
      font-size: 0.28rem;
      color: #0385F2 ;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .icon {
      display: inline-flex;
      align-items: center;
      border-radius: 50%;
      width: 0.36rem;
      height: 0.36rem;
      color: #0385F2;
    }
  }
</style>