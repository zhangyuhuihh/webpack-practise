<template>
  <div id="app">
    <year-calendar
      v-model="year"
      :activeDates.sync="activeDates"
      @toggleDate="toggleDate"
      :lang="lang"
      prefixClass="your_customized_wrapper_class"
      :activeClass="activeClass"
      :showYearSelector="showYearSelector"
      :hideWeekend="hideWeekend"
      :hideSunday="hideSunday"
    ></year-calendar>
  </div>
</template>

<script>
import YearCalendar from './YearCalendar.vue'
import dayjs from 'dayjs'

export default {
  name: 'app',
  components: {
    YearCalendar
  },
  data () {
    return {
      lang: 'tw', // 'en', 'tw', 'pt'
      year: (new Date()).getFullYear(),
      activeDates: [
        // { date: '2019-02-13' },
        // { date: '2019-02-14', className: 'red' },
        // { date: '2019-02-15', className: 'blue' },
        // { date: '2019-02-16', className: 'your_customized_classname' }
      ],
      activeClass: '',
      showYearSelector: true,
      hideWeekend: false,
      hideSunday: false
    }
  },
  methods: {
    toggleDate (dateInfo) {
      // todo -具体的业务逻辑
      console.log(dateInfo)
    },

    add_sat_and_sun_of_year () {
      let theDate = dayjs(`${this.year}-01-01`)

      while (theDate.diff(theDate.endOf('year'), 'day') !== 0) {
        if (theDate.day() === 6 || theDate.day() === 0) {
          // 將週六或週日加入 activeDates 中
          // add weekend to activeDates
          this.activeDates.push(theDate.format('YYYY-MM-DD'))
        }
        theDate = theDate.add(1, 'day')
      }
    },
    // addWeekendCurrentYear () {
    //   this.removeWeekendCurrentYear()
    //   let theDate = dayjs(`${this.year}-01-01`)
    //   let isActiveDateUsingString = this.activeDates.length && typeof this.activeDates[0] === 'string'
    //   while (theDate.diff(theDate.endOf('year'), 'day') !== 0) {
    //     if (theDate.day() === 6 || theDate.day() === 0) {
    //       // add weekend to activeDates
    //       let oDate = isActiveDateUsingString ? theDate.format('YYYY-MM-DD') : { date: theDate.format('YYYY-MM-DD') }
    //       this.activeDates.push(oDate)
    //     }
    //     theDate = theDate.add(1, 'day')
    //   }
    // },
    // removeWeekendCurrentYear () {
    //   this.activeDates = this.activeDates.filter(oDate => {
    //     let date = typeof oDate === 'string' ? oDate : oDate.date
    //     let day = dayjs(date).day()
    //     let isCurrentYear = dayjs(date).year() === this.year
    //     let isWeekend = [6, 0].includes(day)
    //     return !(isCurrentYear && isWeekend)
    //   })
    // }
  }
}
</script>

<style lang="stylus">
*
  margin 0
  padding 0
  box-sizing border-box
#app
  padding 60px
  background-color #eaeaea
.your_customized_wrapper_class
  background-color: #0aa
  color: white
  &.red
    background-color: #a00
    color: white
    &:after
      background-image url('../../icons/svg/baseline-remove_circle-24px.svg')
      background-size 100% 100%
  &.blue
    background-color: #0000aa
    color: white
  &.your_customized_classname
    background-color: yellow
    color: black

</style>
