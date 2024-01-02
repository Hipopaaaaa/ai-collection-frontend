import { ref } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";

export const useLogin = defineStore("botalker-account", () => {
  // showLogin
  const showLogin = ref(false);
  // token
  const token = ref("");
  const ChatStore = useChatStore();
  // 修改token数据
  const setLoginToken = (data: string) => {
    token.value = data;
    ChatStore.getHistory();
  };

  // account
  const account = ref<object | null>({});
  // 修改account数据
  const setLoginAccount = (data: object) => {
    account.value = data;
  };

  // 清空数据 退出登入
  const logout = () => {
    token.value = "";
    account.value = null;
    ChatStore.historyList = [];
  };

  // 缓存登录的页面路径
  const path = ref(null);

  return {
    token,
    setLoginToken,
    account,
    setLoginAccount,
    logout,
    showLogin,
    path,
  };
});
