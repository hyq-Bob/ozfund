import { getProblem } from "@/api/problem";
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
      problemList: [],
    };
  },
  created() {
    
    getProblem({
      pageNo: 1,
      pageSize: 100,
    }).then(({ data }) => {
      let { data: dataInfo } = data || {};
      let filterInfo = dataInfo.data.filter(
        (item) => item.language == langeMapping[getToken("OZFUND_LANG")]
      );

      this.problemList = filterInfo.map((item) => ({
        title: item.subject,
        id: item.id,
        isOpen: false,
        children: [
          {
            id: `${item.id}-1`,
            summary: item.content,
          },
        ],
      }));
    });
  },
};
