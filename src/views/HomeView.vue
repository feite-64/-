<template>
  <div class="home">
    <el-container>
      <el-header class="home_header">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="home_header_img"
                 src="../assets/logo.png">
          </el-col>
          <el-col :span="16">
            <h2 class="home_header_h2">后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <el-button @click="delToken">
              退出登录
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="home_container_aside"
                  width="200px">
          <el-menu active-text-color="#ffd04b"
                   background-color="#545c64"
                   class="home_container_aside-menu"
                   :default-active="active"
                   text-color="#fff"
                   router>
            <el-menu-item :index="item.path"
                          v-for="item in list"
                          :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 设置路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";
export default {
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    // console.log(list);
    const delToken = () => {
      localStorage.removeItem("token");
      router.push("/");
    };
    return {
      list,
      active: route.path,
      delToken,
    };
  },
};
</script>

<style lang="scss">
.home {
  &_header {
    height: 80px;
    line-height: 80px;
    background-color: rgb(102, 102, 102);
    // padding-bottom: 20px;
    &_img {
      height: 80px;
    }
    &_h2 {
      text-align: center;
    }
  }
  &_container_aside {
    &-menu {
      height: calc(100vh - 80px);
    }
  }
}
</style>