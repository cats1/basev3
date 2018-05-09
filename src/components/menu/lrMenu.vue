<template>
	<div class="lrmenuwrap">
		<div class="lrmenu-left">
		  <h3>{{$t('project.proname')}}</h3>
		  <template v-for="item in leftList">
		  	<p class="lrmenu-item" @click="selectItem(item)"><img :src="logo" alt="">{{item.pName}}</p>
		  </template>
		</div>
		<div class="lrmenu-right">
      <h3>{{$t('project.seProname')}}</h3>
		  <template v-for="(item,index) in clist">
		  	<p class="lrmenu-item"><img :src="logo" alt="">{{item.pName}}
		  		<span class="lrmenu-item-close" @click="removeItem(item,index)"><i class="fa fa-close"></i></span></p>
		  </template>
		</div>
	</div>
</template>
<script>
export default {
  props: ['lelist','rilist'],
  data () {
  	return {
  	  leftList: this.lelist,
  	  clist: this.rilist,
  	  logo: require('@/assets/img/spot.png')
  	}
  },
  methods: {
  	selectItem (item) {
  	  let clist = []
  	  clist.push(item)
  	  this.clist = clist
  	  this.$emit('menukit',this.clist)
  	},
  	removeItem (item,index) {
      this.clist.splice(index,1)
      this.$emit('menukit',this.clist)
  	}
  }
}
</script>
<style lang="scss" scoped>
.lrmenuwrap{
	width:100%;
	overflow:hidden;
	.lrmenu-left,.lrmenu-right{
		width:50%;
		display:inline-block;
		float:left;
	}
}
.lrmenu-item{
  line-height:36px;
  img{
  	margin:0 5px;
  }
  .lrmenu-item-close{
  	float:right;
  }
}
</style>