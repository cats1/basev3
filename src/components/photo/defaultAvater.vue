<template>
	<div class="choose-img-wrap">
		<div class="default-avatars">
			<ul>
        <template v-for="item in dSrcArray">
          <li >
            <div class="avater-img-wrap">
              <img :src="item" alt="" @click.prevent="sendPhoto($event,item)">
            </div>
          </li>
        </template>   
      </ul>
      <div class="chooser">
        <el-button style="width:100%;" type="text" >选择图片</el-button>
      </div>
		</div>
	</div>
</template>
<script>
export default {
  props: ['imgsrc','index'],
  data () {
  	return {
  	  src: this.imgsrc,
      dSrcArray: ['http://www.coolvisit.com/group1/M00/00/3D/Cv7fv1aUay2AMMBSAAJxxMJj124287.png','http://www.coolvisit.com/group1/M00/00/3D/Cv7fv1aUa7yADG32AAI_PZSKDIk170.png','http://www.coolvisit.com/group1/M00/00/3D/Cv7fv1aUbBSAGqZXAAOuhcLLS5M998.png','http://www.coolvisit.com/group1/M00/00/3D/Cv7fv1aUbG2AUFEvAAN5192X5Fs058.png']
  	}
  },
  methods: {
    submitUpload () {},
    sendPhoto (event,value) {
      this.$emit('getdkit',value)
    }
  }
}
</script>
<style lang="scss" scoped>
.choose-img-wrap{
	  position: relative;
    z-index: 999;
    margin-top: -33px;
    background: #fff;
    .default-avatars{
      position: relative;
    }
    ul{
      margin: 0;
      list-style: none;
      display: block;
      overflow: hidden;
      padding: 10px 0;
      li{
        width: 34px;
        height: 34px;
        float: left;
        overflow: hidden;
        border-radius: 5px;
        margin-left: 6px;
        .avater-img-wrap{
          width: 100%;
          overflow: hidden;
          img{
            max-width:100%
          }
        }
      }
    }
    .photo-item-img{
    	width: 162px;
        height: 162px;
        img{
        	max-width:100%;
        }
    }
    .photo-item-mask{
    	display: none;
	    width: 162px;
	    height: 162px;
	    background: rgba(0,0,0,.25);
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 990;
    }
}
</style>