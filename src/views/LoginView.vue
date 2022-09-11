<template>
  <div class="el-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="60px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="username" autocomplete="off" placeholder="admin" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="123456" />
      </el-form-item>
      <el-form-item>
        <el-button class="sub-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="sub-btn" @click="resetForm()" disabled>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { ElButton, ElInput, FormInstance } from "element-plus";
import { LoginData } from "../type/login";
import { login } from "@/request/api";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "loginView",
  components: { ElButton, ElInput },
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
        },
        {
          min: 3,
          max: 10,
          message: "用户名的长度在3-10之间",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 16,
          message: "密码的长度在8-16位之间",
        },
      ],
    };
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      // 表单验证 
      // valid为boolean指
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
          // 接受请求数据
          login(data.ruleForm)
            .then((res) => {
              console.log(1);

              console.log(res);
              // 保存数据到本地
              localStorage.setItem("token", res.data.token);
              // 界面跳转
              router.push("./home");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error ");
          return false;
        }
      });
    };
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };
    return {
      ...toRefs(data),
      submitForm,
      resetForm,
      rules,
      ruleFormRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-box {
  background-image: url(https://img0.baidu.com/it/u=3967803567,271358070&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=478);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 98vh;
  border: 1px solid #000;

  .demo-ruleForm {
    width: 500px;
    margin: 100px auto;
    padding: 40px;
    background-color: cadetblue;
    border-radius: 20px;
    text-align: center;

    h2 {
      padding-bottom: 20px;
    }

    .sub-btn {
      width: 48%;
    }
  }
}
</style>