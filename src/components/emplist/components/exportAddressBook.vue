<template>
	<div>
		<div class="" v-if="useType === 0">
          <use-excel @changetype="getChangetype"></use-excel>
        </div>
        <div class="" v-else-if="useType === 1">
          <use-rtx @changetype="getChangetype" @upab="getUploadAB"></use-rtx>
        </div>
        <div class="" v-else-if="useType === 2">
          <use-ding @changetype="getChangetype"></use-ding>
        </div>
        <div class="" v-else-if="useType === 4">
          <change-upload-type :etype="useType" @comfirmkit="confirmBack" @cancelkit="cancelBack"></change-upload-type>
        </div>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {exportAddressList,useExcel,useRtx,useDing,changeUploadType} from '@/components/upload'
export default {
  components: {exportAddressList,useExcel,useRtx,useDing,changeUploadType},
  props: {
  	utype: {
      type: Number,
      default: 0
  	}
  },
  data () {
  	return {
  	  dialogVisible: false,
  	  useType: this.utype
  	}
  },
  methods: {
  	getChangetype (type) {
      this.useType = type
    },
    confirmBack (type) {
      this.useType = type
    },
    cancelBack () {
      this.changeExport()
    },
    changeExport () {
      if (getCache('rtxip') && getCache('rtxport')) {
        this.useType = 1
      } else if (getCache('ddnotify') === 1) {
        this.useType = 2
      } else {
        this.useType = 0
      }
    },
    getUploadAB () {
      this.$emit('upab')
    }
  }
}
</script>