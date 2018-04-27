<template>
	<div class="footerwrap">
      <p>{{$t('footer.ftext1')}} 2015-{{getYear('', '', 4)}}{{$t('footer.ftext2')}}
        <a target="_blank" href="http://www.miitbeian.gov.cn">{{$t('footer.flink')}}</a>
      </p>
	</div>
</template>
<script>
import { getYear } from '@/utils'
export default {
  data () {
    return {}
  },
  created () {},
  methods:{
  	getYear: getYear
  }
}
</script>