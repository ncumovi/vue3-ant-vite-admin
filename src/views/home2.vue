<template>
  <h1>主页2</h1>
  <a-input v-model="age"></a-input>
</template>

<script>
import { ref } from "vue";

export default {
  name: "home2",
  setup() {
    const age = ref(0);
    return {
      age,
    };
  },
};
</script>

<style></style>
