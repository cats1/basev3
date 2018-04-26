<template>
	<div >
		<div class="boxshadow margintop20 paddinglr30 paddingtb20">
			<h3>{{$t('btn.exportListBtn')}}</h3>
			<div class="exportwrap">
				<div class="exportwrap-left">
					<img :src="src" alt="">
				</div>
				<div class="exportwrap-right">
					<el-button type="success" @click="syncSet">{{$t('exporttype.list[2]')}}</el-button>
					<p class="margintop20">
						<el-checkbox v-model="checked" @change="autoSyncSet">{{$t('exporttype.desc9')}}</el-checkbox>
					</p>
				</div>
			</div>
			<div class="exportbom margintop20 block">
				<p>{{$t('exporttype.CorpID')}}:<span>{{form.ddcorpid}}</span><el-button class="right" @click="editRtx">{{$t('btn.editBtn')}}</el-button></p>
			</div>
		</div>
		<p class="exportbomtip">{{$t('exporttype.desc5')}}{{$t('exporttype.list[2]')}}{{$t('exporttype.desc8')}}<span class="links" @click="changeType">{{$t('exporttype.desc4')}}</span></p>
		<el-dialog :title="$t('exporttype.ddSet')"
		  :visible.sync="dialogVisible"
		  width="30%">
		    <el-form label-position="top" label-width="80px" :rules="rules" ref="rtxform" :model="form">
			  <el-form-item :label="$t('exporttype.CorpID')" prop="ddcorpid">
			    <el-input v-model="form.ddcorpid"></el-input>
			  </el-form-item>
			  <el-form-item :label="$t('exporttype.CorpSecret')" prop="ddcorpsecret">
			    <el-input v-model="form.ddcorpsecret"></el-input>
			  </el-form-item>
        <el-form-item :label="$t('exporttype.agentid')" prop="ddagentid">
          <el-input v-model="form.ddagentid"></el-input>
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
  	var checkNull = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('exporttype.isNull')));
        } else {
          callback();
        }
    };
  	return {
  	  src: require('@/assets/img/ddv1.png'),
  	  checked: false,
  	  dialogVisible: false,
  	  form: {
  	  	ddnotify: getCache('ddnotify'),
  	  	ddautosync: getCache('ddautosync'),
        ddcorpid: getCache('ddcorpid'),
        ddcorpsecret: getCache('ddcorpsecret'),
        ddagentid: getCache('ddagentid'),
  	  	userid: getCache('userid')
  	  },
  	  rules: {
  	  	ddcorpid: [
            { validator: checkNull, trigger: 'blur' }
        ],
        ddcorpsecret: [
            { validator: checkNull, trigger: 'blur' }
        ],
        ddagentid: [
            { validator: checkNull, trigger: 'blur' }
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
      this.$store.dispatch('getEmployeeFromDD',nform).then(res => {
        let {status} = res
        if (status === 0) {
            this.$emit('syncdd')
        }
      })
    },
    autoSyncSet (val) {
        if (getCache('ddnotify') === 0) {
            this.$message({
              message: '钉钉设置未打开，无法开启自动同步',
              type: 'error'
            })
            this.checked = !this.checked
        } else if (getCache('rtxip')&&getCache('rtxport')) {
            this.$message({
              message: 'RTX开关已打开，钉钉开关无法开启，如若开启钉钉，请先关闭RTX',
              type: 'error'
            })
        } else {
          this.form.ddnotify = 1
          this.form.ddautosync = booleanToNumber(val)
          this.$store.dispatch('updateDDNotify',this.form).then(res => {
            let {status} = res
            if (status === 0) {
                this.$emit('autosyncdd')
            }
          })
        }   
    },
  	submitForm () {
  	  this.$refs.rtxform.validate((valid) => {
  	  	if (valid) {
  	  		if (getCache('rtxip')&&getCache('rtxport')) {
               this.$message({
               	  message: this.$t('exporttype.tip2'),
               	  type: 'error'
               })
  	  		} else {
            this.form.ddnotify = 1
            this.form.ddautosync = 0
  	  			this.$store.dispatch('updateDDNotify',this.form).then(res => {
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
