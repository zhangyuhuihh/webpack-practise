<template>
  <div>
    <span>{{labelData}}</span>
    <el-input :value="modelData" @input="handleFieldModelChange"></el-input>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
export default {
  mixins: [fieldMixins]
}
</script>
