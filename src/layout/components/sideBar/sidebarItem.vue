<template>
  <template v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <a-menu-item
          v-if="onlyOneChild.meta"
          :key="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <template #icon>
            <icon>
              <template #component>
                <component
                  :is="onlyOneChild.meta && onlyOneChild.meta.icon"
                ></component>
              </template>
            </icon>
          </template>
          <span>{{ onlyOneChild.meta?.title }}</span>
        </a-menu-item>
      </router-link>
    </template>

    <a-sub-menu v-else ref="subMenu" :key="resolvePath(item.path)">
      <template #icon>
        <icon>
          <template #component>
            <component :is="item.meta && item.meta.icon"></component>
          </template>
        </icon>
      </template>
      <template #title>{{ item.meta?.title }}</template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </a-sub-menu>
  </template>
</template>

<script>
import path from "path-browserify";
import Icon from "@ant-design/icons-vue";
import { ref } from "vue";

export default {
  name: "SidebarItem",
  components: { Icon },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const onlyOneChild = ref(null);
    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };

        return true;
      }

      return false;
    };

    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath);
    };

    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath,
    };
  },
};
</script>
<style>
.ant-menu.ant-menu-inline-collapsed .ant-menu-item,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-item,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-submenu
  .ant-menu-submenu-title,
.ant-menu.ant-menu-inline-collapsed .ant-menu-submenu .ant-menu-submenu-title {
  left: 0;
  padding: 0 calc(50% - 8px);
  text-overflow: clip;
}

.ant-menu.ant-menu-inline-collapsed .ant-menu-item .ant-menu-item-icon + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-item
  .ant-menu-item-icon
  + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-submenu
  .ant-menu-submenu-title
  .ant-menu-item-icon
  + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-submenu
  .ant-menu-submenu-title
  .ant-menu-item-icon
  + span,
.ant-menu.ant-menu-inline-collapsed > .ant-menu-item .anticon + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-item
  .anticon
  + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-item-group
  .ant-menu-item-group-list
  .ant-menu-submenu
  .ant-menu-submenu-title
  .anticon
  + span,
.ant-menu.ant-menu-inline-collapsed
  .ant-menu-submenu
  .ant-menu-submenu-title
  .anticon
  + span {
  display: inline-block;
  opacity: 0;
}
</style>
