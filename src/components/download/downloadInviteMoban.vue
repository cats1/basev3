<template>
	<div class="downcomwrap">
    <template v-if="btype === 0">
      <el-button type="default" @click="getDown"><i class="fa fa-cloud-download"></i>{{$t('btn.downMobanBtn')}}</el-button>
    </template>
    <template v-else-if="btype === 1">
      <el-button type="success" @click="getDown"><i class="fa fa-cloud-download"></i>{{$t('btn.downMobanBtn')}}</el-button>
    </template>
		
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {downMoban,getBaseUrl,getBaseLink} from '@/utils/common'
export default {
  props: {
    btype: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {}
  },
  methods: {
    getDown () {
      let link
      if (parseInt(getCache('subAccount')) === 1) {
        link = getBaseLink() + '/addorderbooks_templete.xlsx'
      } else {
        link = getBaseLink() + '/addorderbook_templete.xlsx'
      }
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