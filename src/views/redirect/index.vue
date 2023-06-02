<script setup>
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const { params, query } = $route
const { path } = params
$router.replace({ path: '/' + path, query })
const render = function (h) {
  return h() // avoid warning message
}
</script>
