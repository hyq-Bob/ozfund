<template>
  <ul class="lang_list" v-if="isMobile()">
    <li v-for="item in langList" :key="item.value" @click="clickLang(item)">
      {{ item.label }}
    </li>
  </ul>
  <ul class="_menu" v-else>
    <li  class="_menu-items" v-for="item in langList" :key="item.value" @click="clickLang(item)">
      {{ item.label }}
    </li>
  </ul>
  <!-- <menu class="_menu" v-else>
    <menu-item class="_menu-items" v-for="item in langList" :key="item.value" @click="clickLang(item)"> 
      {{ item.label }}
    </menu-item>
  </menu> -->
</template>

<script>
import { Menu } from "ant-design-vue";
import { setToken } from '@/utils/auth'
import { isMobile } from "@/utils/base";
export default {
  components:{
    Menu,
    MenuItem:Menu.Item
  },
  data() {
    return {
      langList: [
        { label: '简体中文', value: 'zh' },
        { label: '繁体中文', value: 'tc' },
        { label: 'English', value: 'en' },
        // { label: 'русский язык', value: 'ru' }, // 俄语
        // { label: '한국어', value: 'kr' }, // 韩语
        { label: '日本語', value: 'jpn' }, // 日语
      ],
    }
  },
  methods: {
    isMobile,
    clickLang(crt) {
      this.$i18n.locale = crt.value
      setToken('OZFUND_LANG', crt.value);
      this.$emit('updateLange')
    },
  },
}
</script>
<style lang="scss" scoped>
._menu{
  background: #fff;
  padding: .15rem .3rem;
  ._menu-items{
    line-height:  .3rem;
    cursor: pointer;
  }
}
.lang_list{
  padding: .2rem 0;
  li{
    display: flex;
    justify-content: center;
    font-size: .3rem;
    height: .46rem;
    line-height: 1;
    &:not(:last-child){
      margin-bottom: .3rem;
  }
}
}
</style>
