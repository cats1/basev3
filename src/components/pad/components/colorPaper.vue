<template>
  <div>
    <color-card-style :ctype="cardType" @sendkit="getCardStyle"></color-card-style>
    <color-card-size :ctype="cardSize" @sendkit="getCardSize"></color-card-size>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import colorCardStyle from './colorCardStyle'
import colorCardSize from './colorCardSize'
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
  components: { colorCardStyle,colorCardSize },
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