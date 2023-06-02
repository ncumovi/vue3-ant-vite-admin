<!-- 侧边栏菜单 -->
<template>
  <div class="sidebar-container" :class="{ 'sidebar-collapse': isCollapse }">
    <logo :collapse="isCollapse" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="isCollapse"
    >
      <sidebar-item
        v-for="(route, index) in authRoutes"
        :key="route.path + index"
        :item="route"
        :base-path="route.path"
      />
    </a-menu>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import logo from "./logo.vue";
import sidebarItem from "./sidebarItem.vue";

import { useAppStore } from "@/store/app";
import { usePermissionStore } from "@/store/permission";

export default defineComponent({
  components: {
    logo,
    sidebarItem,
  },

  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const historyOpenKeys = sessionStorage.getItem("menuOpenKeys");
    historyOpenKeys && (state.openKeys = JSON.parse(historyOpenKeys));

    const route = useRoute();

    const activedKey = computed(() => {
      return route.path;
    });

    watch(
      () => activedKey,
      (v) => {
        state.selectedKeys = [v.value];
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => state.openKeys,
      (v) => {
        //记录当前展开的菜单
        sessionStorage.setItem("menuOpenKeys", JSON.stringify(v));
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 菜单栏展开还是收起
    const store = useAppStore();
    const isCollapse = computed(() => {
      return store.sidebar.opened;
    });

    const perStore = usePermissionStore();
    const authRoutes = computed(() => {
      return perStore.userMenu;
    });

    return { ...toRefs(state), isCollapse, authRoutes };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;

  &.sidebar-collapse {
    .ant-menu {
      width: 80px;
    }
  }

  .ant-menu {
    width: 200px;
    height: calc(100vh - 50px);
  }
}
</style>
