<template>
	<div class="margintop20">
    <p>{{$t('notice.vpaper.cardStyle')}}</p>
		<ul class="left-top-list margintop20">
      <li :class="{'active': cardType === 0}" @click="doAcitve(0)">
        <span class="arrow"></span>
        <img :src="cardArray[0]">
      </li>
    </ul>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  props: {
    ctype: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
      cardArray: [require('@/assets/img/card/card-5.png')],
      cardType: 0,
      codeShow: false
  	}
  },
  watch: {
    ctype (val,old) {
      this.cardType = val
    }
  },
  methods: {
    doAcitve (type) {
      this.cardType = type
      if (type === 3) {
        this.codeShow = true
      }
      this.$emit('sendkit',this.cardType)
    },
    getUpcode (val) {
      if (val) {
        this.cardType = 3
      } else {
        this.cardType = this.ctype
      }
      this.$emit('sendkit',this.cardType)
      this.codeShow = !this.codeShow
    }
  }
}
</script>