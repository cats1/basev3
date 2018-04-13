<template>
	<div>
		<m-header class="marginbom20" :title="$t('moban.interview.title')" :desc="$t('moban.interview.desc')"></m-header>
		<mo-quill class="marginbom20" style="width:80%;" :content="inviteContent"></mo-quill>
		<mo-map class="marginbom20" mapid="mapface" style="width:80%;"></mo-map>
		<traffic class="marginbom20" style="width:80%;" :content="traffic"></traffic>
		<compro class="marginbom20" style="width:80%;" :content="companyProfile"></compro>
	</div>
</template>
<script>
import mHeader from './components/mHeader'
import moMap from './components/moMap'
import moQuill from './components/moQuill'
import traffic from './components/traffic'
import compro from './components/compro'
import { getCache } from '@/utils/auth'
import { valueToString, replaceRemoveQuotation } from '@/utils/common'
export default {
  components: { mHeader, moMap, moQuill, traffic, compro },
  data () {
  	return {
  	  traffic: '',
  	  companyProfile: '',
  	  inviteContent: this.$t('moban.interview.defaultMoban')
  	}
  },
  computed: {},
  watch: {
  	traffic (val, oldval) {
      console.log(val)
  	}
  },
  created () {
  	console.log(9999)
    this.init()
    console.log(888)
  },
  methods: {
  	init () {
  		this.getInterViewMoBan()
  	},
  	getInterViewMoBan () {
  		let newForm = {
  			userid: getCache('userid'),
  			templateType: '面试'
  		}
  		this.$store.dispatch('getUsertemplate',newForm).then(res => {
  			let { status, result } = res
  			if (status === 0) {
  				console.log(result)
  			  //this.$set(this.inviteContent,replaceRemoveQuotation(result.inviteContent))
  			  //this.traffic  = result.traffic
  			  //this.$set(this.traffic,result.traffic)
              /*this.companyProfile = result.companyProfile
              this.inviteContent = result.inviteContent*/
  			}
  		})
  	}
  }
}
</script>