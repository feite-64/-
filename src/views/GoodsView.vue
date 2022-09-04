<template>
  <div>
    <div class="select-box">
      <el-form :inline="true"
               :model="selectData"
               class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title"
                    placeholder="请输入查询关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce"
                    placeholder="请输入查询关键字">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="dataList.comList"
                stripe
                style="width: 100%">
        <el-table-column prop="id"
                         label="ID"
                         width="180" />
        <el-table-column prop="title"
                         label="标题"
                         width="180" />
        <el-table-column prop="introduce"
                         label="详情" />
      </el-table>
      <el-pagination @current-change="currentChange"
                     @size-change="sizeChange"
                     layout="prev, pager, next"
                     :page-size="selectData.pagesize"
                     :total="selectData.count" />
    </div>
  </div>
</template>

<script lang="ts">
import { getGoodsList } from "@/request/api";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { InitData, ListInt } from "@/type/goods";
export default defineComponent({
  setup() {
    // 创建数据
    const data = reactive(new InitData());
    // 请求商品数据
    const getGoods = () => {
      getGoodsList()
        .then((res) => {
          data.list = res.data;
          data.selectData.count = res.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 生命周期挂载后
    onMounted(() => {
      getGoods();
    });
    // 获取当前页数
    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    // 获取当前页显示数
    const sizeChange = (pageSize: number) => {
      data.selectData.pagesize = pageSize;
    };
    // 改变显示列表list
    const dataList = reactive({
      // 计算属性计算页数
      comList: computed(() => {
        // 0-4 5-10
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });

    const onSubmit = () => {
      // console.log(data.selectData.title);
      // console.log(data.selectData.introduce);
      // 接收查询后的数据
      let arr: ListInt[] = [];
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter((value) => {
            return value.title.indexOf(data.selectData.title) !== -1;
          });
        }
        if (data.selectData.introduce) {
          arr = data.list.filter((value) => {
            return value.introduce.indexOf(data.selectData.introduce) !== -1;
          });
        }
      } else {
        arr = data.list;
      }
      data.selectData.count = arr.length;
      data.list = arr;
    };
    // 监听输入框
    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      () => {
        if (data.selectData.title === "" || data.selectData.introduce === "") {
          getGoods();
        }
      }
    );
    return {
      ...toRefs(data),
      currentChange,
      sizeChange,
      dataList,
      getGoods,
      onSubmit,
    };
  },
});
</script>

<style scoped>
</style>