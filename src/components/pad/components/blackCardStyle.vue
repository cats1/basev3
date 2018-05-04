<template>
	<div class="margintop20">
    <p>{{$t('notice.vpaper.cardStyle')}}</p>
		<ul class="left-top-list margintop20">
      <li :class="{'active': cardType === 0}" @click="doAcitve(0)">
        <span class="arrow"></span>
        <img :src="cardArray[0]">
      </li>
      <li :class="{'active': cardType === 1}" @click="doAcitve(1)">
        <span class="arrow"></span>
        <img :src="cardArray[1]">
      </li>
      <li :class="{'active': cardType === 2}" @click="doAcitve(2)">
        <span class="arrow"></span>
        <img :src="cardArray[2]">
      </li>
      <li :class="{'active': cardType === 3}" @click="doAcitve(3)">
        <span class="arrow"></span>
        <img :src="cardArray[3]">
      </li>
      <li :class="{'active': cardType === 4}" @click="doAcitve(4)">
        <span class="arrow"></span>
        <img :src="cardArray[4]">
      </li>
      <li :class="{'active': cardType === 5}" @click="doAcitve(5)">
        <span class="arrow"></span>
        <img :src="cardArray[5]">
      </li>
      <li :class="{'active': cardType === 6}" @click="doAcitve(6)">
        <span class="arrow"></span>
        <img :src="cardArray[6]">
      </li>  
      <li :class="{'active': cardType === 7}" @click="doAcitve(7)">
        <span class="arrow"></span>
        <img :src="cardArray[7]">
      </li>
    </ul>
    <code-photo :is-show="codeShow" @upcode="getUpcode"></code-photo>
	</div>
</template>
<script>
import codePhoto from './codePhoto'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  props: {
    ctype: {
      type: Number,
      default: 0
    }
  },
  components: { codePhoto },
  data () {
  	return {
      cardArray: [require('@/assets/img/card/card-1.png'),require('@/assets/img/card/card-2.png'),require('@/assets/img/card/card-3.png'),require('@/assets/img/card/card-4.png'),require('@/assets/img/card/card-6.png'),
      require('@/assets/img/card/card-7.jpg'),require('@/assets/img/card/card-8.jpg'),require('@/assets/img/card/card-9.jpg')],
      cardType: 0,
      oldcardType: 0,
      codeShow: false
  	}
  },
  watch: {
    ctype (val,old) {
      this.cardType = val
      this.oldcardType = val
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
        this.cardType = this.oldcardType
      }
      this.$emit('sendkit',this.cardType)
      this.codeShow = !this.codeShow
    }
  }
}
</script>