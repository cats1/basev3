<template>
	<div class="sharewrap">
    <share-title vtitle="建行大厦访客预约教程" style="margin: .5rem 0 .3rem 0;"></share-title>
    <share-d-title vtitle="欢迎使用建行大厦来访通，首先您需要在微信公众号里搜索“建行大厦来访通”公众号，并关注。" style="margin: .5rem 0 .3rem 0;"></share-d-title>
    <share-img :img-src="img1Src" width="100%"></share-img>
    <share-d-title vtitle="或者直接扫描下方二维码，进入建行大厦来访通公众号，并关注。" style="margin: .5rem 0 .3rem 0;"></share-d-title>
    <share-img :img-src="img2Src" width="80%"></share-img>
    <hr>
    <share-d-title vtitle="关注公众号后，进入公众号，点击访客预约。" style="margin: .5rem 0 .3rem 0;"></share-d-title>
    <share-img :img-src="img3Src" width="80%"></share-img>
    <hr>
    <share-d-title vtitle="进入菜单页面，点击来访预约，进行访客注册。" style="margin: .5rem 0 .3rem 0;"></share-d-title>
    <share-img :img-src="img4Src" width="80%"></share-img>
    <hr>
    <share-d-title vtitle="填入相关信息，绑定访客信息。" style="margin: .5rem 0 .3rem 0;"></share-d-title>
    <share-img :img-src="img5Src" width="80%"></share-img>
    <hr>
    <share-d-title vtitle="绑定成功后，再次点击来访预约，进入访客预约界面，填入相关信息，点击确认预约。" style="margin: .5rem 0 0 0;"></share-d-title>
    <p class="redtext" style="margin: 0 0 .3rem 0;">您要拜访人的工号：{{empno}}</p>
    <share-img :img-src="img6Src" width="80%"></share-img>
  </div>
</template>
<script>
import { shareTitle,shareDTitle,shareImg } from './components' 
import { getCache } from '@/utils/auth'
import { getParameter,checkIsNull } from '@/utils/common'
export default {
  components: {shareTitle,shareDTitle,shareImg},
  data () {
  	return {
      empno: '',
      img1Src: require('@/assets/img/share/img1.png'),
      img2Src: require('@/assets/img/share/img2.png'),
      img3Src: require('@/assets/img/share/img3.png'),
      img4Src: require('@/assets/img/share/img4.png'),
      img5Src: require('@/assets/img/share/img5.png'),
      img6Src: require('@/assets/img/share/img6.png')
    }
  },
  created () {
    this.empno = getParameter('eno')
  }
}
</script>