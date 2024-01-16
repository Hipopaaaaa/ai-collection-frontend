<template>
  <div class="pageContent">
    <div class="Content">
      <ChatHeader>
        <template v-slot:middle>
          <div class="header__middle">
            <van-image :src="robotInfo?.avatar" alt="assistant avatar virtual online" width="44" height="44" radius="25%" />
            <div class="desc">
              <div class="chatName">ChatName</div>
              <div class="robotName">{{ robotInfo.robotName }}</div>
            </div>
          </div>
        </template>
      </ChatHeader>
      <div class="Content__body">
        <div class="Content__body__messageList white-scroll" @mousewheel="scrollChange" @touchmove="scrollChange">
          <div class="middleContainer">
            <!-- 回答的盒子 -->
            <!-- 初始提示 -->
            <div class="messageBox" :class="[{ user: false }]">
              <div class="messageBox__info" v-if="true">
                <div class="messageBox__info__avatar">
                  <img :src="robotInfo.avatar" alt="assistant avatar virtual online" title="assistant avatar virtual online" width="22" height="22" />
                </div>
                <div class="messageBox__info__name">{{ robotInfo.robotName }}</div>
                <div class="messageBox__info__provider">{{ robotInfo.operated }}</div>
              </div>
              <div class="messageBox__message">
                <div class="messageBox__message__Item">
                  <span>Hello! How can I assist you today?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['Content__body__inputBox', 'primary-inputBox', { active: inputFocus }]">
          <input
            type="text"
            placeholder="Talk to Assistant on Botalker"
            v-model="inputValue"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            @keydown.enter="sendAnswer"
          />
          <div :class="['sendButton', 'primary-inputBox-sendBtn', { active: inputValue }]" @click="sendAnswer"><van-icon name="down" /></div>
        </div>
      </div>
    </div>
    <div class="robotDesc white-scroll" :class="[{ hide: !showDesc }]">
      <!-- 介绍头部 -->
      <div class="robotDesc__head">
        <span>Bot details</span>
        <van-icon name="cross" @click="closeDesc" />
      </div>
      <!-- 介绍内容 -->
      <div class="robotDesc__content">
        <div class="robotDesc__content__top">
          <!-- 头像 -->
          <div class="avatar">
            <van-image :src="robotInfo?.avatar" alt="robot avatar virtual online" title="robot avatar virtual online" width="66" height="66" radius="50%" />
          </div>
          <div class="name">
            <div class="name">{{ robotInfo.robotName }}</div>
            <div class="operate">Operated by {{ robotInfo.operated }}</div>
          </div>
        </div>
        <div class="robotDesc__content__operate">
          <!-- <div class="newChat_button">
            <van-icon name="plus" />
            <span>New chat</span>
          </div> -->
          <!-- <div>后续扩展按钮</div> -->
        </div>
        <div :class="['robotDesc__content__info', { show: showInfo }]" id="introduction">
          {{ robotInfo.introduction }}
          <!-- 信息折叠功能 -->
          <span v-show="showIcon" @click="toggleShow" title="click to toggle">
            <div v-if="!showInfo">more</div>
            <van-icon v-else name="arrow-up" />
          </span>
        </div>
        <!-- 分割线 -->
        <hr />
        <!--  -->
        <div class="robotDesc__content__created">
          This bot is powered by {{ robotInfo.operated }}.
          <span>Learn more</span>
        </div>
        <!--  -->
        <div class="primary-operate-btn">
          <router-link :to="`/chats?bot=${robotInfo.operated}`">See all chats with this bot</router-link>
          <!-- <p>See all chats with this bot</p> -->
        </div>
      </div>
    </div>
    <div class="robotDesc--collapse" :class="[{ show: !showDesc }]" @click="toshowDesc"><van-icon name="arrow-left" /></div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from '@/stores/chat'
import { generateSessionId } from '@/utils/session'
import { getRobotInfo } from '@/utils/robots'


let sessionId:any
// onMounted(() => {
  // 生成sessionId
  sessionId = generateSessionId()
// })


const route = useRoute()
const chatStore = useChatStore()

// console.log(route.params);

const roleId = route.params.roleId as string

// 机器人信息
const robotInfo = getRobotInfo(roleId)

const inputValue = ref('')
const inputFocus = ref(false)

// 自动聚焦
onMounted(() => {
  const input = document.querySelector('input') as HTMLInputElement
  input.focus()
})

