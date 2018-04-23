<template>
	<div class="loginselectwrap">
		<el-dropdown @command="handleCommand">
		  <span class="el-dropdown-link">
		    {{list[type].name}}<i class="el-icon-caret-bottom el-icon--right"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		  	<template v-for="item in list">
		  		<el-dropdown-item :command="item.type">{{item.name}}</el-dropdown-item>
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
      list: this.$t('loginselect')
  	}
  },
  methods: {
    handleCommand(command) {
      this.type = command
      this.$emit('clickit', command)
    }
  }
}
</script>
<style lang="scss" scoped>
.loginselectwrap{
	width:150px;
}
</style>