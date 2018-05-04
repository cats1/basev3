<template>
	<div>
    <p>{{$t('notice.vpaper.cardSize')}}</p>
		<ul class="left-top-list margintop20">
      <li :class="{'active': cardType === 0}" @click="doAcitve(0)">
        <span class="arrow"></span>
        <span class="v">127x89mm
          <span>
            <span class="d">{{$t('notice.vpaper.cardText2')}}</span>
          </span>
        </span>
      </li>
      <li :class="{'active': cardType === 1}" @click="doAcitve(1)">
        <span class="arrow"></span>
        <span class="v">105x74mm
          <span>
            <span class="d">{{$t('notice.vpaper.cardText3')}}</span>
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