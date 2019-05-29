<template>
  <div :id="id">
    <el-row :gutter="24" style="padding:0px">
      <el-col :lg="4" class="item" style="padding:10px">
        <el-select
          v-model="value"
          @change="changeTimeRange"
          placeholder="最近三个月"
          style="margin-left:25px;"
          size="mini"
        >
          <el-option v-for="item in timeSelect" :key="item.value" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :lg="18" class="item" style="padding:0px">
        <el-date-picker
          style="width:20%;padding:10px"
          align="center"
          size="mini"
          v-model="timeList.startDay"
          :type="dateSelector.timeType"
          :placeholder="dateSelector.timePlaceholder"
          :format="dateSelector.timeFormat"
          :value-format="dateSelector.timeVFormat"
          :picker-options="dateOption"
          :editable="dateSelector.editable"
        ></el-date-picker>
        <el-select
          size="mini"
          v-model="timeList.quarter1"
          placeholder="请选择"
          v-if="value === '按季度'"
          style="width:15%;padding:10px"
        >
          <el-option
            v-for="item in quarters"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          size="mini"
          style="width:20%;padding:10px"
          align="center"
          v-model="timeList.endDay"
          :type="dateSelector.timeType"
          :placeholder="dateSelector.timePlaceholder"
          :format="dateSelector.timeFormat"
          :value-format="dateSelector.timeVFormat"
          :picker-options="dateOption"
          :editable="dateSelector.editable"
          @change="detectTime"
        ></el-date-picker>
        <el-select
          size="mini"
          v-model="timeList.quarter2"
          placeholder="请选择"
          v-if="value === '按季度'"
          style="width:15%;padding:10px"
          @change="detectTimeSeq"
        >
          <el-option
            v-for="item in quarters"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-radio-group
          v-model="timeList.granularity"
          v-for="item in itemList"
          :key="item.value"
          @change="setDataParams"
          style="margin-top:5px;width:9%;"
        >
          <el-radio :label="item.label" style="margin-left:20px">{{item.value}}</el-radio>
        </el-radio-group>
      </el-col>
      <el-button
        size="mini"
        icon="el-icon-search"
        type="warning"
        circle
        @click="setDataParams"
        style="margin-top:10px;"
      ></el-button>
    </el-row>
  </div>
</template>

<script>
import { funcs } from "../../base/getDay.js";
import { getSpotComparedGraphChart } from "../../../../api/spots";
import { setTimeout } from "timers";

