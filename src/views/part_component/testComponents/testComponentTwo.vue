<template>
  <div
    class="testComponent_one"
    :style="{
    color: currentWidgetStyleFields.color.formModel,
    fontSize: currentWidgetStyleFields.fontSize.formModel
  }"
  >
    <span>哈哈</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('partComponent', ['widgetList']),
    currentWidgetStyleFields() {
      return this.widgetList.find(v => v.uuid === this.uuid).styleFields
    }
  }
}
</script>

<style>
.testComponent_one {
  width: 50px;
  height: 50px;
}
</style>