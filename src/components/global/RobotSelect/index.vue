<template>
  <div class="container">
    <div class="robotList">
      <div
        class="robotBox"
        v-for="item in robots"
        :key="item.roleId"
        @click="selectRobot(item)"
        :class="{ active: active == item.roleId }"
      >
        <div class="avatar">
          <van-image
            fit="cover"
            position="center"
            width="22"
            height="22"
            :src="item.avatar"
            alt="robot avatar"
            title="robot avatar"
          />
        </div>
        <div class="name">{{ item.robotName }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "RobotSelect"
});
defineProps<{
  robots: any[];
}>();

const active = ref("assistant");
const emits = defineEmits<{
  (event: "update:id", roleId: string): void;
}>();

function selectRobot(item: any) {
  // console.log(item.roleId)
  emits("update:id", item.roleId);
  active.value = item.roleId;
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 90%;
}
.robotList {
  display: flex;
  justify-content: center;
  .robotBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border: 1px solid var(--placeholder-color);
    border-radius: 22px;
    margin-right: 8px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background-color: var(--hover-background-color2);
    }
    &.active {
      background-color: var(--border-active-color);
      .avatar {
        border-color: #fff;
      }
      .name {
        color: #fff;
      }
    }
    .avatar {
      width: 22px;
      height: 22px;
      border-radius: 25%;
      border: 1px solid transparent;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      margin-left: 8px;
      font-size: 16px;
    }
  }
}
</style>
