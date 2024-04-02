<template>
  <div class="_modal">
    
    <div :class='["content", this.class]' :style="style">
      <i class="close"></i>
      <div>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalScope',
  props:{
    style:{
      require:false,
      default :()=>{}
    },
    class:{
      require:false,
      default :''
    }
  }
}
</script>

<style lang="scss" scoped>
._modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(28, 28, 28, 0.5);
  z-index: 99999;
}
.content{
  width: 3.5rem;
  height: max-content;
  padding: 0 .24rem .3rem;
  margin-top: .4rem;
}
.close{
  display: flex;
  justify-content: flex-end;
}
</style>