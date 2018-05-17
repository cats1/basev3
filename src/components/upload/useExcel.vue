<template>
	<div >
		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
			<h3>{{$t('btn.exportListBtn')}}</h3>
			<div class="exportwrap">
				<div class="exportwrap-left">
					<img :src="src" alt="">
				</div>
				<div class="exportwrap-right">
					<h3>{{$t('exporttype.title')}}</h3>
					<p class="paddingtb20">{{$t('exporttype.desc1')}}
						<span class="links">{{$t('exporttype.desc3')}}</span>
					{{$t('exporttype.desc2')}}</p>
					<emp-group-upload e-type="primary" @sendkit="getUploadAB"></emp-group-upload>
					<down-invite-moban :btype="1"></down-invite-moban>
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
  	  src: require('@/assets/img/excelv1.png')
  	}
  },
  methods: {
  	changeType () {
  	  this.$emit('changetype',4)
  	},
  	getUploadAB () {
  	  this.$emit('upab')
  	}
  }
}
</script>
