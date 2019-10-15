<template>
  <div>
    <DepartmentSelect v-model="selectedData" :KeyValue="KeyValue" :httpRequest="httpRequest"></DepartmentSelect>
  </div>
</template>
<script>
import { selectOrganization } from './api'
import DepartmentSelect from './departmentSelect'

export default {
  components: {
    DepartmentSelect
  },
  data() {
    return {
      KeyValue: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      selectedData: ['4', '5', '7', '8']
    }
  },

  created() {},

  methods: {
    httpRequest(queryParams) {
      return selectOrganization(queryParams)
    }
  }
}
</script>
