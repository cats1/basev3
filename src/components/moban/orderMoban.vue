<template>
	<div>
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane label="面试模板" name="face" @tab-click="activeName === 'face'">
		    	<order-interview mtype="面试" :isshow="isshow" @initmoban="getinitface" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro"></order-interview>
		    </el-tab-pane>
		    <el-tab-pane label="商务模板" name="bus" @tab-click="activeName === 'bus'">
		    	<order-interview mtype="商务" :isshow="isshow" @initmoban="getinitbus" @getcon="getbinv" @gettraffic="getbtraffic" @getcompro="getbcompro"></order-interview>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import orderInterview from './orderInterview'
import business from './interview'
export default {
  props: ['isshow'],
  components: { orderInterview, business },
  data () {
  	return {
  	  activeName: 'face'
  	}
  },
  methods: {
  	getinv (val) {
  	  this.$emit('getcon',val)
  	},
  	gettraffic (val) {
      this.$emit('gettraffic',val)
    },
    getcompro (val) {
      this.$emit('getcompro',val)
    },
    getbinv (val) {
  	  this.$emit('getbcon',val)
  	},
  	getbtraffic (val) {
      this.$emit('getbtraffic',val)
    },
    getbcompro (val) {
      this.$emit('getbcompro',val)
    },
    getinitface (val) {
      this.$emit('getinitface',val)
    },
    getinitbus (val) {
      this.$emit('getinitbus',val)
    }
  }
}
</script>