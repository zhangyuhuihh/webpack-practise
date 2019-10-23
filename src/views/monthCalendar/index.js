// 日历插件待选 1.https://github.com/antoniandre/vue-cal
import { storiesOf } from '@storybook/vue'
import monthCalendar from './index.vue'

storiesOf('月份日历控件测试', module)
  .add('monthCalendar', () => ({
    template: '<monthCalendar></monthCalendar>',
    components: { monthCalendar }
  }))
  