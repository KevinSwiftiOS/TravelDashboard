<template>
  <div>
    <div class="navbar">
      <div class="modules">
        <!--<router-link to="/home"> <i class="icon-home"> </i> 首页</router-link>-->

        <router-link to="/dashboard" :class="{ 'router-link-active': $route.name === 'Index' }">
          <i class="el-icon-zoom-in"></i> 首页
        </router-link>
        <router-link to="/restaurant">
          <i class="el-icon-news"></i> 餐饮详情
        </router-link>
        <router-link to="/hotel">
          <i class="el-icon-news">酒店详情</i>
        </router-link>

        <router-link to="/spots">
          <i class="el-icon-news">景区详情</i>
        </router-link>
        <router-link to="/sightspots">
          <i class="el-icon-news">景点详情</i>
        </router-link>

        <router-link to="/spider">
          <i class="el-icon-news">爬虫详情</i>
        </router-link>
      </div>
    </div>
    <router-view class="view"/>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      timeInterval: null,
      time: "",
      hideOnClick: false
    };
  },
  created() {
    this.timeNow();
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timeInterval);
  },
  methods: {
    detail: function() {},
    setTime() {
      this.time = this.$moment().format("YYYY-MM-DD HH:mm");
    },
    timeNow() {
      this.setTime();
      setInterval(() => {
        this.setTime();
      }, 1000);
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$router.push("/login");
        clear_cookies();
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    goToMap(command) {
      this.$router.push({ path: command });
    }
  }
};
</script>
<style lang="scss" >
.navbar {
  height: 40px;
  overflow: hidden;
  background: #333;
  color: #fff;
  font-size: 16px;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;

  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  .logo {
    float: left;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    margin-right: 20px;
    //width: 100px;
    background: rgba(255, 255, 255, 0);
    color: #333;
    text-align: center;
    //margin: 5px 25px 5px 0;
  }
  .modules {
    float: left;
    min-height: 40px;
    margin-left: 40px;
    a {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-decoration: none;
      margin-right: 25px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .router-link-active {
      border-bottom: 4px solid #409eff;
      color: #409eff;
    }
  }
  .menu {
    float: right;
    line-height: 40px;
    .time {
      margin-right: 20px;
      color: #d5d5d5;
      font-size: 14px;
    }
  }
  .min-screen {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  .logo {
    display: none;
  }
  .time {
    display: none;
  }
  .modules {
    font-size: 14px;
  }
}

.view {
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-icon-news {
  font-size: 16px;
  font-weight: 430;
}
img {
  height: 45px;
  width: 70px;
}
</style>
