<template>
  <div class="right_container">
    <div>
      <template v-for="(item, key) in activedWidget.fields">
        <component :is="item.type" :key="key + activedWidget.uuid" :field-key="key" :field-type="'fields'"></component>
      </template>
      <template v-for="(item, key) in activedWidget.styleFields">
        <component :is="item.type" :key="key + activedWidget.uuid" :field-key="key" :field-type="'styleFields'"></component>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FieldInput from './formFields/_field_input'
import FieldColorPicker from './formFields/_field_color_picker'
import FieldSelect from './formFields/_field_select'
export default {
  components: {
    FieldInput,
    FieldColorPicker,
    FieldSelect
  },
  computed: {
    ...mapState('partComponent', ['activedWidget'])
  }
}
</script>

<style>
</style>