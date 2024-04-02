<template>
  <div v-if="expanded" :class='["html-box",className]'>
    <span
      v-html="oldContent"
      ref="htmlStr"
      @click="isToggle(!expanded)"
    ></span>
  </div>
  <VueClamp v-else autoresize :max-lines="maxLines" :class="className" :tag="tag">
    {{ content }}
    <template #after="{ expanded, clamped}">
      <span
        v-if="clamped || expanded"
        @click="isToggle(!expanded)"
        class="toggle"
      >
        {{ expanded ? $t("global.fold") : $t("global.expand") }}
      </span>
    </template>
  </VueClamp>
</template>

<script>
import VueClamp from "vue-clamp";
export default {
  props: {
    className:{
      type:String,
      default:''
    },
    content: {
      type: String,
      default: "",
    },
    maxLines: {
      type: Number,
      default: 5,
    },
    tag:{
      type:String,
      default:'div'
    }
  },
  // computed:{
  //   className:function(){
  //     return this.class
  //   }
  // },
  data() {
    return {
      expanded: false,
      oldContent: this.content,
    };
  },
  watch: {
    expanded: function(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.oldContent =
            this.content +
            ` <span class="toggle">
          ${this.$t("global.fold")}
        </span>`;
        });
      } else {
        this.oldContent = this.content;
      }
    },
  },
  components: { VueClamp },
  methods: {
    isToggle(isExpand) {
      this.expanded = isExpand;
    },
  },
};
</script>
<style lang="scss" scoped>
.html-box {
  display: inline-flex;
  flex-wrap: wrap;
  .html-content {
    display: inline;
  }
  .toggle {
    text-wrap: nowrap;
  }
}
</style>
