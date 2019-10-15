<template>
  <div>
    <el-cascader
      :value="value"
      @input="handleInput"
      change-on-select
      :options="options"
      @change="handleItemChange"
      :props="props"
    ></el-cascader>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    value: {
      type: Array
    },
    httpRequest: {
      required: true,
      type: Function
    },
    KeyValue: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    }
  },
  data() {
    return {
      options: [],
      props: {
        label: this.KeyValue.label,
        value: this.KeyValue.value,
        children: this.KeyValue.children
      }
    }
  },

  created() {
    this.httpRequest().then(res => {
      this.options = res.data.map(v => {
        return this.addChildKey(v)
      })
    })
  },

  mounted() {
    if (this.value.length > 0) {
      this.initOptions([...this.value])
    }
  },

  methods: {
    handleInput(val) {
      this.$emit('input', [...val])
    },

    initOptions(valArr) {
      const tasks = this.produceTasks(valArr)
      this.sequenceTasks(tasks).then(res => {
        this.options = res
      })
    },

    produceTasks(arr) {
      let tasks = []
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          const fn = () => {
            return this.httpRequest('')
          }
          tasks.push(fn)
        } else {
          const fn = () => {
            return this.httpRequest(arr[i - 1])
          }
          tasks.push(fn)
        }
      }
      return tasks
    },

    sequenceTasks(tasks) {
      const childKey = this.KeyValue.children
      const recordValue = (results, value) => {
        if (results.length === 0) {
          Array.prototype.push.apply(
            results,
            value.data.map(v => {
              return this.addChildKey(v)
            })
          )
        } else {
          const pid = value.data[0].pid || ''
          let currentOption = this.findCurrentOption(pid, results)
          if (currentOption) {
            currentOption[childKey] =
              value.data.length > 0 &&
              value.data.map(v => {
                return this.addChildKey(v)
              })
          }
        }
        return results
      }
      let pushValue = recordValue.bind(null, [])
      return tasks.reduce((promise, task) => {
        return promise.then(task).then(pushValue)
      }, Promise.resolve())
    },

    handleItemChange(val) {
      const api = this.httpRequest
      const childKey = this.KeyValue.children
      api(_.last(val)).then(res => {
        const currentOption = this.findCurrentOption(_.last(val), this.options)
        currentOption[childKey] =
          res.data.length > 0 &&
          res.data.map(v => {
            return this.addChildKey(v)
          })
      })
    },

    addChildKey(v) {
      const childKey = this.KeyValue.children
      if (v.type !== '2') {
        // 非部门，有下级
        return {
          ...v,
          [childKey]: []
        }
      } else {
        return {
          ...v
        }
      }
    },

    findCurrentOption(val, initArr) {
      let currentOption
      const childKey = this.KeyValue.children
      const valueKey = this.KeyValue.value
      const itera = options => {
        for (let i = 0; i < options.length; i++) {
          let element = options[i]
          if (element[valueKey] === val) {
            currentOption = element
          } else if (
            element.hasOwnProperty(childKey) &&
            element[childKey].length > 0
          ) {
            itera(element[childKey])
          }
        }
      }
      itera(initArr)
      return currentOption
    }
  }
}
</script>
