<template>
  <div class="right_container">
    <div>
      <el-form :model="form" ref="mainForm" :rules="rules" label-width="120px">
        <template v-for="(item, key) in form">
          <el-form-item :key="key" :prop="`${key}.${key.formModel}`" :label="item.label">
            <component :is="item.type"></component>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FieldInput from './formFields/_field_input'
import _ from 'lodash'
export default {
  components: {
    FieldInput
  },
  data() {
    return {
      form: {},
      rules: {}
    }
  },
  computed: {
    ...mapState('partComponent', ['activedWidget'])
  },
  watch: {
    activedWidget(newvalue) {
      this.form = _.cloneDeep(newvalue.fields)
    }
  },
  created() {
    // this.form = obj.formKeys.reduce((all, next) => {
    //   return {
    //     ...all,
    //     [next]: ''
    //   }
    // }, {})
  }
}
</script>

<style>
</style>