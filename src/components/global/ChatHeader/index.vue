<template>
  <header>
    <div class="collaspe">
      <van-icon name="wap-nav" @click="toggleSider" />
    </div>
    <div class="middle">
      <slot name="middle"></slot>
    </div>
    <div class="right" v-show="share" @click="copyLink">
      <van-icon name="link-o" />
      <span>Share</span>
    </div>
  </header>
</template>



<script setup lang="ts">
import { useLayout } from '@/stores/layoutSetting'
import { showToast } from 'vant';

defineProps({
  share: {
    type: Boolean,
    default: true
  }
})

const layout = useLayout()
// 切换侧边栏
function toggleSider() {
  layout.toggle()
}
async function copyLink() {
  const url = window.location.href
  try {
    await navigator.clipboard.writeText(url)
  } catch (err) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', url)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    }
    document.body.removeChild(input)
    console.log('Link copied')
  }
  showToast({
    message: 'Link copied',
    className: 'toast-copy-link-success',
    position: 'top'
  })
}
</script>



<!-- 设置全局的类名给showToast组件使用 -->
<style lang="scss">
.toast-copy-link-success {
  background-color: #00aa7a;
  font-size: 16px;
}
</style>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-color2);
  border-bottom: 1px solid var(--border-color1);
  height: $chat-header-height;
  box-sizing: border-box;
  position: relative;

  // 隐藏折叠图标但保留位置
  .collaspe {
    position: relative;
    left: -100%;
    z-index: 10;
  }
  .middle {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .right {
    padding: 6px 16px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color1);
    background-color: var(--background-color2);
    cursor: pointer;
    &:hover {
      background-color: var(--hover-background-color1);
    }
    i {
      font-size: 18px;
    }
    span {
      font-size: 14px;
    }
  }
}
@media screen and (max-width: 1000px) {
  header {
    .collaspe {
      left: 0;
      height: 100%;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: var(--font-color1);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 28px;
        font-weight: 400;
        cursor: pointer;
        &:hover {
          background-color: var(--hover-background-color2);
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  header {
    .right {
      padding: 10px;
      border-radius: 50%;
      span {
        display: none;
      }
    }
  }
}
</style>
