

import axios from "axios";
import { message } from "ant-design-vue";
import { getToken } from "@/utils/auth";
export default {
  
  data() {
    return {
      email: null,
    };
  },
  methods: {
    // 保存邮箱
    subscribeInfo() {
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!emailReg.test(this.email))
        return message.error(this.$t("tipMessage.email"));
      const langeMapping = {
        zh: 1,
        tc: 2,
        en: 3,
        jpn: 4,
      };
      const pri = process.env.NODE_ENV === "development" ?"/apiCount/":"/"
      axios
        .get(
          `${pri}subscribe?email=${this.email}&language=${
            langeMapping[getToken("OZFUND_LANG")]
          }`
        )
        .then((res) => {
          if (res?.data?.code === 1) {
            this.$refs.hint.modal = {
              title: this.$t("tipMessage.tip"),
              type: "hint", // hint || connectWallet
              status: 1, // 1是成功 2是失败
              show: true,
              txt: this.$t("emailTxt"),
              cb: this.pcLineWalletNext,
            };
            this.email = null;
          }
          if (!res?.data?.code) {
            this.$refs.hint.modal = {
              title: this.$t("tipMessage.tip"),
              type: "hint", // hint || connectWallet
              status: 1, // 1是成功 2是失败
              show: true,
              txt: this.$t("tipMessage.successSubscribed"),
              cb: this.pcLineWalletNext,
            };
            this.email = null;
          }
        });
    },
  },
};