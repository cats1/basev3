<template>
	<div>
    <p>{{$t('notice.vpaper.cardSize')}}</p>
		<ul class="left-top-list margintop20">
      <li :class="{'active': cardType === 0}" @click="doAcitve(0)">
        <span class="arrow"></span>
        <span class="v">100x62mm
          <span>
            <span class="d">{{$t('notice.vpaper.cardText')}}</span>
          </span>
        </span>
      </li>
      <li :class="{'active': cardType === 1}" @click="doAcitve(1)">
        <span class="arrow"></span>
        <span class="v">86x60mm
          <span>
            <span class="d">{{$t('notice.vpaper.cardText1')}}</span>
          </span>
        </span>
      </li>  
    </ul>
	</div>
</template>
<script>
import { oneNotice, noticeShow } from '@/components/notice'
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
export default {
  components: { noticeShow, oneNotice },
  props: {
    ctype: {
      type: Number,
      default: 0
    }
  },
  data () {
  	return {
      cardType: this.ctype
  	}
  },
  watch: {
    ctype (val) {
      this.cardType = val
    }
  },
  mounted () {
    console.log(this.ctype)
  },
  methods: {
    doAcitve (type) {
      this.cardType = type
      this.$emit('sendkit',this.cardType)
    }
  }
}
</script>