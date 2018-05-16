<template>
  <div class="paddingtb20 margintop20">
    <div class="center">
      <img :src="img_404" alt="404">
    </div>
    <div class="center">
      <h2 class="margintb20">OH,NO,404!</h2>
      <p class="margintb20">{{$t('noPage')}}</p>
      <router-link to="/"><el-button type="success">{{$t('goBackIndex')}}</el-button></router-link>
    </div>
  </div>
</template>
<script>
import img_404 from '@/assets/img/404.png'

export default {
  name: 'page404',
  data() {
    return {
      img_404
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
