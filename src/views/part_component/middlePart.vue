<template>
  <div class="main-edit-part">
    <div>
      <div style="margin-bottom:20px">
        <el-button @click="handleEnlarge" type="primary" size="small" plain>放大</el-button>
        <el-button @click="handleShrink" type="primary" size="small" plain>缩小</el-button>
      </div>
      <div style="margin-bottom:20px">
        <span>大屏幕分辨率：</span>
        <el-input
          :value="bigScreenRatioWidth"
          @input="updateBigScreenRatioWidth"
          size="small"
          placeholder="长"
          style="width:90px"
        ></el-input>
        <span>X</span>
        <el-input
          :value="bigScreenRatioHeight"
          @input="updateBigScreenRatioHeight"
          size="small"
          placeholder="宽"
          style="width:90px"
        ></el-input>
      </div>
      <my-draggable></my-draggable>
    </div>
  </div>
</template>
<script>
import myDraggable from './my_draggable'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    myDraggable
  },
  props: {
    currentEstate: {
      type: String
      // required: true
    },
    screenId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height,
      magnification: 'magnification'
    })
  },

  mounted() {},
  methods: {
    ...mapMutations('partComponent', [
      'setBigScreenRatioWidth',
      'setBigScreenRatioHeight',
      'increaseMagnification',
      'decreaseMagnification'
    ]),

    updateBigScreenRatioWidth(v) {
      this.setBigScreenRatioWidth(v)
    },

    updateBigScreenRatioHeight(v) {
      this.setBigScreenRatioHeight(v)
    },

    handleEnlarge() {
      this.increaseMagnification()
    },

    handleShrink() {
      this.decreaseMagnification()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-edit-part {
  .right_container {
    background-color: #0a304d;
    position: relative;
  }
}
</style>
