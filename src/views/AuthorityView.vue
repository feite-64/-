<template>
  <div>
    <el-tree ref="treeRef"
             :data="list"
             show-checkbox
             node-key="roleId"
             :check-strictly="true"
             :default-checked-keys="authority"
             :props="{
              children:'roleList',
              label:'name'
             }" />
    <el-button @click="changeAuthority">確認修改</el-button>
  </div>
</template>

<script lang="ts">
import { getAuthorityList } from "@/request/api";
import { InitData } from "@/type/authority";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const params: any = route.params;
    console.log(route);
    console.log(params);
    
    const data = reactive(new InitData(params.id, params.authority));
    onMounted(() => {
      getAuthorityList()
        .then((res) => {
          data.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    const changeAuthority = () => {
      // 後台修改
      console.log(
        data.treeRef.getCheckedKeys().sort(function (a: number, b: number) {
          return a - b;
        })
      );
    };
    return { ...toRefs(data), changeAuthority };
  },
});
</script>

<style scoped>
</style>