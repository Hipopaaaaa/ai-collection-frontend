import request from "@/utils/request";

// 获取聊天回复
export function getChatAnswer(data: any) {
  return request({
    method: "post",
    url: "/romanticchat/chat",
    data
  });
}

// 获取聊天记录
export function getChatHistory(params: any) {
  return request({
    method: "get",
    url: "/romanticchat/v2/chat/history",
    params
  });
}
// 获取和哪些角色有过会话
export function getChatSessions() {
  return request({
    method: "get",
    url: "/romanticchat/v2/chat/session"
  });
}
