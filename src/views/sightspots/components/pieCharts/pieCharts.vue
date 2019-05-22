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
import { setTimeout } from "timers";

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
    Dataset: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      option: optionData,
      chart: null,
      xh_Height: 0,
    };
  },
  watch: {
    height: {
      handler: function(newVal) {
        let self = this;
        setTimeout(function() {
          if (self.chart) {
            self.chart.resize();
          }
        }, 400);
      }
    },
    Dataset: {
      handler: function(newVal) {
        let self = this;
        console.log("图表1接受到的数据");
        setTimeout(function() {
          self.option.dataset.source = newVal;
          console.log("self.option.dataset.source");
          console.log(self.option.dataset.source);
          self.option.series = [];
          for (var i = 1; i < newVal.length; i++) {
            self.option.series.push({
              type: "line",
              smooth: true,
              seriesLayoutBy: "row"
            });
          }
          self.option.series.push({
            type: "pie",
            id: "pie",
            radius: "45%",
            center: ["85%", "50%"],
            label: {
              formatter: ["{b}", "({d}%)"].join("\n")
            },
            encode: {
              itemName: "time",
              x: "time"
            }
          });
          self.initChart();
        });
      },
      // immediate: true
    }
  },
  mounted() {
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.on("updateAxisPointer", event => {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          this.chart.setOption({
            series: [
              {
                id: "pie",
                label: {
                  formatter: ["{b}", "{@[" + dimension + "]}", "({d}%)"].join(
                    "\n"
                  )
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            ]
          });
        }
      });
      this.chart.setOption(this.option);
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
