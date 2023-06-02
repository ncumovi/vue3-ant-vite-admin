<template>
  <a-config-provider :locale="locale">
    <a-layout id="app-content">
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </a-layout>
  </a-config-provider>
</template>


<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default {
  setup() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
#app-content {
  font-family: Microsoft YaHei, Arial, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
}
</style>
