<template>
	<div >
		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
			<h3>{{$t('btn.exportListBtn')}}</h3>
			<div class="exportwrap">
				<div class="exportwrap-left">
					<img :src="src" alt="">
				</div>
				<div class="exportwrap-right">
					<el-button type="success">同步</el-button>
					<p class="margintop20">
						<el-checkbox v-model="checked">每天00:00自动同步RTX</el-checkbox>
					</p>
				</div>
			</div>
		</div>
		<p class="exportbomtip">{{$t('exporttype.desc5')}}{{$t('exporttype.list[0]')}}{{$t('exporttype.desc8')}}<span class="links" @click="changeType">{{$t('exporttype.desc4')}}</span></p>
	</div>
</template>
<script>
import empGroupUpload from './empGroupUpload'
import {downInviteMoban} from '@/components/download'
export default {
  name: 'useExcel',
  components: {empGroupUpload,downInviteMoban},
  data () {
  	return {
  	  src: require('@/assets/img/rtxv1.png'),
  	  checked: false
  	}
  },
  methods: {
  	changeType () {
  	  this.$emit('changetype',4)
  	}
  }
}
</script>
