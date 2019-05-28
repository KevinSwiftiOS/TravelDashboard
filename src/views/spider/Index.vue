<template>
    <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="main-box" v-if="$route.name === 'spiderDashboard'">
        <block-box title="请选择比较关键字" icon="icon-comment">
                <el-row :gutter="20" class="spider-search">
                    <el-col :md="6" :offset="4" class="item">
                        <el-date-picker
                                v-model="comment_time"
                                value-format="yyyy-MM-dd"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1"
                        ></el-date-picker>
                    </el-col>

                    <el-col :md="4" class="item">
                        <el-select v-model="spot" style="width:100%">
                            <el-option v-for="item in total_spots" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="4" class="item">
                        <el-select v-model="source" style="width:100%">
                            <el-option v-for="item in sources" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="4" class="item button-box">
                        <el-button type="primary" style="float:right" @click="search()">确定</el-button>
                    </el-col>
                </el-row>
        </block-box>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="comment_user_name" label="评论用户" width="160" align="center"></el-table-column>
                <el-table-column prop="shop_name" label="评论店铺" width="180" align="center"></el-table-column>
                <el-table-column prop="data_website" label="评论平台" width="120" align="center"></el-table-column>
                <el-table-column prop="comment_time" label="评论日期" width="120" align="center"></el-table-column>
                <el-table-column label="评论内容" width="400" align="center" prop="comment_short_content"></el-table-column>
                <el-table-column prop="comment_score" label="评论分数" align="center" width="100"></el-table-column>
                <el-table-column prop="crawl_time" label="爬取时间" align="center" width="180"></el-table-column>
                <el-table-column label="评论详情" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="content_detail(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <router-view v-else/>
    </div>

</template>
<script>
     import blockBox from "@/views/spider/components/block-box";
    import {getSpider} from "@/api/spider";
    import {total_spots} from "../../base/dict";


     export default {
        components: {
             blockBox
        },
        data() {
            return {
                list: [],
                loading: true,
                new_comment_time: "",
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },

                total_spots:total_spots,
                sources:["景点","餐饮","酒店"],
                website: "携程",
                spot: "千岛湖",
                source: "景点",
                comment_time: ""
            };
        },
        name:"Index",
        //初始化的时候
        mounted() {
            this.spiderdetail();
        },

        methods: {
            spiderdetail: function() {
                getSpider({
                    comment_time: "",
                    spot: "千岛湖",
                    source: "景点",

                }).then(res => {
                    if (res.code === 0) {
                        this.list = res.data.list;
                        this.comment_time = res.data.comment_time;
                        console.log(res.data);
                    } else {
                        this.$Message.error(res.message);
                    }
                });

                this.loading = false;

            },
            search: async function() {
                this.loading = true;
                getSpider({
                    comment_time: this.comment_time,
                    spot: this.spot,
                    source: this.source,


                }).then(res => {
                    if (res.code === 0) {
                        this.list = res.data.list;
                    }
                });
                this.loading = false;

            },
            content_detail: function(index, row) {
                localStorage.setItem("contentdetail", JSON.stringify(row));
                this.$router.push({ name: "SpiderDetail" });
            }
        },
        watch: {
            source: function (val) {
             if(val == '景点')
                 this.total_spots = total_spots;
             else {
                 this.total_spots = ["千岛湖"];
                this.spot = "千岛湖";
                if(val == "餐饮")
                    this.comment_time = "2019-03-31";
             }
            },
        }
    };
</script>
<style scoped>
    .main-box {
        padding: 20px 20px 10px;
        max-width: 1820px;
        margin: 0 auto;
    }

</style>
