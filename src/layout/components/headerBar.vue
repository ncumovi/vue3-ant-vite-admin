<template>
  <a-layout-header class="header-bar">
    <div class="header-bar-left">
      <a-button type="primary" @click="store.toggleSideBar">
        <MenuUnfoldOutlined v-if="store.sidebar.opened" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
    <div class="header-bar-right">
      <h1>欢迎您，xxx</h1>
      <PoweroffOutlined @click="logOut" />
    </div>
  </a-layout-header>
</template>

<script>
import {
  PoweroffOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { useTagStore } from "@/store/tagsView";
import { usePermissionStore } from "@/store/permission.js";

export default {
  components: {
    PoweroffOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup(props) {
    const router = useRouter();
    const logOut = () => {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("menuOpenKeys");
      //清空tagViww
      const tagViewStore = useTagStore();
      tagViewStore.delAllViews();
      //清空动态的路由
      const perStore = usePermissionStore();
      perStore.userMenu = [];
      router.push({ path: "/login" });
    };
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    // store
    const store = useAppStore();

    return {
      userInfo,
      store,

      logOut,
    };
  },
};
</script>

<style scoped lang="scss">
.header-bar {
  position: fixed;
  top: 0;
  left: 200px;
  z-index: 1;
  width: calc(100% - 200px);
  height: 50px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  color: #fff;

  h1 {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: #ffffff;
    letter-spacing: 0;
    margin: 0;
    padding: 0 20px 0 0px;

    > a {
      color: #fff;
    }
  }

  .header-bar-left {
    height: 100%;
    display: flex;
    align-items: center;

    .logo {
      margin: 0 10px;
      width: 32px;
      height: 32px;
      background: url("@/assets/img/logo.png") center no-repeat;
      background-size: cover;
    }
  }

  .header-bar-right {
    display: flex;
    align-items: center;
    padding-right: 20px;

    h1 {
      font-weight: 400;
    }

    .anticon {
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
