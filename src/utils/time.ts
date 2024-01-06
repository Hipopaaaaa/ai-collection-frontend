import dayjs from "dayjs";

export function getFormatTime(timestamp: number) {
  // 获取当前时间当天开始时间
  const currentDayStart = dayjs().startOf("day");

  // 将时间戳转换为 Dayjs 对象
  const timestampDayjs = dayjs.unix(timestamp);

  if (timestampDayjs.isSame(currentDayStart, "day")) {
    // 当天
    return timestampDayjs.format("HH:mm"); // 使用 'HH:mm' 格式表示时间 24 小时制
  } else {
    // 不在当天
    return timestampDayjs.format("MMM D"); // 使用 'MMM D' 格式表示日期
  }
}
