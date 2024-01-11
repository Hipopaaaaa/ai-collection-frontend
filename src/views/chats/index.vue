<template>
  <div class="Page">
    <ChatHeader :share="false">
      <template v-slot:middle>
        <h1>All chats</h1>
      </template>
    </ChatHeader>
    <div class="Content white-scroll">
      <div class="Content__body" v-if="!historyLoading">
        <!-- 会话记录 -->
        <router-link
          v-for="item in historyList"
          :to="`/chat/${item.id}`"
          :key="item.id"
          :class="['messageBox', 'section', { selected: $route.path === `/chat/${item.id}` }]"
        >
          <div class="avatar">
            <van-image :src="item.avatar" alt="assistant avatar virtual online" width="44" height="44" radius="25%" />
          </div>
          <div class="desc">
            <div class="descTop">
              <span class="robotName">{{ item.robotName }}</span>
              <span class="lastTime">
                {{ item.lastTime }}
                <van-icon name="arrow" />
              </span>
            </div>
            <div class="infoContainer">
              <div class="chatName">{{ item.chatName }}</div>
              <div class="lastAnswer">{{ item.lastAnswer }}</div>
            </div>
            <!-- 删除功能 -->
            <!-- <div class="operateChat" @click="operate(item.id, $event)">
              <van-icon name="ellipsis" />
            </div> -->
          </div>
        </router-link>
      </div>
      <!-- 加载效果 -->
      <div class="Content__body" v-else>
        <div class="operate section" v-for="i in 10" :key="i">
          <van-skeleton>
            <template #template>
              <div class="session-skeleton">
                <van-skeleton title avatar :row="3" class="avatar" />
                <div class="desc">
                  <div class="descTop">
                    <van-skeleton-paragraph round row-width="25%" />
                    <van-skeleton-paragraph round row-width="25%" />
                  </div>
                  <div class="infoContainer">
                    <van-skeleton-paragraph round />
                    <van-skeleton-paragraph round />
                  </div>
                </div>
              </div>
            </template>
          </van-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import { getFormatTime } from "@/utils/time";
import { getChatSessions } from "@/api/chat";
import { getRobotInfo } from "@/utils/robots";
// import { getTheme } from "@/utils/theme";
// import { useChatStore } from "@/stores/chat";
import { showConfirmDialog } from "vant";

// 会话历史
// const historyStore = useChatStore();
// let theme;
const hash = ref();
onMounted(() => {
  // theme = getTheme();
  // console.log(getCurrentInstance().type.__scopeId)
  // @ts-ignore
  hash.value = getCurrentInstance().type.__scopeId;
});

// 会话历史
const historyList = ref<any[]>([]);

const historyLoading = ref(true);
async function getHistory() {
  historyLoading.value = true;
  // 获取会话列表
  const res = await getChatSessions();
  // 翻转 使得最新的靠前
  res.data.reverse();
  // ----------------
  historyList.value = res.data.map((item: any) => {
    return {
      id: item.sessionId,
      chatName: item.content[0].detail,
      lastAnswer: item.content[0].detail,
      lastTime: getFormatTime(item.createdAt),
      robotName: getRobotInfo(item.roleId)?.robotName,
      avatar: getRobotInfo(item.roleId)?.avatar,
      roleId: item.roleId
    };
  });
  historyLoading.value = false;
}
onMounted(async () => {
  await getHistory();
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function operate(id: string, event: any) {
  event.stopPropagation();
  event.preventDefault();

  // console.log(event.currentTarget)
  // console.log('operate: ', id)
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = `<i class="iconfont icon-lajitong"></i><span style="margin-left:5px;">Delete Chat</span>
  `;
  // const hash = getCurrentInstance().proxy.$options._scopeId
  // console.log(hash)

  // 获取绑定点击事件的父元素
  const parent = event.currentTarget.parentNode;
  // 设置hash属性
  deleteBtn.setAttribute(hash.value, "");
  // 自动聚焦
  deleteBtn.setAttribute("tabindex", "0");

  parent.appendChild(deleteBtn);

  deleteBtn.focus();

  const clickHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    showConfirmDialog({
      title: "Operation confirmation",
      message: "Are you sure you want to delete this chat?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ad1840"
    })
      .then(() => {
        // 用户点击了 "确定"
        // 执行操作
        console.log("delete :", id);
        // 删除会话
        // 删除dom 判断是否存在dom 如果不存在则不删除
        if (deleteBtn) {
          deleteBtn.removeEventListener("click", clickHandler);
          deleteBtn.removeEventListener("blur", blurHandler);

          deleteBtn.remove();
        }
      })
      .catch(() => {
        // on cancel
      });
  };

  const blurHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("blur :", id);
    // 删除dom 判断是否存在dom 如果不存在则不删除
    if (deleteBtn) {
      deleteBtn.removeEventListener("click", clickHandler);
      deleteBtn.removeEventListener("blur", blurHandler);
      deleteBtn.remove();
    }
  };

  // 监听失去焦点事件
  deleteBtn.addEventListener("blur", blurHandler);
  // 监听点击事件
  deleteBtn.addEventListener("click", clickHandler);
}
</script>

