<template>
  <div class="SiderContent">
    <div class="content">
      <div class="top">
        <router-link to="/">
          <img :src="themeStore.themeLogo" alt="ai chat logo" width="220" height="66" />
        </router-link>
      </div>
      <div class="history white-scroll">
        <!-- 扩展功能 发现 和 创建robot -->
        <div class="robotDisplay">
          <div class="robotBox primary-btn2">
            <!-- <router-link to="/explore"> -->
            <div class="temp">
              <div class="robotIcon">
                <i class="iconfont icon-setting"></i>
              </div>
              <div class="robotDesc">
                <span>Explore</span>
                <van-icon name="arrow" />
              </div>
            </div>
            <!-- </router-link> -->
          </div>
          <div class="robotBox primary-btn2">
            <!-- <router-link to="/create"> -->
            <div class="temp">
              <div class="robotIcon">
                <van-icon name="smile-o" />
              </div>
              <div class="robotDesc">
                <span>Create bot</span>
                <van-icon name="plus" />
              </div>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
        <!-- 会话记录加载时 -->

        <!-- 骨架 -->
        <div class="operate section" v-if="historyStore.historyLoading">
          <van-skeleton>
            <template #template>
              <div class="session-skeleton">
                <van-skeleton :row="3" />
                <van-skeleton-avatar avatar-shape="square" />

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
        <!-- 会话记录 最多四条 -->
        <!-- <router-link
          v-for="item in historyStore.historyList.slice(0, 4)"
          :to="`/chat/${item.id}`"
          :key="item.id"
          :class="['messageBox', 'section', { selected: $route.path === `/chat/${item.id}` }]"
        >
          <div class="avatar">
            <img :src="item.avatar" alt="assistant avatar virtual online" width="44" height="44" />
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
            删除功能
            <div class="operateChat" @click="operate(item.id, $event)">
              <van-icon name="ellipsis" />
            </div>
          </div>
        </router-link> -->
        <!-- 超出最大展示聊天数则隐藏 -->
        <div
          class="operate section"
          :class="[{ selected: $route.path === '/chats' }]"
          v-if="historyStore.historyList.length > 4"
        >
          <router-link to="/chats">
            <van-icon name="ellipsis" />
            <span>See All History</span>
          </router-link>
        </div>

        <!-- 操作区 -->
        <div class="operate section" :class="[{ selected: $route.path === '/profile' }]">
          <router-link to="/profile">
            <!-- <p> -->
            <i class="iconfont icon-profile"></i>
            <span>Profile</span>
            <!-- </p> -->
          </router-link>
        </div>
        <div class="operate section" :class="[{ selected: $route.path === '/settings' }]">
          <router-link to="/settings">
            <i class="iconfont icon-setting"></i>
            <span>Settings</span>
          </router-link>
        </div>
        <div class="operate section" :class="[{ selected: $route.path === '/contacts' }]">
          <router-link to="/contacts">
            <i class="iconfont icon-fasong"></i>
            <span>Send Feedback</span>
          </router-link>
        </div>
        <div class="bottomOperate primary-operate-btn">
          <router-link to="/privacy-policy">Pravicy Policy</router-link>
        </div>
      </div>
    </div>
    <div class="overlay" @click="closeSider"></div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, onMounted } from 'vue'
import { showConfirmDialog } from 'vant'
import { useLayout } from '@/stores/layoutSetting'
import { usethemeStore } from '@/stores/themeStore'
import { useChatStore } from '@/stores/chat'
const themeStore = usethemeStore()

const layout = useLayout()

// 隐藏侧边栏
function closeSider() {
  layout.add()
}

// 监听屏幕宽度
const screenWidth = ref(0)
onMounted(() => {
  // 创建查询列表
  // 为后续设置查询条件做准备
  let mql = [
    // window.matchMedia('(max-width: 1030px)'),
    window.matchMedia('(max-width: 1000px)')
  ]

  // 定义回调函数
  function mediaMatchs() {
    screenWidth.value = window.innerWidth
    if (mql[0].matches) {
      // 屏幕宽度小于1000px
      closeSider()
    } else {
      // 屏幕宽度大于1000px
      layout.remove()
    }
  }

  // 先运行一次回调函数
  mediaMatchs()
  // 为查询列表注册监听器，同时将回调函数传给监听器
  for (var i = 0; i < mql.length; i++) {
    mql[i].addEventListener('change', mediaMatchs)
  }
})

// 会话历史
const historyStore = useChatStore()

onMounted(async () => {
  await historyStore.getHistory()
})

