<template>
  <div class="pageContent">
    <!-- <ChatHeader class="chatHeader">
      <template v-slot:middle>
        <h1>Home</h1>
      </template>
    </ChatHeader> -->
    <div class="Content white-scroll">
      <div class="Content__body">
        <div class="icon">
          <base-image
            fit="cover"
            position="center"
            :src="themeStore.themeLogo"
            alt="ai chat logo"
            width="220"
            height="auto"
          ></base-image>
        </div>
        <RobotSelect :robots="robots" v-model:id="roleId"></RobotSelect>
        <div :class="['inputBox', { active: inputFocus }]">
          <input
            type="text"
            placeholder="Start a new chat"
            v-model="inputValue"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            @keydown.enter="sendAnswer"
          />
          <div :class="['sendButton', { active: inputValue }]" @click="sendAnswer">
            <van-icon name="down" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "@/stores/chat";
import { usethemeStore } from "@/stores/themeStore";
import { robots } from "@/utils/robots";
const inputFocus = ref(false);
const inputValue = ref("");
const chatStore = useChatStore();
const router = useRouter();
const roleId = ref<string>("assistant");

const themeStore = usethemeStore();

function sendAnswer() {
  // 如果没有输入内容，直接返回
  if (!inputValue.value) {
    return;
  }
  chatStore.message = inputValue.value;
  inputValue.value = "";
  router.push(`/robots/${roleId.value}`);
}
// 自动聚焦
onMounted(() => {
  const input = document.querySelector("input") as HTMLInputElement;
  input.focus();
});
</script>

<style lang="scss" scoped>
// 控制页面大于1000px时隐藏头部组件
@media screen and (min-width: 1000px) {
  .chatHeader {
    position: relative;
    top: -100%;
  }
}

h1 {
  // width: 100%;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.pageContent {
  .Content {
    // height: calc(100vh - $chat-header-height);
    margin: 0 auto;
    padding: 0 20px;
    background-color: var(--background-color1);
    display: flex;
    justify-content: center;
    &__body {
      width: min(100%, 768px);
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      .icon {
        margin-top: 100px;
        // padding: 36px 0;
        text-align: center;
        :deep(.van-image__loading) {
          background: inherit;
        }
        img {
          height: 80px;
          width: auto;
        }
      }
      .inputBox {
        height: 48px;
        padding: 2px 10px;
        border: 2px solid var(--placeholder-color);
        border-radius: 40px;
        margin: 0 auto;
        margin-top: 20px;
        color: var(--font-color1);
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        max-width: 600px;
        min-width: 90%;
        transition: border-color 0.3s;
        &.active {
          border-color: var(--border-active-color);
        }
        input {
          flex-grow: 1;
          font-size: 16px;
          height: 100%;
          border: none;
          outline: none;
          background-color: var(--background-color1);
          &::placeholder {
            color: var(--placeholder-color);
          }
        }
        .sendButton {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--border-active-color);
          opacity: 0.5;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(-90deg);
          transition: opacity 0.3s;

          &.active {
            opacity: 1;
            cursor: pointer;
          }
          i {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
