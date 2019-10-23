<template>
  <div class="calendar-container">
    <div class="year">
      <div>
        <!-- <span class="fl" @click="lastYear">«</span> -->
        <span class="fl" @click="lastMonth">‹</span>
        <p>{{nowDate.year}}年{{nowDate.month + 1}}月</p>
        <!-- <span class="fr" @click="nextYear">»</span> -->
        <span class="fr" @click="nextMonth">›</span>
      </div>
    </div>
    <ul class="week">
      <li v-for="(o, index) in 7" :key="o">
        <div class="week_cell">{{formatWeek(index)}}</div>
      </li>
    </ul>
    <ul class="date">
      <li class="none-week" v-for="o in lastMonthDays" :key="o+50">
        <div class="date_cell">{{lastMonthStartDay + o - 1}}</div>
      </li>
      <li @click="clickEvent" v-for="day in nowMonthDays" :key="day">
        <div class="date_cell">{{day}}{{getFestival(day)}}</div>
      </li>
      <li class="none-week" v-for="day in getLastNoneWeeks()" :key="day + 100">
        <div class="date_cell">{{day}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Lunar, FESTIVAL } from './festival'
export default {
  props: ['setDate'],
  data() {
    return {
      selectDate: [], //选择日期列表
      nowDate: this.getDate(new Date()) //当前设置时间 默认为当前系统时间
    }
  },
  computed: {
    lastMonthDays() {
      return this.startWeek()
    },
    lastMonthStartDay() {
      return (
        this.calcLastMonthDays(this.nowDate.year, this.nowDate.month) -
        (this.startWeek() - 1)
      )
    },
    nowMonthDays() {
      return this.calcDays(this.nowDate.year, this.nowDate.month)
    }
  },
  created() {
    if (this.setDate) {
      this.nowDate = this.getDate(this.setDate)
    }
  },
  methods: {
    getFestival(day) {
      const yinliMsg = Lunar.toLunar(this.nowDate.year, this.nowDate.month, day)
      const yinliDay = yinliMsg[5] + yinliMsg[6]
      const yangliDay =
        FESTIVAL[
          String(this.nowDate.month + 1).padStart(2, '0') +
            String(day).padStart(2, '0')
        ]

      return (FESTIVAL[yinliDay] || '') + (yangliDay || '')
    },

    getLastNoneWeeks() {
      const dayNum = 42 - this.lastMonthDays - this.nowMonthDays
      return dayNum >= 7 ? (dayNum - 7) : dayNum
    },

    getDate(date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        date: date.getDate()
      }
    },
    formatWeek(day) {
      switch (day) {
        case 0:
          return '周日'
        case 1:
          return '周一'
        case 2:
          return '周二'
        case 3:
          return '周三'
        case 4:
          return '周四'
        case 5:
          return '周五'
        case 6:
          return '周六'
      }
    },
    //判断闰年
    isLeapYear(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    },
    //根据日子计算星期
    calcWeekend(year, month, day) {
      return new Date(year, month, day).getDay()
    },
    //计算某年某月的天数
    calcDays(year, month) {
      const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (this.isLeapYear(year) && month === 1) return 29
      else return monthDay[month]
    },
    //计算上个月天数
    calcLastMonthDays(year, month) {
      if (month === 0) {
        return this.calcDays(year - 1, 11)
      } else {
        return this.calcDays(year, month - 1)
      }
    },
    //上月
    lastMonth() {
      if (this.nowDate.month === 0) {
        this.nowDate.month = 11
        // this.nowDate.year-- 注释这行，保持当年内循环
      } else {
        this.nowDate.month--
      }
    },
    //下月
    nextMonth() {
      if (this.nowDate.month === 11) {
        this.nowDate.month = 0
        // this.nowDate.year++
      } else {
        this.nowDate.month++
      }
    },
    //去年
    // lastYear() {
    //   this.nowDate.year--
    // },
    //下一年
    // nextYear() {
    //   this.nowDate.year++
    // },
    //计算当月开始星期
    startWeek() {
      return this.calcWeekend(this.nowDate.year, this.nowDate.month, 1)
    },
    //
    clickEvent(e) {
      let monthNo = this.nowDate.month
      let month = monthNo <= 11 ? monthNo + 1 : 0
      let date = {
        year: this.nowDate.year,
        month: month,
        week: new Date(
          this.nowDate.year,
          this.nowDate.month,
          e.target.innerText
        ).getDay(),
        day: Number(e.target.innerText)
      }
      this.$emit('click-event', date)
    }
  }
}
</script>


<style lang='scss' scoped>
.calendar-container {
  // padding: 2vw 3vw;
  padding: 20px;
}
.year {
  text-align: center;
  margin-bottom: 10px;
  height: 30px;
  > div {
    height: 30px;
    overflow: hidden;
  }
  span {
    line-height: 30px;
    font-size: 20px;
    display: inline-block;
    width: 10%;
  }
  p {
    line-height: 30px;
    width: 30%;
    display: inline-block;
    margin: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
}
.week,
.date {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  li {
    width: 14.2%;
    text-align: center;
  }
}
.week {
  margin-bottom: 5px;
  .week_cell {
    // padding-bottom: 8px;
  }
}

.date {
  .none-week {
    color: #aaa;
  }
  .date_cell {
    height: 120px;
    border: 0.5px solid #ddd;
  }
}
</style>