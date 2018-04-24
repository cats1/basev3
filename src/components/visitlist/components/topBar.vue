<template>
	<div style="overflow:hidden;">
	 <template v-if="type === '0'">
	 	<add-pro @addkit="getaddpro"></add-pro>
	 	<add-visit :pid="apid" @sendav="getaddv"></add-visit>
	 	<edit-pro :epdata="epdata" @editkit="geteditv"></edit-pro>
	 	<move-pro></move-pro>
	 	<make-visit-card></make-visit-card>
	 	<delete-visit></delete-visit>
	 	<send-all-face></send-all-face>
	 </template>
	 <template v-else>
	 	<delete-visit></delete-visit>
	 </template>	  
	</div>
</template>
<script>
import addPro from './addPro'
import addVisit from './addVisit'
import editPro from './editPro'
import movePro from './movePro'
import makeVisitCard from './makeVisitCard'
import deleteVisit from './deleteVisit'
import sendAllFace from './sendAllFace'
export default {
  props: ['btype','pid','edata'],
  components: {addPro,addVisit,editPro,movePro,makeVisitCard,deleteVisit,sendAllFace},
  data () {
  	return {
  	  apid: this.pid,
  	  epdata: this.edata,
  	  type: this.btype
  	}
  },
  watch: {
  	pid (val,old) {
  	  this.apid = val
  	},
  	epdata (val,old) {
  	  this.epdata = val
  	}
  },
  methods: {
  	getaddpro () {
  	  this.$emit('addkit')
  	},
  	getaddv (val) {
  	  this.$emit('sendav',val)
  	},
  	geteditv (val) {
  	  this.$emit('sendev',val)
  	}
  },
  mounted () {
  	console.log(this.epdata)
  }
}
</script>