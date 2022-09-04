<template>
  <div>
    <!-- 查询功能 -->
    <div class="select-box">
      <el-form :inline="true"
               :model="selectData"
               class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="selectData.nickName"
                    placeholder="请输入查询关键字" />
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="selectData.role"
                     placeholder="请输入"
                     size="large">
            <el-option label="全部"
                       :value="0"></el-option>
            <el-option v-for="item in roleList"
                       :key="item.roleId"
                       :label="item.roleName"
                       :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据展示 -->
    <div class="table">
      <el-table :data="list"
                stripe
                style="width: 100%">
        <el-table-column prop="id"
                         label="ID"
                         width="180" />
        <el-table-column prop="nickName"
                         label="用户名"
                         width="180" />
        <el-table-column prop="role"
                         label="角色">
          <template #default="scope">
            <el-button v-for="item in scope.row.role"
                       :key="item.id"
                       link
                       size="small">
              {{item.roleName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role"
                         label="修改">
          <template #default="scope">
            <el-button link
                       type="primary"
                       size="small"
                       @click="onUpdata(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑数据功能 -->
    <div class="dialog">
      <el-dialog v-model="isShow"
                 title="编辑信息">
        <el-form :model="active">
          <el-form-item label="用户名"
                        label-width="80px">
            <el-input v-model="active.nickName"
                      autocomplete="off" />
          </el-form-item>
          <el-form-item label="权限"
                        label-width="80px">
            <!-- 多选 multiple-->
            <el-select v-model="active.role"
                       multiple
                       placeholder="选择权限">
              <el-option v-for="item in roleList"
                         :key="item.roleId"
                         :label="item.roleName"
                         :value="item.roleId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="updataUser">取消</el-button>
            <el-button type="primary"
                       @click="isShow = false">更改</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { getUserList, getRoleList } from "@/request/api";
import { InitData, ListInt } from "@/type/user";
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    // 初始化数据
    onMounted(() => {
      getUser();
      getRole();
    });
    const getUser = () => {
      getUserList()
        .then((res) => {
          data.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getRole = () => {
      getRoleList()
        .then((res) => {
          data.roleList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 查询数据
    const onSubmit = () => {
      // 接收查询后的数据
      let arr: ListInt[] = [];
      if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
          arr = data.list.filter((value) => {
            return value.nickName.indexOf(data.selectData.nickName) !== -1;
          });
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
            // 过滤出来的值传给arr
            return value.role.find((item) => {
              return item.id === data.selectData.role;
            });
          });
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
    };
    // 进入编辑界面
    const onUpdata = (row: ListInt) => {
      // 点击编辑按钮后把当前数据同步到编辑界面数据 active
      data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value: any) => value.id || value.roleId),
      };
      data.isShow = true;
    };
    const updataUser = () => {
      let obj: any = data.list.find((value) => value.id === data.active.id);
      obj.nickName = data.active.nickName;
      obj.role = data.roleList.filter(
        (value) => data.active.role.indexOf(value.roleId) !== -1
      );
      data.list.forEach((item, i) => {
        if (item.id == obj.id) {
          data.list[i] = obj;
        }
      });
      data.isShow = false;
    };
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if (data.selectData.nickName === "" || data.selectData.role === 0) {
        getUser();
      }
    });
    return {
      ...toRefs(data),
      onSubmit,
      onUpdata,
      updataUser,
    };
  },
});
</script>

<style scoped>
</style>