<template>
	<div class="loginselectwrap">
		<el-dropdown @command="handleCommand">
		  <span class="el-dropdown-link">
		    {{defaultValue}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		  	<template v-for="(item,index) in $t('loginselect')">
		  		<el-dropdown-item :command="index">{{item}}</el-dropdown-item>
		  	</template>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
export default{
  name: 'LoginSelect',
  props: {
    ltype: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
  	  type: this.ltype,
      defaultValue: this.$t('loginselect[0]')
  	}
  },
  watch: {
    ltype (val) {}
  },
  methods: {
    handleCommand(command) {
      this.type = command
      let list = this.$t('loginselect')
      this.defaultValue = list[command]
      this.$emit('clickit', command)
    }
  }
}
</script>
<style lang="scss" scoped>
.loginselectwrap{
	width:auto;
}
</style>