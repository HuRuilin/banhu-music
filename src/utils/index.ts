/**
   * 数字转整数 如 100000 转为10万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   */
export default {
  // 补0方法
  formatZero (num, len) {
    if (String(num).length > len) return num
    return (Array(len).join(0) + num).slice(-len)
  },
  tranNumber (num:number, point:number) {
    const numStr = num.toString()
    // 十万以内直接返回
    if (numStr.length < 6) {
      return numStr
    // 大于8位数是亿
    } else if (numStr.length > 8) {
      const decimal = numStr.substring(
        numStr.length - 8,
        numStr.length - 8 + point
      )
      return parseFloat(parseInt((num / 100000000).toString()) + '.' + decimal) + '亿'

    // 大于6位数是十万 (以10W分割 10W以下全部显示)
    } else if (numStr.length > 5) {
      const decimal = numStr.substring(
        numStr.length - 4,
        numStr.length - 4 + point
      )
      return parseFloat(parseInt((num / 10000).toString()) + '.' + decimal) + '万'
    }
  },
  // 转换成秒
  formatSecond (time:number) {
    // 取整
    time = ~~time
    let secondTime
    if (time < 10) {
      secondTime = '00:0' + time
    } else if (time < 60) {
      secondTime = '00:' + time
    } else {
      const m = ~~parseInt(('' + (time % (1000 * 60 * 60)) / (1000 * 60)))
      const s = ~~parseInt(('' + (time % (1000 * 60)) / 1000))
      secondTime = Number(m * 60 + s)
    }
    return secondTime
  },
  // 格式化时间毫秒转分秒
  formatTime (time) {
    // 取整
    time = ~~time
    let formatTime
    if (time < 10) {
      formatTime = '00:0' + time
    } else if (time < 60) {
      formatTime = '00:' + time
    } else {
      let m = ~~parseInt(('' + (time % (1000 * 60 * 60)) / (1000 * 60)))
      if (m < 10) {
        m = '0' + m
      }
      let s = ~~parseInt(('' + (time % (1000 * 60)) / 1000))
      if (s < 10) {
        s = '0' + s
      }
      formatTime = m + ':' + s
    }
    return formatTime
  },

  // 数组随机
  shuffle (arr) {
    const _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
      const j = this.getRandomInt(0, i)
      const t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
  },
  getRandomInt (min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },

  // 时间戳转换成几分钟前，几小时前，几天前
  formatMsgTime (dateTimeStamp) {
    let result = ''
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) return
    const monthC = diffValue / month
    const weekC = diffValue / (7 * day)
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute
    if (monthC >= 1) {
      result = '' + parseInt(monthC.toString()) + '月前'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC.toString()) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC.toString()) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC.toString()) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC.toString()) + '分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },
  // 日期格式化
  dateFormat (str, type) {
    const date = new Date(str)
    const year = date.getFullYear()
    const month = this.formatZero(date.getMonth() + 1, 2)
    const day = this.formatZero(date.getDate(), 2)
    const hour = this.formatZero(date.getHours(), 2)
    const minute = this.formatZero(date.getMinutes(), 2)
    const seconds = this.formatZero(date.getSeconds(), 2)
    if (type === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`
    } else if (type === 'YYYY-MM-DD HH:MM:SS') {
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    } else if (type === 'MM/DD  HH:MM:SS') {
      return `${month}/${day} ${hour}:${minute}:${seconds}`
    }
  },
  // 秒转00:00
  formatSecondTime (interval) {
    interval = interval | 0
    const m = (interval / 60) | 0
    const s = interval % 60
    return `${this.formatZero(m, 2)}:${this.formatZero(s, 2)}`
  }
}
