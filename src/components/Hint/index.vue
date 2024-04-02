<template>
  <div v-if="modal.show" class="modal_wrap modal_wrap2">
    <div class="modal">
      <img
        @click="closeClickModal"
        class="modal_close"
        src="@/assets/images/purchase/modalClose.png"
        alt=""
      />
      <div class="modal_head">
        <p class="modal_head_tit">{{ modal.title }}</p>
      </div>
      <div class="modal_body">
        <img v-if="modal.type === 'connectWallet'" class="modal_status_img2" src="@/assets/images/metamask.png" alt="">
        <div v-else>
          <img v-show="modal.status === 1" class="modal_status_img" src="@/assets/images/success.png" alt="">
          <img v-show="modal.status === 2" class="modal_status_img" src="@/assets/images/error.png" alt="">
          <img v-show="modal.status === 3" class="modal_status_img" src="@/assets/images/warning.png" alt="">
        </div>
        <p class="modal_body_txt">{{ modal.txt }}</p>
        <button class="modal_body_btn" @click="modalBtn">{{ modal.type === 'hint' ? $t('global.confirm') : $t('global.connect') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: {
        title: '',
        type: 'hint', // hint || connectWallet
        show: false,
        status: 1, // 1是成功 2是失败 3是警告
        txt: '',
        cb: null
      }
    }
  },
  methods: {
    closeClickModal(){
      this.modal.show = false
    },
    close() {
      this.modal = {
        title: '',
        type: 'hint', // hint || connectWallet
        show: false,
        status: 1, // 1是成功 2是失败
        txt: '',
        cb: null
      }
    },
    modalBtn() {
      if (this.modal.type === 'hint') return this.close()
      if (this.modal.cb) this.modal.cb()
    }
  }
}
</script>