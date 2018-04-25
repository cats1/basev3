<template>
	<div >
		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
			<h3>{{$t('btn.exportListBtn')}}</h3>
			<div class="exportwrap">
				<div class="exportwrap-left">
					<img :src="src" alt="">
				</div>
				<div class="exportwrap-right">
					<h3>{{$t('exporttype.title')}}</h3>
					<p class="margintop20 paddingtb20">{{$t('exporttype.desc1')}}
						<span class="links">{{$t('exporttype.desc3')}}</span>
					{{$t('exporttype.desc2')}}</p>
					<upload-emps></upload-emps>
					<down-invite-moban :btype="1"></down-invite-moban>
				</div>
			</div>
		</div>
		<p class="exportbomtip">{{$t('exporttype.desc5')}}<span class="links">{{$t('exporttype.desc4')}}</span></p>
	</div>
</template>
<script>
import {uploadEmps} from '@/components/upload'
import {downInviteMoban} from '@/components/download'
export default {
  name: 'useExcel',
  components: {uploadEmps,downInviteMoban},
  data () {
  	return {
  	  src: require('@/assets/img/excelv1.png')
  	}
  }
}
</script>
