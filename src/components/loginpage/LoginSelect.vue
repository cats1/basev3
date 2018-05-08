<template>
	<div class="loginselectwrap">
		<el-dropdown @command="handleCommand">
      <template v-if="type === 0">
        <span class="el-dropdown-link">
        {{this.$t('loginselect[0]')}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
        </span>
      </template>
      <template v-else-if="type === 1">
        <span class="el-dropdown-link">
        {{this.$t('loginselect[1]')}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
        </span>
      </template>
      <template v-else-if="type === 2">
        <span class="el-dropdown-link">
        {{this.$t('loginselect[2]')}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
        </span>
      </template>
      <template v-else-if="type === 3">
        <span class="el-dropdown-link">
        {{this.$t('loginselect[3]')}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
        </span>
      </template>
      <template v-else-if="type === 4">
        <span class="el-dropdown-link">
        {{this.$t('loginselect[4]')}}<i class="el-icon-caret-bottom el-icon--right fa-lg"></i>
        </span>
      </template>
		  
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
  	  type: this.ltype
  	}
  },
  watch: {
    ltype (val) {
      this.type = val
    }
  },
  methods: {
    handleCommand(command) {
      this.type = command
      this.$emit('sendkit',command)
    }
  }
}
</script>
<style lang="scss" scoped>
.loginselectwrap{
	width:auto;
}
</style>