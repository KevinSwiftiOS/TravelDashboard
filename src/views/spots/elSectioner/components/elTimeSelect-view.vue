<template>
  <el-row :gutter="24">
    <el-col :lg="3" class="item">
      <el-select v-model="value" @change="changeTimeRange" placeholder="请选择">
        <el-option v-for="item in timeSelect" :key="item.value" :label="item" :value="item"></el-option>
      </el-select>
    </el-col>
    <el-col :lg="14" class="item">
      <el-date-picker
        style="width:25%"
        v-model="timeList.startDay"
        :type="dateSelector.timeType"
        :placeholder="dateSelector.timePlaceholder"
        :format="dateSelector.timeFormat"
        :value-format="dateSelector.timeVFormat"
        :picker-options="dateOption"
      ></el-date-picker>
      <el-select
        v-model="timeList.quarter1"
        placeholder="请选择"
        v-if="value === '按季度'"
        style="width:20%"
      >
        <el-option
          v-for="item in quarters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        style="width:25%"
        v-model="timeList.endDay"
        :type="dateSelector.timeType"
        :placeholder="dateSelector.timePlaceholder"
        :format="dateSelector.timeFormat"
        :value-format="dateSelector.timeVFormat"
        :picker-options="dateOption"
        @change="detectTime"
      ></el-date-picker>
      <el-select
        v-model="timeList.quarter2"
        placeholder="请选择"
        v-if="value === '按季度'"
        style="width:20%"
        @change="detectTimeSeq"
      >
        <el-option
          v-for="item in quarters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :lg="6">
      <el-radio-group
        v-model="timeList.granularity"
        v-for="item in itemList"
        :key="item.value"
        @change="setDataParams"
        style="margin-top:30px"
      >
        <el-radio :label="item.label" style="margin-left:20px">{{item.value}}</el-radio>
      </el-radio-group>
    </el-col>
    <el-button
      icon="el-icon-search"
      type="warning"
      circle
      @click="setDataParams"
      style="margin-top:20px"
    ></el-button>
  </el-row>
</template>

<script>
import { timeSelect } from "../../base/timeSelect.js";
import { funcs } from "../../base/getDay.js";
// import Bus from "../../bus.js";

