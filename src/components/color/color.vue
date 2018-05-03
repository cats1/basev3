<template>
	<div class="color-set-wrap">
	   <el-button class="colorbtn" :style="{'background-color': dcolor}">
	      {{$t('pad.scolor')}}
	   </el-button>
	   <el-color-picker v-model="dcolor" @change="setColorItem"></el-color-picker>
	   <span class="colortext">{{$t('pad.scolor')}}</span>
	   <template v-for="item in rectColor">
	   	  <span class="color-item" :style="{'background-color': item}" @click="setColorItem(item)"></span>
	   </template>
	   <span class="colortext" @click="dialogVisible = true">{{$t('pad.inputColor')}}</span>
	   <el-dialog :title="$t('pad.inputColor')"
		  :visible.sync="dialogVisible"
		  width="30%" >
		  <div style="width:240px;margin:0 auto;">
		  	#<el-input style="width:200px;" v-model="inputColor"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="setColor">{{$t('btn.saveBtn')}}</el-button>
		    <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	props: {
	  color: {
	  	type: String,
	  	default: '#409EFF'
	  }
	},
    data() {
      return {
      	dcolor: this.color,
      	dialogVisible: false,
      	inputColor: '',
      	rectColor: ['#ff6600','#00D95E','#00A0D9','#F54242']
      }
    },
    watch: {
      color (val) {
      	this.dcolor = val
      }
    },
    methods: {
      setColor () {
      	this.dialogVisible = false
      	this.dcolor = this.inputColor
      	this.$emit('getcolor',this.dcolor)
      },
      setColorItem (item) {
      	this.dcolor = item
      	this.$emit('getcolor',this.dcolor)
      }
    }
}
</script>