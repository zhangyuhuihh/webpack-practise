import { storiesOf } from '@storybook/vue'
import DepartmentSelect from './departmentSelect'

storiesOf('级联组件测试', module)
  .add('departmentSelect', () => ({
    template: '<DepartmentSelect></DepartmentSelect>',
    components: { DepartmentSelect }
  }))
  