export default {
  name: "elTimeSelectView",
  props: {
    id: {
      type: String,
      default: "container"
    },
    contentHeight: {
      type: Number,
      default: 0
    },
    currSpot: {
      type: String,
      default: "",
      required: true
    },
    newTagsObj: {
      type: Object,
      default: () => []
    },
    removeTagsObj: {
      type: Object,
      default: () => []
    }
  },
  components: {},
  watch: {
    currSpot: {
      handler: function(newVal) {
        var self = this;
        setTimeout(function() {
          self.isScoreOrNumber();
          self.initGranularity();
          self.tags = [];
          self.initTags = [];
          if (newVal !== "千岛湖") {
            self.initTags.push("千岛湖", newVal);
            self.tags.push("千岛湖", newVal);
          } else {
            self.initTags.push("千岛湖");
            self.tags.push("千岛湖");
          }
          self.initTimeParams();
        });
      }
    },
    newTagsObj: {
      handler: function(newVal) {
        var self = this;
        var tags = newVal.tags;
        var newAddtag = newVal.newAddTag;
        var tagsArray = [];
        self.addTag = newAddtag;
        setTimeout(function() {
          for (var i = 0; i < tags.length; i++) {
            tagsArray.push(tags[i].id);
          }
          self.tags = tagsArray; // 所有当前景区的标签
          if (newAddtag !== "") {
            self.obtainData(self.comparedParams, self.scoreOrNum, newAddtag);
          }
        });
      }
    },
    removeTagsObj: {
      handler: function(newVal) {
        var self = this;
        var obj = self.data.seriesData;
        var legendObj = self.data.legendData;
        self.removeTag = newVal.id;
        setTimeout(function() {
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].name === newVal.id) {
              obj.splice(i, 1);
              break;
            }
          }
          for (var i = 0; i < legendObj.length; i++) {
            if (legendObj[i] === newVal.id) {
              legendObj.splice(i, 1);
              break;
            }
          }
          for (var i = 0; i < self.tags.length; i++) {
            if (self.tags[i] === newVal.id) {
              self.tags.splice(i, 1);
              break;
            }
          }
          self.data.seriesData = obj;
          self.data.legendData = legendObj;
          if (self.scoreOrNum === "score") {
            self.$emit("scoreDataset", self.data);
          } else {
            self.$emit("numDataset", self.data);
          }
        });
      }
    }
  },
  data() {
    return {
      //评分还是评论数
      scoreOrNum: "",
      // 设定日历可选范围
      dateOption: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date("2014-01-01").getTime()
          );
        }
      },
      // 接受标签组件发送的新增标签
      tags: "",
      //初始化的标签数组
      initTags: [],
      // 向图表传入的数据集
      data: {},
      // 时间选择范围
      timeSelect: ["按年份", "按季度", "按月份", "自定义"],

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
        granularity: "",
        timeType: ""
      },

      // 时间选择器类型
      dateSelector: {
        timeType: "",
        timePlaceholder: "",
        timeFormat: "",
        timeVFormat: "",
        editable:false
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
      itemList: []
    };
  },
  mounted() {
    // socre?Number
    this.isScoreOrNumber();
    // 初始化颗粒度
    this.initGranularity();
  },
  methods: {
    //score?number
    isScoreOrNumber() {
      console.log("执行isScoreOrNumber函数");
      if (this.id === "scoreTime") {
        this.scoreOrNum = "score";
      }
      if (this.id === "numberTime") {
        this.scoreOrNum = "num";
      }
    },
    //初始化时间参数
    initTimeParams() {
      // console.log("执行initTimeParams函数");
      // 取到最近三个月的数据作为初始化数据
      var endTime = funcs.getDay(new Date(), 3);
      var year = endTime.substr(0, 5);
      var month = endTime.substr(5, 2);
      var day = endTime.substr(7, 3);
      var startTime =
        year.toString() + (month - 3).toString().padStart(2, 0) + day;
      this.comparedParams = {
        startTime: startTime,
        endTime: endTime,
        granularity: "周",
        timeType: "按月份"
      };
      this.obtainData(this.comparedParams, this.scoreOrNum, this.initTags); //初始化图表
    },
    // 初始化颗粒度
    initGranularity() {
      if (this.value === "") {
        this.itemList = this.granularitySelector.quarter;
        this.timeList.granularity = "周";
      }
    },
    // 初始化时间参数
    initTimeListFun(){
      this.timeList = {
        startDay: "",
        endDay: "",
        quarter1: "",
        quarter2: "",
        granularity: ""
      }
    },
    changeTimeRange() {
      console.log("执行时间范围参数改变函数changeTimeRange");
      this.comparedParams.timeType = this.value;
      if (this.value === "按月份") {
        this.dateSelector.timeType = "month";
        this.dateSelector.timePlaceholder = "选择月";
        this.dateSelector.timeFormat = "yyyy 年 MM 月";
        this.dateSelector.timeVFormat = "yyyy-MM";
        //颗粒度选择
        this.itemList = this.granularitySelector.month;
        this.initTimeListFun();
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
        this.initTimeListFun();
      }
      if (this.value === "自定义") {
        this.dateSelector.timeType = "date";
        this.dateSelector.timePlaceholder = "选择日期";
        this.dateSelector.timeFormat = "yyyy 年 MM 月 dd 日";
        this.dateSelector.timeVFormat = "yyyy-MM-dd";
        this.initTimeListFun();
      }
    },
    detectTime() {
      console.log("执行detectTime函数")
      if (this.value === "按季度") {
        return;
      } else {
        this.detectTimeSeq();
      }
    },
    //检测时间顺序是否正确
    detectTimeSeq() {
      console.log("执行检测时间顺序函数detectTimeSeq");
      var startTime = this.timeList.startDay,
        endTime = this.timeList.endDay,
        quarter1 = this.timeList.quarter1,
        quarter2 = this.timeList.quarter2;

      if (
        this.value === "按年份" ||
        this.value === "按月份" ||
        this.value === "自定义"
      ) {
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

    //从后台获取数据
    obtainData(timeParams, scoreOrNum, tags) {
      console.log("执行obtainData函数");
      var params = {
        startTime: timeParams.startTime,
        endTime: timeParams.endTime,
        scoreOrNum: scoreOrNum,
        granularity: timeParams.granularity,
        tags: tags,
        timeType: timeParams.timeType
      };
      getSpotComparedGraphChart(params).then(res => {
        console.log("执行后台请求函数，返回res.data.dataset");
        var tempDataset = res.data;
        // 添加标签data的变化
        if (tempDataset.seriesData.length === 1 && this.tags.length !== 1) {
          this.data.seriesData.push(tempDataset.seriesData[0]);
          this.data.legendData.push(tempDataset.legendData[0]);
        } else{
          this.data.seriesData = tempDataset.seriesData;
          this.data.legendData = tempDataset.legendData;
        }
        this.data.xAxis = tempDataset.xAxis;
        if (scoreOrNum === "score") {
          this.$emit("scoreDataset", this.data);
        } else {
          this.$emit("numDataset", this.data);
        }
      });
    },
    // 获取数据并传给图表显示
    setDataParams() {
      console.log("执行更新当前所有景区函数setDataParams");
      this.comparedParams.granularity = this.timeList.granularity;
      if (this.detectTimeSeq()) {
        // 所有当前景区的更新
        this.obtainData(this.comparedParams, this.scoreOrNum, this.tags);
        // this.$emit('timeParmasM', this.comparedParams);
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
.item {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
</style>