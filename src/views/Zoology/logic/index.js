import arrowIcon from "@/views/components/arrow.vue";
import Clamp from '../../components/clamp.vue';
export default {
  components: {
    arrowIcon,
    Clamp,
  },
  methods: {
    goOzbet() {
      let url = process.env.VUE_APP_OZBET_URL;
      window.open(url, "_blank", true);
    }
  }
}