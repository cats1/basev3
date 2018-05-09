<template>
	<div class="btnsection">
		<el-button @click="makeCard"><i class="fa fa-vcard-o"></i>{{$t('btn.cardBtn')}}</el-button>
    <template v-for="(item,index) in cards">
      <visit-card :index="index" :vitem="item" :card-show="cardShow" @makekit="makeDone"></visit-card>
    </template>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import visitCard from './visitCard'
export default {
  props: ['cardarray'],
  components: {visitCard},
  data () {
  	return {
  	  cards: this.cardarray,
      cardShow: false,
      doneArray: [],
      loading: ''
  	}
  },
  watch: {
  	cardarray (val) {
  	  this.cards = val
  	}
  },
  mounted () {},
  methods: {
  	makeCard () {
      if (this.cardarray.length === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('selectVisit')
        })
      } else {        
        this.loading = this.$loading({
          lock: true,
          text: this.$t('downloading'),
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.cardShow = true
      }
  	},
    makeDone (index) {
      this.doneArray[index] = true
      this.checkDone()
    },
    checkDone () {
      let showFalg = true
      let _self = this
      this.cardarray.forEach(function(element, index) {
        if (!_self.doneArray[index]) {
          showFalg = false
        }
      })
      if (showFalg) {
        setTimeout(() => {
          this.loading.close()
          this.cardShow = false
        }, 2000)
      }
    }
  }
}
</script>