<template>
	<div class="downcomwrap">
    <template v-if="btype === 0">
      <el-button type="default" @click="getDown">{{$t('btn.downMobanBtn')}}</el-button>
    </template>
    <template v-else-if="btype === 1">
      <el-button type="success" @click="getDown">{{$t('btn.downMobanBtn')}}</el-button>
    </template>
		
	</div>
</template>
<script>
import {downMoban} from '@/utils/common'
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
      let link = process.env.BASE_LINK + '/addorderbook_templete.xlsx'
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