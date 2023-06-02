<template>
  <div class="login-container">
    <section class="login-input-wrap">
      <div class="login-form">
        <div class="wecome">欢迎登录</div>
        <a-form :model="loginForm" :rules="loginRules" @finish="handleFinish">
          <a-form-item name="userName">
            <template #label>
              <span>账<span class="label-null">号</span></span>
            </template>
            <a-input
              v-model:value="loginForm.userName"
              placeholder="请输入账号"
              type="text"
              autocomplete="on"
              clearable
            />
          </a-form-item>

          <a-form-item name="password">
            <template #label>
              <span>密<span class="label-null">码</span></span>
            </template>
            <a-input-password
              clearable
              v-model:value="loginForm.password"
              placeholder="请输入密码"
              autocomplete="on"
              @keyup.enter="handleFinish"
            />
          </a-form-item>
          <a-form-item style="margin-top: 60px">
            <a-button
              :loading="loading"
              type="primary"
              class="login-btn"
              html-type="submit"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const validateUsername = async (rule, value) => {
  if (!value) {
    return Promise.reject("请输入用户名");
  } else {
    return Promise.resolve();
  }
};
const validatePassword = async (rule, value) => {
  if (value.length < 6) {
    return Promise.reject("请输入不少于6位的密码");
  } else {
    return Promise.resolve();
  }
};
export default {
  setup(props) {
    const loginForm = reactive({
      userName: "",
      password: "",
    });
    const loading = ref(false);
    const loginRules = {
      userName: [
        {
          required: true,
          validator: validateUsername,
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          validator: validatePassword,
          trigger: "change",
        },
      ],
    };

    //必须放在setup里面
    const router = useRouter();

    let UserStore = useUserStore();
    const handleFinish = () => {
      loading.value = true;

      UserStore.getUserInfo(loginForm.userName).then((res) => {
        loading.value = false;
        sessionStorage.setItem("token", res);
        router.push({ path: "/home" });
      });
    };

    return {
      loading,
      loginForm,
      loginRules,

      handleFinish,
    };
  },
};
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  background-image: url("@/assets/img/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  min-width: 1200px;
  .login-input-wrap {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;

    .login-form {
      width: 380px;
      height: 400px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      position: absolute;
      top: 50%;
      right: 100px;
      transform: translateY(-50%);
      padding: 40px 26px;
      .wecome {
        font-size: 26px;
        font-weight: 600;
        color: #000000;
        margin-bottom: 54px;
      }
    }
    .login-btn {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      border-radius: 5px;
      border: none;
      padding: 0;
    }
  }
}
</style>
