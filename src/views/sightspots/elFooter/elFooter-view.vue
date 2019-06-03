<template>
  <div class="foot">
    <div style="margin-bottom: 10px; margin-top: 100px;display: flex;align-items: center">
      <img
        src="../../../assets/DetailsImgs/commentIcon.png"
        style="width: 15px;height: 15px; margin-right: 5px;"
      >
      <span class="chartTitle">景点评论</span>
    </div>
    <el-tabs v-model="featureWord" @tab-click="handleClick">
      <el-tab-pane :label="tabsList[0]" name="好评"></el-tab-pane>
      <el-tab-pane :label="tabsList[1]" name="差评"></el-tab-pane>
    </el-tabs>

    <el-table
      :data="commentList"
      class="text"
      align="left"
      width="1320"
      :row-class-name="tableRowClassName"
      :height="changeHeightName()"
    >
      <el-table-column class="text" align="left" width="1320">
        <template slot-scope="scope" class="content">
          <span v-html="showDate(scope.row.content)"></span>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        style="margin-top:5px; margin-left:5px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currPage"
        :page-sizes="[6,12,24]"
        layout="total, prev, pager, next, jumper, sizes"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Bus from "../bus.js"
import { getCommentNumber, getCommentList } from "@/api/sightspots";

export default {
  data() {
    return {
      currSpot:"",
      tabsList:[],
      commentList:[],
      totalNumber:{
        goodNumber:0,
        badNumber:0
      },
      page:{
        currPage:1,
        pageSize:6,
        total:0
      },
      featureWord:"", //好评 差评
      featureWordArray: {
        // 特征词
        好评: ["满意", "不错","好","心旷神怡","美","干净", "愉快", "值得","漂亮","方便","宜人","舒服"],
        差评: ["商业", "不值", "坑", "差","没","失望","加价","一般","烦","贵","不咋","低"],
      }
    };
  },
  mounted() {
        var sel = this;
    //接受elHeader中的当前景区参数currSpot
    Bus.$on("currSpot", currSpot => {
      sel.currSpot = currSpot;
      console.log(sel.currSpot)
      sel.initTabsList();
    });
    
  },
  methods: {
    // 初始化标签列表
    initTabsList: function() {
      getCommentNumber({
        currSightSpot:this.currSpot
      }).then(res => {
        this.totalNumber.goodNumber = res.data.goodNumber[0].commentNumber;
        this.totalNumber.badNumber = res.data.badNumber[0].commentNumber;

        this.tabsList.push("好评(" + this.totalNumber.goodNumber + ")");
        this.tabsList.push("差评(" + this.totalNumber.badNumber + ")");

        this.page.total = this.totalNumber.goodNumber;  //初始化页数
        this.featureWord = "好评";

        this.loadCommentList(
          this.featureWord,
          this.page.currPage,
          this.page.pageSize,
          this.currSpot
        );
      });
    },
        // 加载评论列表信息
    loadCommentList: function(featureWord, currPage, pageSize, currSpot) {
      console.log("执行loadCommentList函数");
      var param = {
        tagname: featureWord,
        currPage: currPage,
        pageSize: pageSize,
        currSightSpot: currSpot
      };
      getCommentList(param).then(res => {
        this.commentList = res.data.commentList;
      });
    },

    // 标签变更事件 this.featureWord变更
    handleClick(tab, event) {
      console.log("执行handleClick函数");
      this.featureWord = tab.name; // 好评
      if(this.featureWord === "好评"){
        this.page.total = this.totalNumber.goodNumber;
      }
      if(this.featureWord === "差评"){
        this.page.total = this.totalNumber.badNumber;
      }
      this.loadCommentList(
        this.featureWord,
        this.page.currPage,
        this.page.pageSize,
        this.currSpot
      );
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currPage = 1;
      // console.log(`每页 ${val} 条`);
      this.loadCommentList(
        this.featureWord,
        this.page.currPage,
        this.page.pageSize,
        this.currSpot
      );
    },
    handleCurrentChange(val) {
      console.log("当前页数变更，执行handleCurrentChang函数");
      this.page.currPage = val;
      this.loadCommentList(
        this.featureWord,
        this.page.currPage,
        this.page.pageSize,
        this.currSpot
      );
      // console.log(`当前页: ${val}`);
    },

    // 特征句子高亮显示
    showDate: function(val) {
      var arr = this.featureWordArray[this.featureWord];
      var temp = val.split(/[,，。\s\.\t!……:;~]/);
      var newStr = [];
      var Str = "";
      for (var i = 0; i < temp.length; i++) {
        // 一句话的数组
        for (var j = 0; j < arr.length; j++) {
          if (temp[i].indexOf(arr[j]) != -1) {
            temp[i] = temp[i].replace(
              temp[i],
              '<u><font color="#ED8B34">' + temp[i] + "</font></u>"
            );
            break;
          }
        }
      }
      for (var i = 0; i < temp.length; i++) {
        Str += temp[i] + ",";
      }
      return `<span class="comment">` + Str + "<span/>";
    },
    // 表格颜色改变
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "success-row";
      }
      return "warning-row";
    },
    // 表格高度改变
    changeHeightName: function() {
      if (this.pageSize === 6) {
        return "350";
      }
      if (this.pageSize === 12) {
        return "700";
      }
      if (this.pageSize === 24) {
        return "1000";
      }
    },
    indexMethod: function(index) {
      return index + 1;
    }
  }
};
</script>

<style scoped lang="less">
.chartTitle {
  font-size: 18px;
  color: #4f5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold;
}
.foot {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
}
.el-table .warning-row {
  background: rgb(253, 248, 238);
}

.el-table .success-row {
  background: #ebf4f8;
}
.comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(79, 83, 89, 1);
}

// @url: "../../../assets/screenImage/";
</style>