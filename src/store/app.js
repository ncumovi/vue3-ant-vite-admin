import { defineStore } from "pinia";

export const useAppStore = defineStore("APP", {
  state() {
    return {
      sidebar: {
        opened: false,
      },
    };
  },
  // 和vuex一样
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
    },
  },
});
