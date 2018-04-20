<template>
	<div class="bommoban">
		<p class="title">邀请短信内更多公司相关信息
			<el-button class="right" @click="editMoban">
			  <template v-if="mobanShow === false">编辑</template>
			  <template v-else>收起</template>
		    </el-button>
		</p>		
		<el-collapse-transition>
		    <order-moban v-show="mobanShow" :isshow="mobanShow" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro" @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></order-moban>
		</el-collapse-transition>
	</div>
</template>
<script>
import orderMoban from '@/components/moban/orderMoban'
export default {
  components: { orderMoban },
  data () {
  	return {
  	  mobanShow: false,
  	}
  },
  methods: {
  	editMoban () {
  	  this.mobanShow = !this.mobanShow
  	},
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
    getinitbus (val) {
      this.$emit('getinitbus',val)
    },
    getinitface (val) {
      this.$emit('getinitface',val)
    }
  }
}
</script>