<template>
	<div >
		<div class="boxshadow margintop20 paddinglr30 paddingtb20 bgwhite">
			<h3>{{$t('btn.exportListBtn')}}</h3>
			<div class="exportwrap">
				<div class="exportwrap-left">
					<img :src="src" alt="">
				</div>
				<div class="exportwrap-right">
					<el-button type="success" @click="syncSet">{{$t('exporttype.list[1]')}}</el-button>
					<p class="margintop20">
						<el-checkbox v-model="checked" @change="autoSyncSet">{{$t('exporttype.desc9')}}</el-checkbox>
					</p>
				</div>
			</div>
			<div class="exportbom margintop20 block">
				<p>{{$t('exporttype.ip')}}:<span >{{form.rtxIp}}</span><el-button class="right" @click="editRtx">{{$t('btn.editBtn')}}</el-button></p>
			</div>
		</div>
		<p class="exportbomtip">{{$t('exporttype.desc5')}}{{$t('exporttype.list[1]')}}{{$t('exporttype.desc8')}}<span class="links" @click="changeType">{{$t('exporttype.desc4')}}</span></p>
		<el-dialog :title="$t('exporttype.ipSet')"
		  :visible.sync="dialogVisible"
		  width="30%">
		    <el-form label-position="top" label-width="80px" :rules="rules" ref="rtxform" :model="form">
			  <el-form-item :label="$t('exporttype.ip')" prop="rtxIp">
			    <el-input v-model="form.rtxIp"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('exporttype.port')" prop="rtxPort">
			    <el-input v-model="form.rtxPort"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm()">{{$t('btn.saveBtn')}}</el-button>
			    <el-button @click="resetForm">{{$t('btn.cancelBtn')}}</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import empGroupUpload from './empGroupUpload'
import {downInviteMoban} from '@/components/download'
import {booleanToNumber} from '@/utils/common'
export default {
  name: 'useExcel',
  components: {empGroupUpload,downInviteMoban},
  data () {
  	var checkIp = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
    var checkPort = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
  	return {
  	  src: require('@/assets/img/rtxv1.png'),
  	  checked: false,
  	  dialogVisible: false,
  	  form: {
  	  	rtxIp: getCache('rtxip'),
  	  	rtxPort: '',
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	rtxIp: [
            { validator: checkIp, trigger: 'blur' }
        ],
        rtxPort: [
            { validator: checkPort, trigger: 'blur' }
        ]
  	  }
  	}
  },
  methods: {
  	changeType () {
  	  this.$emit('changetype',4)
  	},
  	editRtx () {
  	  this.dialogVisible = true
  	},
  	syncSet () {
    		let nform = {
    		  userid: getCache('userid')
    		}
  	    this.$store.dispatch('getEmployeeFromRtx',nform).then(res => {
    			let {status} = res
    			if (status === 0) {
    			    this.$emit('syncrtx')
    			}
    		})
  	},
  	autoSyncSet (val) {
    		console.log(val)
    	  let nform = {
    		  userid: getCache('userid'),
    		  rtxAuto: booleanToNumber(val)
    		}
    		if (getCache('ddnotify') === 1) {
              this.$message({
                  message: this.$t('exporttype.tip3'),
                  type: 'error'
              })
              this.checked = !this.checked
  		} else if (getCache('rtxip')&&getCache('rtxport')) {
  		    this.$store.dispatch('UpdateRtxRefresh',nform).then(res => {
  	  	    	console.log(88888)
  				let {status} = res
  				if (status === 0) {
  				    this.$emit('autosyncrtx')
  				}
  		    })
  		} else {
  		    this.$message({
                  message: this.$t('exporttype.tip4'),
                  type: 'error'
              })
              this.checked = !this.checked
  		}  	    
  	},
  	submitForm () {
  	  this.$refs.rtxform.validate((valid) => {
  	  	if (valid) {
  	  		if (parseInt(getCache('ddnotify')) === 1) {
               this.$message({
               	  message: this.$t('exporttype.tip1'),
               	  type: 'error'
               })
  	  		} else {
  	  			this.$store.dispatch('updateRtxConf',this.form).then(res => {
			  	  	let {status} = res
			  	  	if (status === 0) {
			          this.dialogVisible = false
			          this.$refs['rtxform'].resetFields()
			  	  	}
			  	})
  	  		}
  	  	}
  	  })
  	},
  	resetForm() {
      this.$refs['rtxform'].resetFields()
  	}
  }
}
</script>
