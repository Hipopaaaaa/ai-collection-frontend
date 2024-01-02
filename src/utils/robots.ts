export const robots = [
  {
    roleId: "assistant",
    robotName: "Assistant",
    avatar: "https://cdn.aiopen.cc/30031/1/robot.webp",
    operated: "Botalker",
    introduction:
      "General-purpose assistant bot with strengths in programming-related tasks and non-English languages. Powered by gpt-3.5-turbo.",
  },
  {
    roleId: "GPT-4.0",
    robotName: "GPT-4.0",
    avatar: "https://cdn.aiopen.cc/30031/1/GPT4.0.webp",
    operated: "OpenAI",
    introduction:
      "OpenAI's most powerful model. Stronger than ChatGPT in quantitative questions (math and physics), creative writing, and many other challenging tasks. Availability is currently limited.",
  },
];

// 根据roleId获取机器人信息
export const getRobotInfo = (roleId: string) => {
  // 找不到默认assistant
  return robots.find((robot) => robot.roleId === roleId)
    ? robots.find((robot) => robot.roleId === roleId)
    : robots[0];
};
