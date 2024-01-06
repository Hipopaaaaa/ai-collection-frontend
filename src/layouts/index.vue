<template>
  <div>
    <div class="Content">
      <RecentTalk class="RecentTalk"></RecentTalk>
      <div class="PageContain">
        <router-view />
      </div>
    </div>
    <!-- 登录组件 -->
    <!-- <Login></Login> -->
  </div>
</template>

<script lang="ts" setup>
import RecentTalk from "./RecentTalk/index.vue";
</script>

<style lang="scss" scoped>
.Content {
  display: flex;
  // justify-content: space-between;
  width: 100%;
  .PageContain {
    // height: 100vh;
    flex-grow: 1;
  }
}
</style>
