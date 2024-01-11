import request from "@/utils/request";

export function gologin(data: any) {
  return request({
    method: "post",
    url: "https://api.ai-code-debug.com/romanticchat/auth",
    data
  });
}
