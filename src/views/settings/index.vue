<template>
  <div class="Page">
    <ChatHeader :share="false">
      <template v-slot:middle>
        <h1>Setting</h1>
      </template>
    </ChatHeader>
    <div class="Content white-scroll">
      <div class="Content__body">
        <!-- 账号设置 -->
        <!-- <div class="settingTitle">Account Settings</div> -->
        <!-- <div class="account settingBox">
          <div class="account__avatar">
            <img :src="store.account?.avatarUrl" alt="account avatar" title="account avatar" width="40" height="40" />
            <div class="account__username">{{ store.account?.username }}</div>
          </div>
          <div class="account__email">
            {{ store.account?.email }}
            <span>Primary email</span>
          </div>
        </div> -->
        <!-- 主题设置 -->
        <!-- <div class="settingTitle">Device Settings</div> -->
        <div class="theme settingBox">
          <div class="theme__title">Appearance</div>
          <div class="radioList">
            <div class="radioBox" v-for="item in themeList" :key="item.id" @click="checkRadio(item)" :class="{ active: selectedTheme === item.value }">
              <div class="radioBox__selector"></div>
              <div class="radioBox__label">{{ item.name }}</div>
            </div>
          </div>
        </div>

        <div class="info settingBox">
          <nuxt-link to="/faq" class="info__link">FAQ</nuxt-link>
          <nuxt-link to="/privacy-policy" class="info__link">Privacy policy</nuxt-link>
          <nuxt-link to="/contacts" class="info__link">Contact us</nuxt-link>
        </div>
        <!-- 退出登录按钮 -->
        <div class="logout settingButton" @click="Logout">Logout</div>

        <!-- 弹出登录框 -->
        <!-- <div class="logout settingButton" @click="store.showLogin = true">Login</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useLogin } from '@/stores/login.js'
import { usethemeStore } from '@/stores/themeStore'
const themeStore = usethemeStore()

// const store = useLogin()
// const route = useRoute()

// 主题列表
const themeList = ref([
  {
    name: 'Light theme',
    value: 'light',
    id: 1
  },
  {
    name: 'Dark theme',
    value: 'dark',
    id: 2
  }
])
// 选中的主题Id
const selectedTheme = ref('light')
// 提取存储在浏览器本地的主题
onMounted(() => {
  selectedTheme.value = JSON.parse(localStorage.getItem('theme')) || 'light'
})
// 单选框点击事件
function checkRadio(item) {
  selectedTheme.value = item.value

  themeStore.switchTheme(item.value)
  themeStore.theme = item.value
}
// 退出登录
function Logout() {
  const router = useRouter()
  store.logout()
  router.push('/')
}


</script>

<style lang="scss" scoped>
h1 {
  // width: 100%;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.settingBox {
  border-radius: 12px;
  padding: 12px 16px;
  background-color: var(--background-color2);
  color: var(--font-color1);
  font-size: 16px;
  margin: 16px 0;
}
.settingTitle {
  font-size: 12px;
  line-height: 1.4;
  color: var(--font-color2);
}
.settingButton {
  font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
  color: var(--setting-button-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  padding: 0 10px;
  border-radius: 20px;
  background-color: var(--background-color2);
  &:hover {
    background-color: var(--hover-background-color2);
  }
}
.Content {
  height: calc(100vh - $chat-header-height);
  text-align: start;
  &__body {
    width: min(100%, 768px);
    margin: 0 auto;
    padding: 20px;
    .theme {
      &__title {
        font-weight: 700;
        padding: 8px 0;
        font-size: 16px;
      }
      .radioList {
        .radioBox {
          display: flex;
          padding: 4px 0;
          cursor: pointer;
          // 选中状态
          &.active {
            .radioBox__selector {
              border: 1px solid var(--radio__after-color);
              &::after {
                background-color: var(--radio__after-color);
              }
            }
          }

          // 选择器
          &__selector {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            border-radius: 50%;
            border: 1px solid #a5acac;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--background-color1);
            transition: background-color 0.3s ease-in-out;

            &::after {
              content: '';
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: transparent;
            }
          }
          // 文本
          // &__label {

          // }
        }
      }
    }
    .account {
      display: grid;
      row-gap: 8px;
      &__email {
        display: flex;
        flex-direction: column;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color1);
        font-size: 16px;
        line-height: 1.4;
        span {
          font-size: 12px;
          color: var(--font-color2);
        }
      }
      &__avatar {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      &__username {
        margin-left: 8px;
        font-weight: 700;
      }
    }
    .info {
      &__link {
        display: block;
        padding: 12px 0;
        font-size: 16px;
        color: var(--setting-info-link-color);
        font-family: 'Microsoft YaHei UI', Arial, Helvetica, sans-serif;
        border-bottom: 1px solid var(--border-color1);
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
