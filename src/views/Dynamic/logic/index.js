import { getDynamic } from "@/api/dynamic";
import { getToken } from "@/utils/auth.js";
const langeMapping = {
  zh: 1,
  tc: 2,
  en: 3,
  jpn: 4,
};
export default {
  data() {
    return {
      dynamicList: [],
    };
  },
  created() {
    getDynamic({
      pageNo: 1,
      pageSize: 100,
    }).then(({ data }) => {
      let { data: dataInfo } = data || {};
      let filterInfo = dataInfo.data.filter(
        (item) => item.language == langeMapping[getToken("OZFUND_LANG")]
      );
      this.dynamicList = filterInfo;
    });
  },
};