const hash = ref()
onMounted(() => {
  // console.log(getCurrentInstance());
  // @ts-ignore
  hash.value = getCurrentInstance()?.type.__scopeId
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function operate(id: string, event: any) {
  event.stopPropagation()
  event.preventDefault()

  // console.log(event.currentTarget)
  // console.log('operate: ', id)
  const deleteBtn = document.createElement('div')
  deleteBtn.classList.add('delete')
  deleteBtn.innerHTML = `<i class="iconfont icon-lajitong"></i><span style="margin-left:5px;">Delete Chat</span>
  `
  // const hash = getCurrentInstance().proxy.$options._scopeId
  // console.log(hash)

  // 获取绑定点击事件的父元素
  const parent = event.currentTarget.parentNode
  // 设置hash属性
  deleteBtn.setAttribute(hash.value, '')
  // 自动聚焦
  deleteBtn.setAttribute('tabindex', '0')

  parent.appendChild(deleteBtn)

  deleteBtn.focus()

  const clickHandler = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    showConfirmDialog({
      title: 'Operation confirmation',
      message: 'Are you sure you want to delete this chat?',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ad1840'
    })
      .then(() => {
        // 用户点击了 "确定"
        // 执行操作
        console.log('delete :', id)
        // 删除会话
        // 删除dom 判断是否存在dom 如果不存在则不删除
        if (deleteBtn) {
          deleteBtn.removeEventListener('click', clickHandler)
          deleteBtn.removeEventListener('blur', blurHandler)

          deleteBtn.remove()
        }
      })
      .catch(() => {
        // on cancel
      })
  }

  const blurHandler = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('blur :', id)
    // 删除dom 判断是否存在dom 如果不存在则不删除
    if (deleteBtn) {
      deleteBtn.removeEventListener('click', clickHandler)
      deleteBtn.removeEventListener('blur', blurHandler)
      deleteBtn.remove()
    }
  }

  // 监听失去焦点事件
  deleteBtn.addEventListener('blur', blurHandler)
  // 监听点击事件
  deleteBtn.addEventListener('click', clickHandler)
}
</script>

<style lang="scss" scoped>
// 骨架屏
.van-skeleton {
  padding: 0;
  height: 80px;
}

.session-skeleton {
  --van-skeleton-paragraph-margin-top: 0;
  --van-skeleton-paragraph-height: 14px;
  flex: 1;
  display: flex;
  padding: 8px 16px;

  :deep .van-skeleton-avatar {
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

.Loading {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.SiderContent {
  position: relative;
  left: 0;
  transition: left 0.3s ease-out;

  // 控制侧边栏遮罩层的隐藏
  &.hide {
    .overlay {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  .content {
    border-right: 1px solid var(--border-color1);
    // max-width: 80vw;
    width: min($left-siderbar-width, 80vw);
    height: 100vh;
    background-color: var(--background-color1);
    position: relative;
    left: 0;
    transition: left 0.3s ease-out;

    // 控制侧边栏的隐藏
    &.hide {
      left: -100%;
      transition: left 0.3s ease-out;
    }
  }

  .top {
    height: $chat-header-height;
    background-color: var(--background-color2);
    border-bottom: 1px solid var(--border-color1);

    a {
      display: inline-block;
      height: 100%;

      img {
        height: 100%;
        width: auto;
      }
    }
  }

  // 公共样式
  .section {
    cursor: pointer;
    border-top: 1px solid var(--border-color1);

    &:hover {
      background-color: var(--hover-background-color2);
    }
  }

  .history {
    height: calc(100% - $chat-header-height);

    .robotDisplay {
      padding: 12px 16px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 8px;

      .robotBox {
        border-radius: 10px;

        a {
          color: var(--font-color1);
          padding: 8px;
          display: flex;
          flex-direction: column;
          font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;

          .robotIcon {
            height: 28px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            i {
              font-size: 24px;
            }
          }

          .robotDesc {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            line-height: 1.4;
          }
        }

        .temp {
          color: var(--font-color1);
          padding: 8px;
          display: flex;
          flex-direction: column;
          font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;

          .robotIcon {
            height: 28px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            i {
              font-size: 24px;
            }
          }

          .robotDesc {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            line-height: 1.4;
          }
        }
      }
    }

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
          width: 36px;
          height: 36px;
          border-radius: 25%;
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
          grid-column: 1 / span 2;

          /* 占据两列 */
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
          grid-column: 1 / span 2;
          /* 占据两列 */

          .chatName {
            color: var(--font-color1);
            font-size: 16px;
            overflow: hidden;
            max-height: 1.5em;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
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
      }
    }

    .operate {
      // 选中当前聊天盒子的效果
      &.selected {
        background-color: var(--selected-address-color);

        &:hover {
          background-color: var(--selected-address-color--hover);
        }
      }

      a {
        color: var(--font-color1);
        padding: 12px 16px;
        font-size: 16px;
        line-height: 1.4;
        display: flex;
        align-items: center;

        i {
          font-size: 24px;
          margin-right: 8px;
          font-weight: 500;
        }

        span {
          height: 38px;
          display: flex;
          align-items: center;
          font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
        }
      }

      p {
        color: var(--font-color1);
        padding: 12px 16px;
        font-size: 16px;
        line-height: 1.4;
        display: flex;
        align-items: center;

        i {
          font-size: 24px;
          margin-right: 8px;
          font-weight: 500;
        }

        span {
          height: 38px;
          display: flex;
          align-items: center;
          font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
        }
      }
    }

    .bottomOperate {
      border-top: 1px solid var(--border-color1);
      padding: 16px;
    }
  }
}

// 使用媒体查询控制侧边栏在宽度1000px以下隐藏
@media screen and (max-width: 1000px) {
  .SiderContent {
    position: absolute;
    width: 100%;

    .content {
      position: absolute;
      z-index: 1000;
    }

    .overlay {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--overlay-background-color);
      z-index: 999;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }
  }
}
</style>
