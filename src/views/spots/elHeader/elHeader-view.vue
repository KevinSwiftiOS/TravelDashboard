<template>
  <div>
    <el-row :gutter="24">
      <el-col :lg="6">
        <div class="date">
          <p class="inner">截止：{{endDate}}</p>
        </div>
        <br>
        <!-- <br> -->
        <p class="title">
          {{currSpot}}景区
          <br>详情分析
        </p>
      </el-col>
      <el-col :lg="6">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <el-select v-model="value" @change="changeCurrSpotFun" placeholder="请选择景区">
          <el-option
            v-for="item in spotsList"
            :key="item.value"
            :label="item.id"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span class="value">{{keyIndicator.monthScore}}分</span>
          <br>
          <span class="keyIndicatorKey">本月评分</span>
        </p>

        <p class="keyIndicatorValue">
          <span>{{keyIndicator.monthNumber}}条</span>
          <br>
          <span class="keyIndicatorKey">本月评论数</span>
        </p>
      </el-col>
      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span>{{keyIndicator.scoreVariation}}分</span>
          <br>
          <span class="keyIndicatorKey2">同比变化量</span>
        </p>
        <p class="keyIndicatorValue">
          <span>{{keyIndicator.numVariation}}条</span>
          <br>
          <span class="keyIndicatorKey2">同比变化量</span>
        </p>
      </el-col>

      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span>{{keyIndicator.scoreRank}}名</span>
          <br>
          <span class="keyIndicatorKey2">评分排名</span>
        </p>
        <p class="keyIndicatorValue">
          <span>{{keyIndicator.numRank}}名</span>
          <br>
          <span class="keyIndicatorKey2">评论数排名</span>
        </p>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :lg="16">
        <p class="chartTitle">景区评分 / 评论数分布图</p>
        <div class="chartBoard" style="height:252px">
          <el-row :gutter="24">
            <el-col :lg="8">
              <pie-charts :id="SpotsScoreId" :spotsScoreData="spotsScoreData"></pie-charts>
            </el-col>
            <el-col :lg="16">
              <bar-charts :id="spotsDetailsId" :spotsNumberData="spotsNumberData"></bar-charts>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="8">
        <p class="chartTitle">景区散点分布图</p>
        <div class="chartBoard">
          <scatter-charts :height="contentHeight + 'px'"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getSpotKeyIndicator,
  getSpotKeyVariation,
  getSpotPiechartsScore,
  getSpotBarchartsNumber
} from "@/api/spots";
import { spotsList } from "../base/spotInf.js";
import { getEndDate } from "@/api/dataView";
import scatterCharts from "../components/scatterCharts";
import PieCharts from "../components/pieCharts/pieCharts";
import BarCharts from "../components/barCharts/BarCharts";
import { IdData } from "../components/pieCharts/util";
import Bus from "../bus.js"

export default {
  name: "elHeaderView",
  components: {
    scatterCharts,
    PieCharts,
    BarCharts
  },
  props: {
    contentHeight: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      commentScoreSort: [],
      commentNumberSort: [],
      spotsList: spotsList,

      keyIndicator: {
        monthScore: 0,
        monthNumber: 0,
        scoreRank: 0,
        numRank: 0,
        numVariation: 0,
        scoreVariation: 0
      },

      value: "",
      currSpot: "千岛湖",
      endDate: "",

      //图表id
      SpotsNumId: IdData.SpotsNumId,
      SpotsScoreId: IdData.SpotsScoreId,
      spotsDetailsId: "spotsHotChangeChart",

      spotsScoreData: [],
      spotsNumberData: []
    };
  },
  methods: {
    //求和
    returnSum(data) {
      let sum = 0;
      data.map((item, index) => {
        sum += item.value;
      });
      return sum;
    },
    // 所有景区关键指标初始加载
    initKeyIndicatorFun() {
      getSpotKeyIndicator().then(res => {
        // this.spotsList = res.data.commentScoreSort;
        this.commentScoreSort = res.data.commentScoreSort;
        this.commentNumberSort = res.data.commentNumberSort;
        this.changeCurrSpotFun(this.currSpot);
      });
    },

    // 设置相应景区关键指标
    setKeyIndicatorFun(currSpot) {
      for (var i = 0; i < this.commentScoreSort.length; i++) {
        if (this.commentScoreSort[i]._id === currSpot) {
          this.keyIndicator.monthScore = this.commentScoreSort[i].commentScore;
          var rankNum = i + 1;
          this.keyIndicator.scoreRank = rankNum + " / " + "18";
          break;
        }
      }
      for (var i = 0; i < this.commentNumberSort.length; i++) {
        if (this.commentNumberSort[i]._id === currSpot) {
          this.keyIndicator.monthNumber = this.commentNumberSort[
            i
          ].commentNumber;
          var rankNum = i + 1;
          this.keyIndicator.numRank = rankNum + " / " + "18";
          break;
        }
      }
    },
    // 设置关键指标的同比量
    setKeyVariationFun(currSpot) {
      getSpotKeyVariation({
        currSpot: currSpot
      }).then(res => {
        this.keyIndicator.numVariation = res.data.numVariation;
        this.keyIndicator.scoreVariation = res.data.scoreVariation;
      });
    },

    // 设置景区图标数据
    SetOptionSpotsData(currSpot) {
      var params = {
        currSpot: currSpot
      };
      let self = this;
      getSpotPiechartsScore(params).then(res => {
        this.spotsScoreData = res.data.scoreList
      });
      getSpotBarchartsNumber(params).then(res =>{
        this.spotsNumberData = res.data.valueList;
      })

    },
    // 选择不同景区更新相应数据
    changeCurrSpotFun(value) {
      console.log("执行changeCurrSpot函数");
      this.currSpot = value;
      this.setKeyIndicatorFun(this.currSpot);
      this.setKeyVariationFun(this.currSpot);
      this.SetOptionSpotsData(this.currSpot);

      Bus.$emit('currSpot', this.currSpot); //向其他组件传递currSpot
    }
  },
  watch: {},

  mounted() {
    this.initKeyIndicatorFun();
    this.setKeyIndicatorFun(this.currSpot);
    this.setKeyVariationFun(this.currSpot);
    this.SetOptionSpotsData(this.currSpot);
    getEndDate()
      .then(res => {
        this.endDate = res.data.endDate;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="less">
@url: "../../../assets/screenImage/";
h1 {
  font-family: Georgia;
}

.keyIndicatorValue {
  margin-top: 50px;
  font-size: 24px;
  font-family: SourceHanSansSC-Bold;
  font-weight: bolder;
  color: #4f5359;
}

.keyIndicatorKey,
.keyIndicatorKey2 {
  margin-left: 10px;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(146, 149, 155, 1);
}

.keyIndicatorKey2 {
  margin-left: 20px;
}

.value {
  margin-left: 13px;
}
.inner {
  font-size: 13px;
  width: 130px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;

  border: 5px solid #f8de4a;
  border-radius: 4px;
  background: #f8de4a;
}

.chartBoard {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 237, 240, 1);
  padding: 5px;
}
.chartTitle {
  font-size: 18px;
  color: #4f5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold;
}
.title {
  font-size: 32px;
  font-family: SourceHanSansSC-Bold;
  font-weight: bolder;
  color: #4f5359;
}
</style>
