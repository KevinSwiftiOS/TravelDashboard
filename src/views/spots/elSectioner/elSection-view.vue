<template>
  <div>
    <div style="margin-bottom: 10px; margin-top:100px;">
      <img
        src="../../../assets/DetailsImgs/listIcon.png"
        style="width: 15px;height: 15px; margin-right:5px;"
      >
      <span class="chartTitle">景区同时段</span>
      <span class="chartTitle" style="color:green">评分</span>
      <span class="chartTitle">对比</span>
    </div>
    <el-card :gutter="24" class="chartBoard">
      <el-time-select-view
        :id="'scoreTime'"
        :currSpot="currSpot"
        :newTagsObj="newScoreTag"
        :removeTagsObj="reScoreTag"
        @scoreDataset="scoreDataset"
      ></el-time-select-view>
      <hr style="border: 1px solid rgba(236, 237, 240, 1);">
      <el-row :gutter="24">
        <el-col :lg="18">
          <line-charts :id="'scoreCharts'" :list="isScoreDataset"></line-charts>
        </el-col>
        <el-tags-view
          :id="'scoreTags'"
          :currSpot="currSpot"
          @addScoreTag="addScoreTag"
          @removeScoreTag="removeScoreTag"
        ></el-tags-view>
        <!-- <el-col :lg="6"></el-col> -->
      </el-row>
    </el-card>
    <div style="margin-bottom: 10px; margin-top:50px;">
      <img
        src="../../../assets/DetailsImgs/listIcon.png"
        style="width: 15px;height: 15px; margin-right:5px;"
      >
      <span class="chartTitle">景区同时段</span>
      <span class="chartTitle" style="color:green">评论数</span>
      <span class="chartTitle">对比</span>
    </div>
    <el-card :gutter="24" class="chartBoard">
      <el-time-select-view
        :id="'numberTime'"
        :currSpot="currSpot"
        :newTagsObj="newNumberTag"
        :removeTagsObj="reNumberTag"
        @numDataset="numDataset"
      ></el-time-select-view>
      <hr style="border: 1px solid rgba(236, 237, 240, 1);">
      <el-row :gutter="24">
        <el-col :lg="18">
          <line-charts :id="'numberCharts'" :list="isNumDataset"></line-charts>
        </el-col>
        <el-tag-select-view
          :id="'numberTags'"
          :currSpot="currSpot"
          @addNumberTag="addNumberTag"
          @removeNumberTag="removeNumberTag"
        ></el-tag-select-view>
        <!-- <el-col :lg="6"></el-col> -->
      </el-row>
    </el-card>
    <el-row :gutter="24">
      <el-col>
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineCharts from "../components/lineCharts/LineCharts";
import elTimeSelectView from "./components/elTimeSelect-view";
import elTagsView from "./components/elTags-view";
import elTagSelectView from "./components/elTagSelect-view";
import Bus from "../bus.js";
import { getSpotComparedGraphChart } from "@/api/spots";

export default {
  name: "elSectionView",
  props: {
    contentHeight: {
      type: Number,
      default: 0
    }
  },
  components: {
    LineCharts,
    elTimeSelectView,
    elTagsView,
    elTagSelectView
  },
  data() {
    return {
      // 当前景区
      currSpot: "",

      isScore: "score",
      isNum: "num",

      isScoreDataset: [],
      isNumDataset: [],

      newNumberTag: {},
      newScoreTag: {},

      reScoreTag: {},
      reNumberTag: {}
    };
  },
  mounted() {
    var sel = this;
    //接受elHeader中的当前景区参数currSpot
    Bus.$on("currSpot", currSpot => {
      sel.currSpot = currSpot;
    });
  },
  methods: {
    scoreDataset(dataset) {
      this.isScoreDataset = [];
      this.isScoreDataset.push(dataset)
    },
    numDataset(dataset) {
      this.isNumDataset = [];
      this.isNumDataset.push(dataset);
    },
    addScoreTag(newTagObj) {
      this.newScoreTag = newTagObj;
    },
    addNumberTag(newTagObj) {
      this.newNumberTag = newTagObj;
    },
    removeScoreTag(removeTagObj) {
      this.reScoreTag = removeTagObj;
    },
    removeNumberTag(removeTagObj) {
      this.reNumberTag = removeTagObj;
    },
  }
};
</script>

<style lang="less">
.chartTitle {
  font-size: 18px;
  color: #4f5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold;
}
.chartBoard {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 237, 240, 1);
  // padding: 5px;
}
.el-card__body {
  padding: 0px;
}
// .sl-list {
//   margin-top: 20px;
//   overflow: scroll;
// }

.select-style {
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(236, 237, 240, 1);
}

/*
    好评榜 差评榜 被选中时候 与未选中时候样式
    */
.select-comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: #e95124;
  // color: #c4dcfc;
  border-bottom: 1px solid #e95124;
}

.unselect-comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(131, 138, 147, 1);
}

.img-size {
  width: 40px;
  height: 40px;
}
.noshrink {
  font-size: 15px;
}
.small-font {
  font-size: 14px;
}
i:hover {
  color: rgba(82, 153, 240, 1);
}
.fontStyle {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: #4f5359;
}
.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
