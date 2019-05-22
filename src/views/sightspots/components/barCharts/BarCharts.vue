<template>
  <div :class="className" :id="id" :style="{height:height,width:width}">
    <slot></slot>
  </div>
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils";
import { optionData } from "./util";
import {getSpotBarchartsNumber} from "../../../../api/sightspots.js"
export default {
  name: "BarCharts",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "23vh"
    },
    id: {
      type: String,
      default: "container"
    },
    spotsNumberData:{
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      chart: null,
      option: optionData,
    //   currSpot:""
    };
  },
  watch: {
    spotsNumberData: {
      handler: function(newVal) {
        let data = newVal.map((item, index) => {
          return item;
        });
        data.map((item, index) => {
          this.option.series.map((d, i) => {
            if (d.name === item.name) {
              d.data = item.data;
            }
          });
        });
        this.initChart();
      },
      deep: true
    },
    height: {
      handler: function(newVal) {
        let self = this;
        setTimeout(function() {
          if (self.chart) {
            self.chart.resize();
          }
        }, 400);
      }
    }
  },
  mounted() {
    this.loadChart();
    // this.initChart();
    // this.resize()
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //设置图表数据
    loadChart() {
      getSpotBarchartsNumber({
          currSpot:"千岛湖"
      }).then(res => {
        this.option.xAxis[0].data = res.data.timeList;
        this.initChart();
        this.resize();
      });
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option, true);
    },
    resize() {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
  }
};
</script>

<style scoped>
</style>