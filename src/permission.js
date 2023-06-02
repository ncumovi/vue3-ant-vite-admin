import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { usePermissionStore } from "./store/permission.js";

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logged in
  const token = sessionStorage.getItem("token");

  if (token) {
    if (to.path === "/login") {
      next({
        path: "/",
      });
      NProgress.done();
    } else {
      const perStore = usePermissionStore();
      if (perStore.authRoutes?.length) {
        next();
      } else {
        //获取路由
        const userAuthMenu = [
          {
            menuUrl: "/home8",
            menuComponent: "/home8",
            name: "系统管理",
            iconUrl: "SettingOutlined",
          },
        ];
        const accessedRoutes = await perStore.generateRoutes(userAuthMenu);
        for (let item of accessedRoutes) {
          router.addRoute(item);
        }

        next({
          ...to,
          replace: true,
        });
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      next("/login");
    }

    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
