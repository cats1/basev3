<template id="fileReader">
  <div class="uploadformwrap">
    <span>
      <input class="uploadinput" ref="uploadtxt" id="uploadtxt" type="file" @change="loadTextFromFile">
      <el-button style="width:100%;" ><i class="fa fa-cloud-upload"></i>{{btnValue}}</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: {
  	txtValue: {
  	  type: String,
  	  default: ''
  	}
  },
  data () {
  	return {
  	  btnValue: this.txtValue
  	}
  },
  methods: {
    loadTextFromFile (file) {
    	let _self = this
    	let files = this.$refs['uploadtxt'].files[0]
    	let name = files.name//读取选中文件的文件名
        let size = files.size//读取选中文件的大小
        let reader = new FileReader()//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(files)//读取文件的内容将文件以文本形式读入页面
        reader.onload = function(){
        // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
           let fileText = this.result.split("\n")
           _self.$refs['uploadtxt'].value = ''
           _self.$emit('utxt',fileText)
        }
    }
  }
}
</script>