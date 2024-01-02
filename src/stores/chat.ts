import { defineStore } from "pinia";
import { ref } from "vue";
// import { getChatSessions } from "@/api/chat";
// import { getFormatTime } from "@/utils/time";
// import { getRobotInfo } from "@/utils/robots";

export const useChatStore = defineStore("ChatStore", () => {
  const message = ref("");
  const roleId = ref("assistant");
  const historyList = ref([]);
  const historyLoading = ref(true);
  async function getHistory() {
    historyLoading.value = true;
    // 获取会话列表
    // const res = await getChatSessions();
    // // 翻转 使得最新的靠前
    // res.data.reverse();
    // // ----------------
    // historyList.value = res.data.map((item) => {
    //   return {
    //     id: item.sessionId,
    //     chatName: item.content[0].detail,
    //     lastAnswer: item.content[0].detail,
    //     lastTime: getFormatTime(item.createdAt),
    //     robotName: getRobotInfo(item.roleId).robotName,
    //     avatar: getRobotInfo(item.roleId).avatar,
    //     roleId: item.roleId,
    //   };
    // });
    historyLoading.value = false;
  }
  return { message, roleId, historyList, historyLoading, getHistory };
});
