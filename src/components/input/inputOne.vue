<template>
  <div class="inputonewrap marginr20 marginbom20">
    <el-input v-model="value1" @change="setValue">
      <el-button slot="append" icon="el-icon-close" @click="deleteValue"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'inputOne',
  props: ['value','index'],
  data () {
    return {
      value1: this.value
    }
  },
  mounted () {
    console.log(this.value)
  },
  methods: {
    deleteValue () {
      this.$emit('delekit',this.index,this.value1)
    },
    setValue (val) {
      this.$emit('getv',this.index,this.value1)
    }
  }
}
</script>
<style lang="scss" scoped>
.inputonewrap{
  width:200px;
  display: inline-block;
  float: left;
}
</style>