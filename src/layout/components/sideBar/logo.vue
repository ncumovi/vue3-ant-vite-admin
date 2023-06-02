<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 v-else class="sidebar-title">{{ title }}</h1>
    </router-link>
    <router-link v-else key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title" v-if="title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>

import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean
    }
  },
  setup(props) {
    const { collapse } = toRefs(props);
    const logo = computed(() => {
      return collapse.value
        ? new URL("@/assets/img/logo2.png", import.meta.url).href
        : new URL("@/assets/img/logo.png", import.meta.url).href;
    });

    return {
      logo,
    }
  },
});
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  background: #001529;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    text-align: left;

    & .sidebar-logo {
      height: 30px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }


  }
}
</style>
