<template>
  <div class="layout-main" :class="{ 'layout-collapse': store.sidebar.opened }">
    <!-- 顶部栏 -->
    <headerBarVue></headerBarVue>
    <!-- 左侧菜单栏 -->
    <sideMenu></sideMenu>
    <!-- 主内容区域 -->
    <div class="main-content">
      <tags-view />

      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>


<script>
export default {
  name:'layout'
}
</script>
<script setup>
import headerBarVue from "@/layout/components/headerBar.vue";
import sideMenu from "@/layout/components/sideBar/sideMenu.vue";
import tagsView from "./components/sideBar/tagsView.vue";
import { useAppStore } from "@/store/app";
import { useTagStore } from "@/store/tagsView";
import { useRoute } from "vue-router";
import { computed } from "vue";
// store
const store = useAppStore();
const tagViewStore = useTagStore();

const cachedViews = computed(() => {
  return tagViewStore.cachedViews;
});
const $route = useRoute();
const key = computed(() => {
  return $route.path;
});
</script>

<style lang="scss" scoped>
.layout-main {
  padding-top: 50px;

  &.layout-collapse {
    .header-bar {
      left: 80px;
      width: calc(100% - 80px);
    }

    .main-content {
      margin-left: 80px;
      transition: all 0.5s;
    }
  }

  .main-content {
    margin-left: 200px;
    padding: 16px;
    height: calc(100vh - 50px);
    overflow: auto;
    position: relative;
  }
}
</style>
