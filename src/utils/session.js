// plugins/session.js
import { v4 as uuidv4 } from "uuid";
// 生成唯一的sessionId（示例）
export function generateSessionId() {
  // 实现你自己的sessionId生成逻辑
  // 可以使用uuid等库来生成唯一的标识符
  // 返回生成的sessionId
  return uuidv4();
}
