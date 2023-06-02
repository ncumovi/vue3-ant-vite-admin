<template>
  <div class="wscn-http404-container">
    <img class="pic-404__parent" src="@/assets/img/404.png" alt="404" />
    <div class="bullshit">
      <a href="" class="bullshit__return-home">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pic-404__parent {
    width: 60%;
    margin-bottom: 160px;
  }
}
</style>
