import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
/* Layout */
import Layout from "@/layout/index.vue";

const viteComponent = import.meta.glob("../views/**/*.vue");
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    const tmp = {};
    const meta = {};
    if (route.menuUrl != null && route.menuUrl != "") {
      tmp.path = route.menuUrl;
      tmp.name = route.menuUrl.replace(/\//, "");
      meta.title = route.name; // route.cdmc.substring(route.cdmc.indexOf(" "));
      meta.icon = route.iconUrl;
      meta.noCache = false;
      // if (route.cdmc.length > 16) {
      //   meta.tooltip = false;
      // } else {`
      //   meta.tooltip = true;
      // }
      // meta.keepAlive = true;
      tmp.meta = meta;
      try {
        if (route.menuComponent == null || route.menuComponent == "") {
          tmp.component = Layout;
        } else {
          tmp.component =
            viteComponent[`../views${route.menuComponent}.vue`] || Layout;
        }
        if (
          route.nodeType == 1 &&
          route.children &&
          route.children.length > 0
        ) {
          //目录才有子页面
          tmp.alwaysShow = true;
          tmp.children = filterAsyncRoutes(route.children);
        }
        res.push(tmp);
      } catch (error) {
        console.log(tmp.name + " page error or nonexistent");
        console.error(error);
      }
    }
  });
  return res;
}

// 转为二级路由
function convertRoutes(accessRoutes) {
  const castRoute = (routes) => {
    let flatRoutes = [];
    routes.forEach((item) => {
      if (item.children && item.children.length) {
        item.children.forEach((child) => {
          flatRoutes.push({
            ...child,
            path: `${item.path}/${child.path}`,
          });
        });
      } else {
        flatRoutes.push({
          ...item,
        });
      }
    });
    return flatRoutes;
  };

  let result = [];
  accessRoutes.forEach((accessRouter) => {
    let childrenRoutes = [];
    if (accessRouter.children && accessRouter.children.length) {
      childrenRoutes = castRoute(accessRouter.children);
    }
    result.push({
      ...accessRouter,
      children: childrenRoutes,
    });
  });
  return result;
}

export const usePermissionStore = defineStore("PERMISSION", {
  state() {
    return {
      //权限菜单 通过接口获取
      authRoutes: [],
      //最终路由信息 为了解决三级路由无法缓存的问题 将路由全部平铺展开
      flatRoutes: [],
      //菜单信息
      userMenu: [],
    };
  },
  actions: {
    generateRoutes(routes) {
      return new Promise((resolve) => {
        let accessedRoutes = [];
        accessedRoutes = filterAsyncRoutes(routes);

        this.authRoutes = accessedRoutes;

        this.userMenu = constantRoutes.concat(accessedRoutes);

        //把路由平铺
        this.flatRoutes = convertRoutes(this.userMenu);

        resolve(accessedRoutes);
      });
    },
  },
});
