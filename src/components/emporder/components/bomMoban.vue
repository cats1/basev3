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
      <template v-if="customTemplateShow">
        <div v-show="mobanShow">
          <new-tabs :ntype="1" :is-get="true" :list="visitList" @getchange="getmoban"></new-tabs>          
        </div>
        <!-- <order-moban :is-all="showAllTemp" :default-type="getVtype" :list="visitList" v-show="mobanShow" :isshow="mobanShow" @getmoban="getmoban" ></order-moban> -->
      </template>
      <template v-else>
        <order-moban :is-all="showAllTemp" :default-type="getVtype" v-show="mobanShow" :isshow="mobanShow" @getcon="getinv" @gettraffic="gettraffic" @getcompro="getcompro" @getbcon="getbinv" @getbtraffic="getbtraffic" @getbcompro="getbcompro" @getinitface="getinitface" @getinitbus="getinitbus"></order-moban>
      </template>		    
		</el-collapse-transition>
	</div>
</template>
<script>
import orderMoban from '@/components/moban/orderMoban'
import { getCache } from '@/utils/auth'
import { numberToBoolean } from '@/utils/common'
import newTabs from '@/components/moban/newTabs'
export default {
  props: {
    defaultType: null,
    list: null
  },
  components: { orderMoban,newTabs },
  data () {
  	return {
  	  mobanShow: false,
      getVtype: this.defaultType || 0,
      showAllTemp: true,
      customTemplateShow: process.env.customTemplateShow || false,
      visitList: this.list || []
      //isEdit: numberToBoolean(getCache('tempEditSwitch'))
  	}
  },
  watch: {
    defaultType (val) {
      this.getVtype = val
    },
    list (val) {
      this.visitList = val
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
    getmoban (val) {
      this.$emit('getmoban',val)
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