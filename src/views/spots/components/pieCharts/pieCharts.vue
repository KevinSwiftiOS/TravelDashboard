<template>
  <div>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
    <slot></slot>
  </div>
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils";
import { optionData } from "./util";

export default {
  props: {
    id: {
      type: String,
      default: "container"
    },
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
    spotComparedData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      option: optionData,
      chart: null,
      xh_Height: 0
    };
  },
  watch: {
    spotComparedData: {
      handler: function(newVal) {
        console.log(newVal);
        let data = newVal.map((item, index) => {
            console.log(item)
            return item;
        })
        this.option.dataset.source = data;
        // this.initChart();
        // setTimeout(function() {
        //   this.chart = echarts.init(document.getElementById(this.id));
        //   this.chart.on("updateAxisPointer", function(event) {
        //     var xAxisInfo = event.axesInfo[0];
        //     if (xAxisInfo) {
        //       var dimension = xAxisInfo.value + 1;
        //       this.chart.setOption({
        //         series: {
        //           id: "pie",
        //           label: {
        //             formatter: "{b}: {@[" + dimension + "]} ({d}%)"
        //           },
        //           encode: {
        //             value: dimension,
        //             tooltip: dimension
        //           }
        //         }
        //       });
        //     }
        //   });
        //   this.chart.setOption(this.option, true)
        // });
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
    this.initChart();
    // this.setTimeout();
    this.resize();
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
    // setTimeout() {

    //   this.chart.setOption(this.option, true);
    // },
    initChart() {
        console.log()
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
