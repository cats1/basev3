<template>
	<div class="footerwrap" :class="{'posfooter': posfooter,'whiteheader': whiteheader}">
      <p>{{$t('footer.ftext1')}} 2015-{{getYear('', '', 4)}}{{$t('footer.ftext2')}}
        <a target="_blank" href="http://www.miitbeian.gov.cn">{{$t('footer.flink')}}</a>
      </p>
	</div>
</template>
<script>
import { getYear } from '@/utils'
export default {
  data () {
    return {
      posfooter: false,
      whiteheader: process.env.whiteHeaderClass || false
    }
  },
  created () {
    this.getHeight()
  },
  methods:{
  	getYear: getYear,
    getHeight () {
      if (document.body.clientHeight < window.innerHeight) {
        this.posfooter = true
      } else {
        this.posfooter = false
      }
    }
  }
}
</script>