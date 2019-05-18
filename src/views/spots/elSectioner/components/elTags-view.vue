<template>
  <el-col :lg="6">
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
</template>
<script>
import Bus from "../../bus.js";
import { timeSelect } from "../../base/timeSelect";
import { spotsList } from "../../base/spotInf.js";
export default {
  name: "elTagsView",
  props: {
    currSpot: {
      type: String,
      default: "",
      required: true
    }
  },
  components: {},
  data() {
    return {
      // 时间参数
      timeSelectParams: {},
      // 当前景区
      currspot: "",
      // 新增的景区标签，请求第二个接口（时间参数+新增内容)
      newAddTag: "",
      //标签数组
      tags: [
        { id: "千岛湖", value: "千岛湖", type: "success" },
        {
          id: "",
          value: "",
          type: "success"
        }
      ],
      removeTags: [],
    };
  },
  watch: {
    currSpot(newVal) {
      console.log(newVal);
      if(newVal !== "千岛湖"){
        this.tags[1].id = newVal;
        this.tags[1].value = newVal;
      }else{
        this.tags.splice(1,1)
      }
      this.currspot = newVal;
      this.initArray();
    }
  },
  mounted() {
    // var sel = this;
    // Bus.$on("timeSelectParamsM", timeSelectParams => {
    //   console.log(timeSelectParams);
    //   sel.timeSelectParams = timeSelectParams;
    // });
  },
  methods: {
    // 初始化选中标签
    initArray() {
      for (var i = 0; i < spotsList.length; i++) {
        if (spotsList[i].id !== "千岛湖" && spotsList[i].id !== this.currspot) {
          this.removeTags.push(spotsList[i]);
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
    },
    //标签添加
    handleAdd(index) {
      var eTag = this.removeTags.splice(index, 1)[0];
      eTag["type"] = "success";
      this.tags.push(eTag);
      this.newAddTag = eTag.value;
      this.sendTagsArray();
    },

    //向父组件传递新增景区和当前选择的所有景区
    sendTagsArray(){
      var newTagArray = {
        tags:this.tags,
        newAddTag:this.newAddTag
      }
      // this.$emit("newAddTagM", newTagArray);
      Bus.$emit("Tags", newTagArray)
    }
    
  }
};
</script>
