<template>
	<div class="bommoban">
		<p class="title">{{$t('moban.mtitle')}}
			<el-button class="right" @click="editMoban">
			  <template v-if="mobanShow === false">{{$t('btn.editBtn')}}</template>
			  <template v-else>{{$t('btn.shouBtn')}}</template>
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