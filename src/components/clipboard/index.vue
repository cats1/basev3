<template>
  <div class="">
    <template v-if="type === 0">
      <el-button type="primary" icon="document" @click='handleCopy(inputData,$event)'>copy</el-button>
    </template>
    <template v-else>
      <el-button type="primary" icon="document" v-clipboard:copy='inputData' v-clipboard:success='clipboardSuccess'>copy</el-button>
    </template>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  props: {
    ctype: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ''
    }
  },
  name: 'clipboardDemo',
  directives: {
    clipboard
  },
  data() {
    return {
      type: this.ctype,
      activeName: 'directly',
      inputData: this.link//'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  watch: {
    ctype (val) {
      this.type = val
    },
    link (val) {
      this.inputData = val
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>