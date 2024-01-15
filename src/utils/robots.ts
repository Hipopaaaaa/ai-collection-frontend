import robot from "@/assets/image/robot.webp";
import GPT4 from "@/assets/image/GPT4.0.webp";
export const robots: robotInfo[] = [
  {
    roleId: "assistant",
    robotName: "Assistant",
    avatar: robot,
    operated: "Botalker",
    introduction:
      "General-purpose assistant bot with strengths in programming-related tasks and non-English languages. Powered by gpt-3.5-turbo."
  },
  {
    roleId: "GPT-4.0",
    robotName: "GPT-4.0",
    avatar: GPT4,
    operated: "OpenAI",
    introduction:
      "OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions (math and physics), creative writing, and many other challenging tasks. Availability is currently limited."
  }
];

// 根据roleId获取机器人信息
export const getRobotInfo = (roleId: string): robotInfo => {
  // 找不到默认assistant
  return robots.find((robot) => robot.roleId === roleId) ? robots.find((robot) => robot.roleId === roleId) as robotInfo : robots[0];
};

export interface robotInfo {
  roleId: string;
  robotName: string;
  avatar: string;
  operated: string;
  introduction: string;
}
