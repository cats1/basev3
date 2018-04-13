<template>
	<div class="noticeshowwrap boxshadow">
      <div class="notice-show-header" v-if="$slots.header || header">
      	<slot name="header">{{ header }}</slot>
      </div>
      <div class="notice-show-body" v-else >
      	<slot></slot>
      </div>		
	</div>
</template>
<script>
export default {
  name: 'noticeShow',
  props: ['header', 'bodyStyle'],
  data () {
    return {
      switchValue: this.switchFlag
    }
  },
  methods: {
    setSwitch () {
      this.$emit('gswitch', this.switchValue)
    }
  }
}
</script>
<style></style>
