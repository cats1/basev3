<template>
	<div>
		<el-table :table="table" border>
			<el-table-column
		      type="index"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="姓名"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="手机号"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="公司"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      property="date"
		      label="备注">
		    </el-table-column>
		</el-table>
		<meeting-moban :isshow="mobanShow" :mid="mid"></meeting-moban>
		<div class="margintop20">
			<el-button>{{$t('btn.saveMobanBtn')}}</el-button>
			<el-button>{{$t('btn.sendInvite')}}</el-button>
		</div>
	</div>
</template>
<script>
import meetingMoban from '@/components/moban/meettingMoban'
export default {
  components: {meetingMoban},
  props: ['mid'],
  data () {
  	return {
  	  table: [],
  	  mobanShow: true
  	}
  }
}
</script>