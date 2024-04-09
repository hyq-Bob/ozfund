/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-26 12:54:40
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-07 17:26:18
 * @FilePath: /ozfund-mobile/src/views/Progress/logic/index.js
 * @Description: 进程逻辑
 */
import { getProcess } from "@/api/process";
import { getToken } from "@/utils/auth.js";
import dayjs from "dayjs";
// setToken("OZFUND_LANG", "en");
const langeMapping = {
  zh: 1,
  tc: 2,
  en: 3,
  jpn: 4,
};
export default {
  filters:{
    formatTime(val){
      return dayjs(val).format("YYYY.MM")
    }
  },
  data() {
    return {
      timeAxisInfo: [],
    };
  },
  watch:{
    "$i18n.locale"(){
      this.getPageData()
    }
  },
  created() {
    this.getPageData()
  },
  methods:{
    getPageData(){
      getProcess({
        pageNo: 1,
        pageSize: 100,
      }).then(({ data = {} }) => {
        let { data: dataInfo } = data;
        let filterInfo = dataInfo.data.filter(
          (item) => item.language == langeMapping[getToken("OZFUND_LANG")]
        );
        filterInfo = filterInfo.sort((prv, next) =>
          dayjs(prv.time).isAfter(dayjs(next.time)) ? -1 : 1
        );
        this.timeAxisInfo = filterInfo;
      });
    }
  }
};
