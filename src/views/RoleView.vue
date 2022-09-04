<template>
  <div>
    <!-- 添加角色 -->
    <div class="create-user">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </div>
    <!-- 数据展示 -->

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button link size="small" @click="changeRole(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getRoleList } from "@/request/api";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { InitData, ListInt } from "@/type/role";
import { ElMessage, ElMessageBox } from "element-plus";
// 按需引入messagebox样式会失效 需要单独引入css文件
import "element-plus/dist/index.css";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    onMounted(() => {
      // 获取角色列表数据
      getRoleList()
        .then((res) => {
          data.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const changeRole = (row: ListInt) => {
      router.push({
        name: "authority",
        params: {
          id: row.roleId,
          authority: row.authority,
        },
      });
    };
    // 添加角色
    const addRole = () => {
      ElMessageBox.prompt("请输入角色名", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        customClass: "addRole",
      })
        .then(({ value }) => {
          //value表示输入中的值
          if (value) {
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `添加角色:${value}成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });
    };
    return {
      ...toRefs(data),
      changeRole,
      addRole,
    };
  },
});
</script>
<style scoped>
</style>
<!-- <style >
.addRole {
  width: 500px;
  margin: 200px auto;
  display:flex;
}
</style> -->