<style lang="scss" scoped>
// 骨架屏
.van-skeleton {
  padding: 0;
}
.session-skeleton {
  --van-skeleton-paragraph-margin-top: 0;
  --van-skeleton-paragraph-height: 14px;
  flex: 1;
  display: flex;
  padding: 8px 16px;

  :deep(.van-skeleton-avatar) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 25%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .desc {
    width: calc(100% - 36px);
    display: grid;
    .descTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .infoContainer {
      display: grid;
    }
  }
}
// 删除按钮
.delete {
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  background-color: var(--background-color1);
  font-size: 16px;
  line-height: 1.5;
  border-radius: 24px;
  white-space: nowrap;
  color: var(--delete-button-color);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color1);
  box-shadow: 0 0 8px 1px var(--delete-button-box-shadow-color);
  &:hover {
    background-color: var(--hover-background-color3);
  }
}

h1 {
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

// 公共样式
.section {
  cursor: pointer;
  border-bottom: 1px solid var(--border-color1);

  &:hover {
    background-color: var(--hover-background-color2);
  }
}

.Content {
  height: calc(100vh - $chat-header-height);
  &__body {
    width: min(100%, 768px);
    margin: 0 auto;
    padding: 20px;
    padding-top: 0;
    .messageBox {
      display: flex;
      padding: 8px 16px;

      &:hover {
        .desc {
          .operateChat {
            width: 42px;
            height: 42px;
            i {
              display: block;
            }
          }
        }
      }
      // 选中当前聊天盒子的效果
      &.selected {
        background-color: var(--selected-address-color);

        &:hover {
          background-color: var(--selected-address-color--hover);
        }
      }

      .avatar {
        display: flex;
        align-items: center;
        margin-right: 8px;

        img {
          border-radius: 25%;
          width: 36px;
          height: 36px;
        }
      }

      .desc {
        width: calc(100% - 36px);
        display: grid;
        grid-template-rows: 18px 1fr;
        line-height: 1.5;
        position: relative;
        .descTop {
          color: var(--font-color2);
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          grid-row: 1;
          grid-column: 1 / span 2; /* 占据两列 */
          .lastTime {
            i {
              font-size: 12px;
              // rotate: 180deg;
            }
          }
        }
        .infoContainer {
          width: 100%;
          overflow: hidden;
          grid-row: 2;
          grid-column: 1 / span 2; /* 占据两列 */

          .chatName {
            color: var(--font-color1);
            font-size: 16px;
            overflow: hidden;
            max-height: 1.5em;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: "Microsoft YaHei UI", Arial, Helvetica, sans-serif;
          }

          .lastAnswer {
            font-size: 12px;
            color: var(--font-color2);
            overflow: hidden;
            max-height: 1.5em;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .operateChat {
          grid-row: 2;
          justify-self: end;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 0;
          height: 0;
          position: relative;
          // overflow: hidden;
          border-radius: 50%;
          &:hover {
            background-color: var(--hover-background-color3);
          }
          i {
            display: none;
            color: var(--font-color1);
            font-size: 24px;
            font-weight: 500;
          }
          // 删除按钮
          .delete {
            position: absolute;
            z-index: 2;
            top: 100%;
            right: 0;
            background-color: var(--background-color1);
            font-size: 16px;
            line-height: 1.5;
            border-radius: 24px;
            white-space: nowrap;
            color: var(--delete-button-color);
            padding: 10px 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--border-color1);
            &:hover {
              background-color: var(--hover-background-color3);
            }
          }
        }
      }
    }
  }
}
</style>
