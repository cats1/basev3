<template>
	<div class="downcomwrap">
		<el-button type="primary" @click="getDown">{{$t('btn.downMobanBtn')}}</el-button>
	</div>
</template>
<script>
import {downMoban,getBaseLink} from '@/utils/common'
export default {
  data () {
  	return {}
  },
  methods: {
    getDown () {
      let link = getBaseLink() + '/company.xlsx'
      downMoban(link)
    }
  }
}
</script>
<style lang="scss" scoped>
.downcomwrap{
	display:inline-block;
}
</style>