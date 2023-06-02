import { defineStore } from "pinia";

export const useUserStore = defineStore("USER", {
  state() {
    return {
      userInfo: '',
    };
  },
  actions: {
    getUserInfo(userName) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.userInfo = userName;
          resolve(userName);
        }, 1000);
      });
    },
  },
});