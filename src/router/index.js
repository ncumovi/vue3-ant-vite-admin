import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          icon: "DesktopOutlined",
          affix: true,
          tooltip: true,
        },
      },
    ],
  },
  {
    path: "/creditLine",
    component: Layout,
    meta: {
      title: "授信额度",
      icon: "CoffeeOutlined",
      tooltip: true,
    },
    children: [
      {
        path: "home2",
        name: "home2",
        component: () => import("@/views/home2.vue"),
        meta: {
          title: "首页2",
          icon: "icon-shouye",
          tooltip: true,
        },
      },
      {
        path: "home3",
        name: "home3",
        component: () => import("@/views/home3.vue"),
        meta: {
          title: "首页3",
          icon: "icon-shouye",
          tooltip: true,
        },
      },
      {
        path: "home4",
        meta: {
          title: "授信额度2",
          icon: "icon-shouye",
          tooltip: true,
        },
        children: [
          {
            path: "home5",
            name: "home5",
            component: () => import("@/views/home5.vue"),
            meta: {
              title: "首页5",
              icon: "icon-shouye",
              tooltip: true,
            },
          },
          {
            path: "home7",
            name: "home7",
            component: () => import("@/views/home7.vue"),
            meta: {
              title: "首页6",
              icon: "icon-shouye",
              tooltip: true,
            },
          },
          {
            path: "home81",
            name: "home81",
            children: [
              {
                path: "home81-1",
                name: "home81-1",
                component: () => import("@/views/home5.vue"),
                meta: {
                  title: "home81-1",
                  icon: "icon-shouye",
                  tooltip: true,
                },
              },
            ],
            meta: {
              title: "首页81",
              icon: "icon-shouye",
              tooltip: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
