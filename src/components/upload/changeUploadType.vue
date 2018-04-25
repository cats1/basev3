<template>
	<div class="boxshadow margintop20 paddinglr30 paddingtb20">
		<h3>{{$t('btn.exportListBtn')}}</h3>
		<el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="(item,index) in $t('exporttype.list')"
			      :key="item"
			      :label="item"
			      :value="index">
			    </el-option>
		</el-select>
		<div class="margintop20">
			<el-button type="primary" @click="confirmGo">{{$t('btn.confirmBtn')}}</el-button>
			<el-button @click="cancelBack">{{$t('btn.cancelBtn')}}</el-button>
		</div>
		<div class="margintop20">
			<template v-if="etype === 1">
				<p>{{$t('exporttype.desc6')}}{{$t('exporttype.list[1]')}}{{$t('exporttype.desc7')}}</p>
			</template>
			<template v-else-if="etype === 2">
				<p>{{$t('exporttype.desc6')}}{{$t('exporttype.list[2]')}}{{$t('exporttype.desc7')}}</p>
			</template>
			<template v-else>
				<p>{{$t('exporttype.desc6')}}{{$t('exporttype.list[0]')}}{{$t('exporttype.desc7')}}</p>
			</template>			
		</div>
	</div>
</template>
<script>
export default {
  name: 'useExcel',
  props: ['etype'],
  data () {
  	return {
  	  src: require('@/assets/img/excelv1.png'),
  	  value: 0
  	}
  },
  methods: {
  	cancelBack () {
  	  this.$emit('cancelkit',this.etype)
  	},
  	confirmGo () {
  	  this.$emit('comfirmkit',this.value)
  	}
  }
}
</script>