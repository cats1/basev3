<template>
	<div class="bommoban">
		<p class="title">{{$t('moban.mtitle')}}
      <span v-show="isEdit">({{$t('moban.emptip')}})</span>
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
import { getCache } from '@/utils/auth'
import { numberToBoolean } from '@/utils/common'
export default {
  components: { orderMoban },
  data () {
  	return {
  	  mobanShow: false,
      //isEdit: numberToBoolean(getCache('tempEditSwitch'))
  	}
  },
  computed: {
    isEdit: {
      get () {
        return numberToBoolean(getCache('tempEditSwitch'))
      },
      set () {}
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