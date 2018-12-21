<template>
	<div>
		<el-button type="success" @click="doSet"><i class="fa fa-user-circle-o"></i>{{$t('operatorSet')}}</el-button>
		<el-dialog :title="$t('operator')" :visible.sync="dialogVisible" width="30%" @close="doCancelBtn">
			<el-form>
				<el-form-item v-for="(item,index) in oList" :key="index">
					<el-row :gutter="24">
						<el-col :span="8">
							<el-input v-model="item.name" :placeholder="$t('form.name.text')"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input v-model="item.phone" :placeholder="$t('form.phone.text')"></el-input>
						</el-col>
						<el-col :span="2">
							<i class="el-icon-delete" style="color:red;" @click="doDelete(index)"></i>
						</el-col>
					</el-row>
				</el-form-item>
				<template v-if="oList.length<5">
					<el-button type="primary" icon="el-icon-plus" circle @click="doAdd"></el-button>
				</template>				
			</el-form>
			<span slot="footer" class="dialog-footer">
			   <el-button @click="doCancelBtn">{{$t('btn.cancelBtn')}}</el-button>
			   <el-button type="primary" @click="doSaveBtn">{{$t('btn.confirmBtn')}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {
  	  dialogVisible: false,
  	  oList: [{
  	  	name: '',
  	  	phone: ''
  	  }]
  	}
  },
  mounted () {
  	this.getOlist()
  },
  methods: {
  	getOlist () {
  	  let oListString = getCache('visitorManager')
      if (oListString) {
        let oListArray = oListString.split(',')
        this.oList = []
        let nameArray = []
        let phoneArray = []
        let _self = this
        oListArray.forEach(function(element, index) {   
          if (index %2 == 0) {
            nameArray.push(element)
          } else {
            phoneArray.push(element)
          }
        })
        nameArray.forEach(function(element, index) {
          let obj = {
            name: element,
            phone: phoneArray[index]
          }
          _self.oList.push(obj)
        })
      }
  	},
    doSet () {
      this.dialogVisible = true
    },
    doDelete (index) {
      if (this.oList.length > 1) {
		this.oList.splice(index,1)
      } else {
      	this.$message({
      	  showClose: true,
      	  message: this.$t('oneleast'),
      	  type: 'warning'
      	})
      }
    },
    doAdd () {
      if (this.oList.length >=5 ) {
      	this.$message({
      	  showClose: true,
      	  message: this.$t('mostFive'),
      	  type: 'warning'
      	})
      	return false
      }
      let nform = {
  	  	name: '',
  	  	phone: ''
  	  }
  	  this.oList.push(nform)
    },
    doCancelBtn () {
      this.dialogVisible = false
      this.getOlist()
    },
    doSaveBtn () {
      let varray = []
      let vString = ''
      this.oList.forEach(function(element, index) {
      	if (element.name != ''&&element.phone!='') {
      	  let string = element.name + ',' + element.phone
      	  varray.push(string)
      	}
      })
      if (varray.length == 0) {
      	this.$message({
      	  showClose: true,
      	  message: this.$t('oneleast'),
      	  type: 'warning'
      	})
      	return false
      }
      vString = varray.join(',')
      this.updateVisitorManager(vString)
    },
    updateVisitorManager (str) {
      let nform = {
      	userid: getCache('userid'),
      	visitorManager: str
      }
      this.$store.dispatch('updateVisitorManager',nform).then(res => {
      	let {status} = res
      	if (status == 0) {
      	  this.dialogVisible = false
      	  this.getOlist()
      	}
      })
    }
  }
}
</script>