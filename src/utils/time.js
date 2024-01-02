import moment from 'moment'
// 定义时间戳
// const timestamp = 1697683734

export function getFormatTime(timestamp) {
  // 获取当前时间并将其设置为当天的开始时间
  const currentDayStart = moment().startOf('day')

  // 将时间戳转换为 Moment 对象
  // .unix() 方法转换以秒为单位的时间戳
  const timestampMoment = moment.unix(timestamp)

  // 判断时间戳是否为当天
  if (timestampMoment.isSame(currentDayStart, 'day')) {
    // 时间戳在当天内
    const formattedTime = timestampMoment.format('H:mm') // 使用 'H:mm' 格式表示时间 24 小时制
    // console.log('时间戳为当天时间：', formattedTime)
    return formattedTime
  } else {
    // 时间戳不在当天内
    const formattedDate = timestampMoment.format('MMM D') // 使用 'MMM D' 格式表示日期
    // console.log('时间戳不在当天，日期为：', formattedDate)
    return formattedDate
  }
}
