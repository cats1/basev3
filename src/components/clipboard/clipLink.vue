<template>
	<div >
		<el-tooltip placement="right" effect="light">
		  <div slot="content"><clipboard :ctype="0" :link="checkLink(obj.visitType,obj.encryption)"></clipboard></div>
		  <p>{{ checkLink(obj.visitType,obj.encryption)}}</p>
		</el-tooltip>
	</div>
</template>
<script>
import clipboard from '@/components/clipboard'
import {getBaseUrl} from '@/utils/common'
import { getCache } from '@/utils/auth'
export default {
  props: {
  	item: {
  	  type: Object,
  	  default: {}
  	}
  },
  components: {clipboard},
  data () {
  	return {
  	  obj: this.item
  	}
  },
  watch:{
  	item (val) {
  	  this.obj = val
  	}
  },
  methods: {
    checkLink (type,encryption) {
      if (type !== '面试') {
        return getBaseUrl() + '/bus?id=' + encryption
      } else {
        return getBaseUrl() + '/show?id=' + encryption
      }
    }
  }
}
</script>