<template>
  <div id="curve" ref="chart"></div>
</template>

<script>
import { isMobile } from "@/utils/base";
const echarts = require("echarts");
export default {
  data() {
    return {
      pieChart: null,
      options: {
        title: {
          text: "Jul19,2022,02:12PM",
          padding: [0, isMobile() ? 0 : 40],
          textStyle: {
            color: "#999",
            fontWeight: 400,
            fontFamily: "PingFangSC-Regular",
            fontSize: isMobile() ? 24 : 16,
          },
        },
        legend: { show: false },
        xAxis: {
          show: !isMobile(),
          type: "category",
          boundaryGap: false,
          data: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
          axisLine: { show: false },
          axisLabel: {
            fontSize: 16,
            color: "#666",
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          show: false,
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          axisPointer: {
            type: "line",
            lineStyle: {
              type: "solid",
              color: "rgba(3,133,242, 0.3)",
            },
          },
        },
        grid: {
          left: 0,
          right: isMobile() ? 0 : 35,
          bottom: 0,
          top: isMobile() ? 30 : 0,
          containLabel: !isMobile(),
        },

        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            lineStyle: {
              // 线条样式配置
              width: isMobile() ? 1 : 2, // 设置线条粗细为2像素
            },
            itemStyle: {
              color: "#0385F2",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#ebf5fe" },
                  { offset: 1, color: "#FFFF" },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    isMobile,
    initChart() {
      this.$nextTick(() => {
        this.pieChart = echarts.init(this.$refs.chart);
        this.pieChart.setOption(this.options);
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
