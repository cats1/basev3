<template>
	<div>
		<m-header :title="$t('moban.business.title')" :desc="$t('moban.business.desc')"></m-header>
	</div>
</template>
<script>
import mHeader from './components/mHeader'
export default {
  components: { mHeader },
  data () {
  	return {}
  }
}
</script>