onMounted(() => {
  // 获取聊天消息，并清空pinia中的聊天消息
  if (chatStore.message) {
    inputValue.value = chatStore.message
    // 发送聊天消息
    sendAnswer()
  }
})
// 控制展示robot更多信息
const showInfo = ref(false)
function toggleShow() {
  showInfo.value = !showInfo.value
}

// 控制机器人介绍栏的显示和隐藏
const showDesc = ref(false)
// 控制信息折叠按钮的显示和隐藏
const showIcon = ref(false)
function updateIconShow(textElement:HTMLElement) {
  if (!textElement) {
    return
  }
  const realHeight = textElement.getBoundingClientRect().height
  const scrollHeight = textElement.scrollHeight
  // console.log('real', realHeight)
  // console.log('scroll', scrollHeight)

  if (realHeight < scrollHeight) {
    showIcon.value = true
    // 如果realHeight小于scrollHeight，说明文本被截断了
  } else {
    showIcon.value = false
  }
}
onMounted(() => {
  // 获取introduction元素
  const introduction = document.getElementById('introduction') as HTMLElement
  updateIconShow(introduction)
})
function closeDesc() {
  showDesc.value = false
}
function toshowDesc() {
  showDesc.value = true
}
// 监听屏幕宽度
const screenWidth = ref(0)
onMounted(() => {
  // 创建查询列表
  // 为后续设置查询条件做准备
  let mql = [window.matchMedia('(max-width: 768px)')]
  // 定义回调函数
  function mediaMatchs() {
    screenWidth.value = window.innerWidth
    if (mql[0].matches) {
      // 屏幕宽度小于768px
      closeDesc()
    } else {
      // 屏幕宽度大于768px
      toshowDesc()
    }
  }
  // 先运行一次回调函数
  mediaMatchs()
  // 为查询列表注册监听器，同时将回调函数传给监听器
  for (var i = 0; i < mql.length; i++) {
    mql[i].addEventListener('change', mediaMatchs)
  }
})


// 监听鼠标滚动事件
const isScroll = ref(false)

// 发送聊天消息
const router = useRouter()
// 发送聊天消息---------------------------------------------------------------------------
function sendAnswer() {
  // 如果没有输入内容，直接返回
  if (!inputValue.value) {
    return
  }
  chatStore.message = inputValue.value
  chatStore.roleId = roleId
  inputValue.value = ''
  router.push(`/chat/${sessionId}`)
}
// -------------------------------------------------------------------------------------------

// 监听鼠标滚动事件
function scrollChange() {
  isScroll.value = true
}

</script>

<style lang="scss" scoped>
// 变量

// 设置robotDesc宽度
$robotDesc-width: 300px;

// 设置.robotDesc--collapse边距
$collapse-show-right: 10px;
$collapse-hide-right: $robotDesc-width + $collapse-show-right;

