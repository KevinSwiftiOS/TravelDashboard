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
    list: {
      type: Array,
      // default: () => []
      // required: true
    }
  },
  data() {
    return {
      option: optionData,
      chart: null,
      xh_Height: 0,
      data:{}
    };
  },
  computed:{
    dataset:function(){
      return this.list;
    }
  },
  watch: {
    dataset:{
      handler:function(newVal){
      //  console.log('我改变了');
       let self = this;
       self.data = newVal[0]
       this.initChart();
      },
      deep:true
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
    // this.initChart();
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
      // console.log("执行initChart函数");
      this.option.series = [];
      this.option.legend.data = [];
      this.option.xAxis.data = [];

      this.option.xAxis.data = this.data.xAxis;
      this.option.legend.data = this.data.legendData;
      this.option.series = this.data.seriesData;

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option,true);
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
