<template>
  <div :id="id">
    <el-col :lg="6" :id="id" style="margin-top:30px">
      <div>
        <el-tag
          style="margin-left:7px; margin-top:5px;"
          size="mini"
          v-for="(tag, index) in tags"
          :key="tag.value"
          closable
          :type="tag.type"
          @close="handleClose(index)"
        >{{tag.value}}</el-tag>
      </div>
      <hr style="border: 1px solid rgba(236, 237, 240, 1);">
      <div>
        <el-tag
          style="margin-left:7px; margin-top:5px;"
          size="mini"
          v-for="(tag, index) in removeTags"
          :key="tag.value"
          closable
          :type="tag.type"
          @close="handleAdd(index)"
        >{{tag.value}}</el-tag>
      </div>
    </el-col>
  </div>
</template>
<script>
import { spotsList } from "../../base/spotInf.js";
import { setTimeout } from "timers";
import { spots } from "../../../../base/dict";
export default {
  name: "elTagsView",
  props: {
    id: {
      type: String,
      default: "container"
    },
    currSpot: {
      type: String,
      default: "",
      required: true
    }
  },
  components: {},
  data() {
    return {
      //score?Number
      scoreOrNumber: "",
      // 时间参数
      timeSelectParams: {},
      // 当前景区
      currspot: "",
      // 新增的景区标签，请求第二个接口（时间参数+新增内容)
      newAddTag: "",
      //删除的标签
      removeTag: "",
      //标签数组
      tags: [],
      removeTags: []
    };
  },
  watch: {
    currSpot: {
      handler: function(newVal) {
        var self = this;
        self.tags = [];
        setTimeout(function() {
          var obj = {
            id: newVal,
            value: newVal,
            type: "success"
          };
          self.tags.push(obj);
          self.currspot = newVal;
          self.initArray();
        });
      }
    }
  },
  mounted() {
    this.isScoreOrNumber();
  },
  methods: {
    //score?number
    isScoreOrNumber() {
      if (this.id === "scoreTags") {
        this.scoreOrNumber = "score";
      }
      if (this.id === "numberTags") {
        this.scoreOrNumber = "num";
      }
    },
    // 深拷贝数组
    arrayCopy(source) {
      var sourceCopy = source instanceof Array ? [] : {};
      for (var item in source) {
        sourceCopy[item] =
          typeof source[item] === "object"
            ? this.arrayCopy(source[item])
            : source[item];
      }
      return sourceCopy;
    },

    // 初始化选中标签
    initArray() {
      this.removeTags = [];
      var tempArray = this.arrayCopy(spotsList);
      if (this.currSpot === "中心湖") {
        for (var i = 0; i < tempArray.length; i++) {
          if (tempArray[i].id !== "中心湖") {
            this.removeTags.push(tempArray[i]);
          }
        }
      } else {
        for (var i = 0; i < tempArray.length; i++) {
          if (
            tempArray[i].id !== "中心湖" &&
            tempArray[i].id !== this.currspot
          ) {
            this.removeTags.push(tempArray[i]);
          }
        }
      }
      //向父组件传递新增景区和当前选择的所有景区
      this.sendTagsArray();
    },

    // 标签移除
    handleClose(index) {
      var eTag = this.tags.splice(index, 1)[0];
      eTag.type = "info";
      this.removeTags.push(eTag);
      this.$emit("removeScoreTag", eTag);
    },
    //标签添加
    handleAdd(index) {
      var eTag = this.removeTags.splice(index, 1)[0];
      this.removeTag = eTag;
      eTag["type"] = "success";
      this.tags.push(eTag);
      this.newAddTag = eTag.value;
      this.sendTagsArray();
    },

    //向父组件传递新增景区和当前选择的所有景区
    sendTagsArray() {
      var newTagObj = {
        tags: this.tags,
        newAddTag: this.newAddTag
      };
      this.$emit("addScoreTag", newTagObj);
    }
  }
};
</script>