export default {
  name: "elTimeSelectView",
  props: {
    contentHeight: {
      type: Number,
      default: 0
    },
  },
  components: {},
  data() {
    return {
      // 设定日历可选范围
      dateOption: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date("2014-01-01").getTime()
          );
        }
      },
      // 初始化标签，请求第一个接口（时间参数 + 初始化景区)
      // Tags: [
      //   { id: "千岛湖", value: "千岛湖", type: "success" },
      //   {
      //     id: "西湖",
      //     value: "西湖",
      //     type: "success"
      //   }
      // ],
      // 接受标签组件发送的新增标签
      // newAddTag:"",
      // 向父组件发送的数据集
      // dataset:[],
      // 时间选择范围
      timeSelect: ["按年份", "按季度", "按月份"],

      // 季度选择范围
      quarters: [
        { label: "第一季度", value: "01" },
        { label: "第二季度", value: "02" },
        { label: "第三季度", value: "03" },
        { label: "第四季度", value: "04" }
      ],
      // 颗粒度选择
      granularitySelector: {
        year: [{ label: "年", value: "年" }, { label: "月", value: "月" }],
        quarter: [
          { label: "季度", value: "季度" },
          { label: "月", value: "月" },
          { label: "周", value: "周" }
        ],
        month: [{ label: "月", value: "月" }, { label: "周", value: "周" }]
      },
      // 需要返回的参数
      comparedParams: {
        startTime: "",
        endTime: "",
        scoreOrNum: 1,
        granularity: "",
        timeType: ""
      },

      // 时间选择器类型
      dateSelector: {
        timeType: "",
        timePlaceholder: "",
        timeFormat: "",
        timeVFormat: ""
      },
      // 开始时间 结束时间
      timeList: {
        startDay: "",
        endDay: "",
        quarter1: "",
        quarter2: "",
        granularity: ""
      },
      // 当前选择的时间类型：年/月/季度
      value: "",
      //颗粒度列表
      itemList: [],
    };
  },
  mounted() {
    // var sel = this
    // Bus.$on('newAddTagM', newAddTag => {
    //   console.log(newAddTag);
    //   sel.newAddTag = newAddTag;
    // })
    this.initTimeParams();
  },
  methods: {
    //初始化时间参数
    initTimeParams() {
      var endTime = funcs.getDay(new Date(), 3);
      var year = endTime.substr(0, 5);
      var month = endTime.substr(5, 2);
      var day = endTime.substr(7, 2);
      var startTime =
        year.toString() + (month - 1).toString().padStart(2, 0) + day;

      this.comparedParams = {
        startTime: startTime,
        endTime: endTime,
        granularity: "周",
        timeType: "按月份" 
      };
    },
    changeTimeRange() {
       this.timeType = this.value;
      if (this.value === "按月份") {
        this.dateSelector.timeType = "month";
        this.dateSelector.timePlaceholder = "选择月";
        this.dateSelector.timeFormat = "yyyy 年 MM 月";
        this.dateSelector.timeVFormat = "yyyy-MM";
        //颗粒度选择
        this.itemList = this.granularitySelector.month;
      }
      if (this.value === "按年份" || this.value === "按季度") {
        this.dateSelector.timeType = "year";
        this.dateSelector.timePlaceholder = "选择年";
        this.dateSelector.timeFormat = "yyyy 年";
        this.dateSelector.timeVFormat = "yyyy";
        // 颗粒度选择
        if (this.value === "按年份") {
          this.itemList = this.granularitySelector.year;
        } else {
          this.itemList = this.granularitySelector.quarter;
        }
      }
    },
    detectTime() {
      if (this.value === "按季度") {
        return;
      } else {
        this.detectTimeSeq();
      }
    },
    //检测时间顺序是否正确
    detectTimeSeq() {
      var startTime = this.timeList.startDay,
        endTime = this.timeList.endDay,
        quarter1 = this.timeList.quarter1,
        quarter2 = this.timeList.quarter2;

      if (this.value === "按年份" || this.value === "按月份") {
        if (startTime && endTime) {
          var d1 = new Date(startTime.replace(/\-/g, "/"));
          var d2 = new Date(endTime.replace(/\-/g, "/"));
          // 校验
          if (d1 >= d2) {
            this.$message.warning("结束时间需大于起始时间");
            return 0;
          } else {
            this.comparedParams.startTime = startTime;
            this.comparedParams.endTime = endTime;
          }
        } else {
          this.$message.warning("请选择完毕");
          return -1;
        }
      }

      if (this.value === "按季度") {
        if (startTime && endTime && quarter1 && quarter2) {
          var d1 = new Date((startTime + quarter1).replace(/\-/g, "/"));
          var d2 = new Date((endTime + quarter2).replace(/\-/g, "/"));
          if (d1 >= d2) {
            this.$message.warning("结束时间需大于起始时间");
            return 0;
          } else {
            this.comparedParams.startTime = startTime + "-" + quarter1;
            this.comparedParams.endTime = endTime + "-" + quarter2;
          }
        } else {
          this.$message.warning("请选择完毕");
          return -1;
        }
      }
      return 1;
    },

    // 参数改变,传参给父组件
    setDataParams() {
      this.comparedParams.granularity = this.timeList.granularity;
      if (this.detectTimeSeq()) {
        // 向父组件发送时间参数
        this.$emit("timeParamsM", this.comparedParams);
        // 向标签项发送时间参数
        // Bus.$emit("timeSelectParamsM", this.comparedParams);
        // console.log("成功执行setDataParams")
      } else {
        this.$message.warning("error!!请正确选择时间范围");
      }
    }
  }
};
</script>
<style lang="less">
.chartBoard {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 237, 240, 1);
  padding: 5px;
}
</style>