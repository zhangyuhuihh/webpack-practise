import { storiesOf } from '@storybook/vue'
import calendar from './calendar'

storiesOf('日历控件测试', module)
  .add('calendar', () => ({
    template: '<calendar></calendar>',
    components: { calendar }
  }))
  