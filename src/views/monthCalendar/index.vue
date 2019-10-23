<template>
  <div>
    <full-month-calendar :set-date="setDate"></full-month-calendar>
  </div>
</template>

<script>
import FullMonthCalendar from './FullMonthCalendar'
export default {
  components: {
    FullMonthCalendar
  },
  data() {
    return {
      /**
       *year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),  
        date: date.getDate()
      */
      setDate: new Date()
    }
  }
}
</script>

<style>
</style>