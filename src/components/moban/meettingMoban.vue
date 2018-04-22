<template>
	<div>
		<mo-quill class="marginbom20" style="width:80%;" :content="inviteContent" @getcon="getcon"></mo-quill>
		<mo-map :isshow="isshow" class="marginbom20" :address="defaultmoban.address" :sendpot="pot" mapid="mapmeeting" style="width:80%;"></mo-map>
	</div>
</template>
<script>
import moQuill from './components/moQuill'
import moMap from './components/moMap'
import { getCache } from '@/utils/auth'
import { valueToString, replaceRemoveQuotation } from '@/utils/common'
export default {
  props: ['mtype','isshow','mid'],
  components: { moQuill,moMap },
  data () {
  	return {
  	  inviteContent: this.$t('moban.interview.defaultMoban'),
      pot: {
        latitude: '',
        longitude: ''
      },
      defaultmoban: {}
  	}
  },
  computed: {},
  watch: {
  	traffic (val, oldval) {}
  },
  created () {
    this.init()
  },
  methods: {
  	init () {
  		this.getMeetingById()
  	},
    getMeetingById () {
      let newForm = {
        mid: this.mid
      }
      this.$store.dispatch('getMeetingById',newForm).then(res => {
        let { status, result } = res
        if (status === 0) {
          this.defaultmoban = result
          this.pot.latitude = result.latitude
          this.pot.longitude = result.longitude
        }
      })
    },
    getcon (val) {
      this.$emit('getcon',val)
    }
  }
}
</script>