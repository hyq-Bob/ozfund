<template>
  <div id="curve" ref="chart"></div>
</template>

<script>
import { isMobile } from "@/utils/base";
const echarts = require("echarts");
export default {
  props: {
    time: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pieChart: null,
    };
  },
  watch: {
    time() {
      this.initChart();
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    isMobile,
    initChart() {
      let options = {
        color: [
          "#ff9053",
          "#3dea97",
          "#0385f3",
          "#ffc300",
          "#6478e0",
          "#9ebfff",
        ],
        tooltip: {
          trigger: "item",
          formatter: '{b} {d}%'
        },
        legend: {
          show: false,
        },
        series: [
          {
            type: "pie",
            radius: ["70%", "90%"],
            labelLine:{  
              normal:{  
                    length:50  
                }  
            },
            label: {
              show: true,
              formatter:function({value}){
                return value + "%"
              }
            },
            data: [
              { value: 10, name: this.$t("purchaseAndPledge.vipPoolMining") },
              { value: 15, name: this.$t("purchaseAndPledge.supporters") },
              { value: 30, name: this.$t("purchaseAndPledge.foundation") },
              { value: 20, name: this.$t("purchaseAndPledge.members") },
              { value: 5, name: this.$t("purchaseAndPledge.liquidity") },
              { value: 20, name: this.$t("purchaseAndPledge.poolMining") },
            ],
          },
        ],
      };
      this.$nextTick(() => {
        this.pieChart = echarts.init(this.$refs.chart);
        this.pieChart.setOption(options);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#curve {
  min-height: 2.45rem;
  width: 100%;
}
</style>
