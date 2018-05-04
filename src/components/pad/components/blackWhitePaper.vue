<template>
	<div>
    <black-card-style :ctype="cardType" @sendkit="getCardStyle"></black-card-style>
		<black-card-size :ctype="cardSize" @sendkit="getCardSize"></black-card-size>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import blackCardStyle from './blackCardStyle'
import blackCardSize from './blackCardSize'
export default {
  props: {
    cardType: {
      type: Number,
      default: 0
    },
    cardSize: {
      type: Number,
      default: 0
    }
  },
  components: { blackCardStyle,blackCardSize },
  data () {
  	return {
      imgSrc: require('@/assets/img/cards.png'),
      isShow: false,
      ptype: 0,
      ctype: 0
  	}
  },
  methods: {
    getCardStyle (type) {
      console.log(type)
      this.$emit('stylekit',type)
    },
    getCardSize (type) {
      console.log(type)
      this.$emit('sizekit',type)
    }
  }
}
</script>