// 对话加载动画
.waiting {
  display: none;
  &.show {
    display: block;
  }
}
.header__middle {
  display: flex;
  img {
    width: 36px;
    height: 36px;
    border-radius: 25%;
  }
  .desc {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    max-width: 100%;
    .chatName {
      font-size: 16px;
      color: var(--font-color1);
      font-weight: 700;
      font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .robotName {
      font-size: 14px;
      color: var(--font-color2);
      font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}

.pageContent {
  color: var(--font-color1);
  display: flex;
  // 针对介绍栏的隐藏配置
  overflow-x: hidden;
  position: relative;
  .Content {
    flex-grow: 1;
    width: calc(100% - $left-siderbar-width);
    &__body {
      height: calc(100vh - $chat-header-height);
      margin: 0 auto;
      background-color: var(--background-color1);
      display: flex;
      flex-direction: column;
      align-items: center;
      // 消息列表
      &__messageList {
        width: 100%;
        height: calc(100% - $chat-header-height - 20px);
        display: flex;
        justify-content: center;
        padding: 16px 28px;
        .middleContainer {
          width: min(100%, 768px);

          // 消息盒子
          .messageBox {
            &.user {
              display: flex;
              flex-direction: row-reverse;
              .messageBox__message {
                align-items: flex-end;
                &__Item {
                  color: var(--messagebox-user-font-color);
                  background-color: #3b3abe;
                }
              }
            }

            &__info {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              &__avatar {
                margin-right: 4px;
                img {
                  width: 22px;
                  height: 22px;
                  border-radius: 25%;
                }
              }
              &__name {
                font-size: 16px;
                font-weight: 600;
                color: var(--font-color1);
              }
              &__provider {
                font-size: 16px;
                color: var(--border-active-color);
                margin-left: 8px;
                border: var(--border-color1) 1px solid;

                padding: 2px 4px;
                height: 24px;
                border-radius: 12px;
              }
            }
            &__message {
              display: flex;
              flex-direction: column;

              &__Item {
                width: fit-content; /* 让子盒子的宽度根据内容自动调整 */
                line-height: 1.5;
                font-size: 18px;
                word-wrap: break-word;
                background-color: var(--messagebox-answer-background-color);
                color: var(--messagebox-answer-font-color);
                border-radius: 12px;
                margin-bottom: 10px;
                padding: 10px;
              }

              @keyframes flash {
                from {
                  opacity: 0;
                }

                to {
                  opacity: 1;
                }
              }
              .textLoading {
                margin-left: 0.2em;
                animation: flash 1s linear infinite;
              }
            }
          }
        }
      }
      &__inputBox {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: min(100%, 768px);

        .sendButton {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(-90deg);

          i {
            font-size: 20px;
          }
        }
      }
    }
  }

  .robotDesc {
    width: $robotDesc-width;
    border-left: 1px solid var(--border-color1);
    height: 100vh;
    background-color: var(--background-color1);
    z-index: 1;

    margin-right: 0;
    // 过渡效果
    transition: margin-right 0.3s ease-in-out;
    // 隐藏样式
    &.hide {
      margin-right: -$robotDesc-width;
    }

    &__head {
      height: $chat-header-height;
      background-color: var(--background-color2);
      border-bottom: 1px solid var(--border-color1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
      font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
      padding-left: 16px;
      padding-right: 4px;
      i {
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        font-size: 20px;
        font-weight: 500;
        &:hover {
          background-color: var(--hover-background-color2);
        }
      }
    }
    &__content {
      padding: 16px;
      display: grid;
      row-gap: 8px;
      // 顶部头像和名称
      &__top {
        display: flex;
        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            border: 1px solid var(--border-color1);
          }
        }
        .name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-size: 20px;
            font-weight: 600;
            color: var(--font-color1);
          }
          .operate {
            font-size: 14px;
            color: #666;
          }
        }
      }
      // 操作区域
      &__operate {
        display: flex;
        .newChat_button {
          color: #fff;
          background-color: var(--border-active-color);
          padding: 8px 16px;
          font-size: 14px;
          height: 35px;
          border-radius: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          cursor: pointer;
          opacity: 0.95;

          i {
            margin-right: 8px;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
      // 机器人信息
      &__info {
        font-size: 16px;
        line-height: 1.4;
        font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
        max-height: 4.2em; /* 设置最大高度，相当于3行文本高度 */
        overflow: hidden; /* 隐藏超出容器的内容 */
        position: relative;
        &.show {
          max-height: none;
        }
        span {
          cursor: pointer;
          color: var(--border-active-color);
          display: block;
          padding: 1px 0;
          padding-left: 10px;
          line-height: 1.4;
          border-radius: 14px;
          position: absolute;
          bottom: 0;
          right: 0;
          backdrop-filter: blur(2px);
          &:hover {
            // 下划线
            text-decoration: underline;
          }
        }
      }
      // 分割线
      hr {
        border: none;
        height: 1px;
        background-color: var(--border-color1);
      }
      // 机器人创建信息
      &__created {
        color: var(--font-color2);
        font-size: 12px;
        span {
          color: var(--border-active-color);
          cursor: pointer;
        }
      }
    }
  }
  .robotDesc--collapse {
    position: absolute;
    z-index: 10;
    top: 50%;
    right: $collapse-show-right;
    transform: translateY(-50%);
    padding: 8px;
    background-color: var(--border-color1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    // 过渡效果
    overflow: hidden;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, right 0.3s ease-in-out;
    // 隐藏状态
    opacity: 0;
    transform: scale(0);
    right: $collapse-hide-right;
    &.show {
      opacity: 1;
      transform: scale(1);
      right: $collapse-show-right;
    }
    i {
      font-size: 24px;
      font-weight: 700;
    }
  }
}
@media screen and (max-width: 768px) {
  .pageContent {
    .robotDesc {
      position: absolute;
      right: 0;
      z-index: 10;
      transition: right 0.3s ease-in-out;
      &.hide {
        margin-right: 0;
        right: -$robotDesc-width;
      }
    }
  }
}
</style>
