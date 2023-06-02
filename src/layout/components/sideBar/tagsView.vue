<template>
  <div id="tags-view-container" class="tags-view-container">
    <a-tabs v-model:activeKey="editableTabsValue" type="card">
      <a-tab-pane v-for="(tag, index) in visitedViews" :key="tag.name" :name="tag.name">
        <template #tab>
          <router-link ref="tags" :to="{
              path: tag.path,
              query: tag.query,
              fullPath: tag.fullPath,
            }" class="tags-view-item" @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
            @click="changeView(tag)" @contextmenu.prevent.native="openMenu(tag, $event)">
            {{ tag.title }}
          </router-link>
          <span v-if="!isAffix(tag)" class="tags-close" @click.prevent.stop="closeSelectedTag(tag)">
            ╳
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import path from "path-browserify";
import {
  computed,
  defineComponent,
  reactive,
  watch,
  toRefs,
  ref,
  nextTick,
} from "vue";
import { useTagStore } from "@/store/tagsView";
import { usePermissionStore } from "@/store/permission";

import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup(props) {
    const $router = useRouter();
    const $route = useRoute();
    const store = useTagStore();
    const perStore = usePermissionStore();
    const refData = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      editableTabsValue: $route.name,
    });

    const visitedViews = computed(() => {
      return store.visitedViews;
    });
    const routes = computed(() => {
      return perStore.flatRoutes;
    });

    // 操作方法
    const tags = ref(null);
    // 工具方法
    const isActive = (route) => {
      return route.path === $route.path;
    };
    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix;
    };
    const addTags = () => {
      const { name } = $route;
      if (name) {
        store.addView($route);
      }
      return false;
    };
    const filterAffixTags = (routesArr, basePath = "/") => {
      let tags = [];
      routesArr.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    };
    const initTags = () => {
      const affixTags = (refData.affixTags = filterAffixTags(routes.value));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          store.addVisitedView(tag);
        }
      }
    };
    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        $router.push(latestView.fullPath);
      } else {
        if (view.name === "Dashboard") {
          // to reload home page
          $router.replace({ path: "/redirect" + view.fullPath });
        } else {
          $router.push("/");
        }
      }
    };

    const moveToCurrentTag = () => {
      nextTick(() => {
        for (const tag of tags.value) {
          if (tag.to.path === $route.path) {
            if (tag.to.fullPath !== $route.fullPath) {
              store.updateVisitedView($route);
            }
            break;
          }
        }
      });
    };
    // 刷新
    const refreshSelectedTag = (view) => {
      store.delCachedView(view).then(() => {
        const { fullPath } = view;
        $router.replace({
          path: "/redirect" + fullPath,
        });
      });
    };
    //关闭当前
    const closeSelectedTag = (view) => {
      store.delView(view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view);
        }
      });
    };
    //关闭其他
    const closeOthersTags = () => {
      $router.push(refData.selectedTag);
      store.delOthersViews(refData.selectedTag).then(() => {
        moveToCurrentTag();
      });
    };
    //全部关闭
    const closeAllTags = (view) => {
      store.delAllViews().then(({ visitedViews }) => {
        if (refData.affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        toLastView(visitedViews, view);
      });
    }

    const changeView = (tag) => {
      $router.push({
        path: tag.path,
        query: tag.query,
        fullPath: tag.fullPath,
      });
    };

    watch($route, () => {
      refData.editableTabsValue = $route.name;
      addTags();
      moveToCurrentTag();
    });

    watch(() => refData.visible, (value) => {
      if (value) {
        document.body.addEventListener("click", closeMenu);
      } else {
        document.body.removeEventListener("click", closeMenu);
      }
    })

    //右键菜单
    const openMenu = function(tag, e){
      //先不要右键菜单
      // return;
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right
      if (left > maxLeft) {
        refData.left = maxLeft;
      } else {
        refData.left = left;
      }

      refData.top = e.clientY - 66;
      refData.visible = true;
      refData.selectedTag = tag;
    }
    const closeMenu = () => {
      refData.visible = false;
    }
    const handleScroll = () => {
      closeMenu();
    }

    initTags();
    addTags();

    return {
      visitedViews,
      routes,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,

      openMenu,

      changeView,
      tags,

      ...toRefs(refData),
    };
  },
});


</script>

<style lang="scss" scoped>
.tags-view-container {
  :deep(.ant-tabs-tab) {
    padding: 0 !important;

    .ant-tabs-tab-btn {
      display: flex;
      align-items: center;

      .tags-view-item {
        color: inherit;
        display: block;
        padding: 8px 16px;
      }

      .tags-close {
        display: block;
        width: 18px;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
