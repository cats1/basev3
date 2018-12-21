<template>
	<div>
		<el-tabs class="lf-el-tabs" v-model="editableTabsValue" type="card" stretch :editable="editable" @edit="editTab" @tab-click="tabClick">
	    <el-tab-pane
	          v-for="(item, index) in editableTabs"
	          :key="item.name"
	          :label="item.title"
	          :name="item.name">
	    </el-tab-pane>
    </el-tabs>
        <template v-for="(item, index) in editableTabs" >
          <template v-if="mamType == 0">
            <manager-temp :mtype="item.title" :mapid="item.id" v-show="editableTabsValue == item.name" :isshow="editableTabsValue == item.name" :is-done="isDoShow" :is-init="editableTabsValue == item.name"></manager-temp>
          </template>
          <template v-else>
            <emp-temp :mtype="item.title" :mapid="item.id" v-show="editableTabsValue == item.name" :isshow="true" :is-done="isDoShow" :is-init="true" @getmoban="getEmpMoban"></emp-temp>
          </template>       	
        </template> 
        <el-dialog
	        :title="$t('btn.editBtn')"
	        :visible.sync="dialogVisible"
	        width="30%"
	        :before-close="handleClose">
	        <el-form ref="ruleForm" :model="tabForm" label-width="80px" :rules="rules">
	          <el-form-item :label="$t('tempName')" prop="title">
	            <el-input v-model="tabForm.title" @change="checkTitle"></el-input>
	          </el-form-item>
	        </el-form>
	        <span slot="footer" class="dialog-footer">
	          <el-button @click="doCancelTab">{{$t('btn.cancelBtn')}}</el-button>
	          <el-button type="primary" @click="confirmBtn">{{$t('btn.confirmBtn')}}</el-button>
	        </span>
        </el-dialog>
	</div>
</template>
<script>
import managerTemp from './managerTemp'
import empTemp from './empTemp'
import { getCache } from '@/utils/auth'
export default {
  props: {
  	isGet: {
  	  type: Boolean,
  	  default: false
  	},
    ntype: {
      type: Number,
      default: 0
    },
  	list: null
  },
  components: { managerTemp,empTemp },
  data () {
    const validateFormTitle = (rule, value, callback) => {
      let tabs = this.editableTabs
      let _self = this
      let formFlag = false
      tabs.forEach(function(element, index) {
        if(element.title == value){
          formFlag = true
          return false
        }
      })
      if (formFlag) {
        callback(new Error(this.$t('模板名已存在')))
      } else {
        callback()
      }
    }
  	return {
  	  editableTabsValue: '0',
      tabIndex: 0,
      editableTabs:[],
      tabForm: {
        title: '',
        name: '3',
        id: 'newtab3',
        showValue: false,
        closable: false
      },
      dialogVisible: false,
      touchtime: new Date().getTime(),
      rules: {
        title: [
          { required: true, message: this.$t('tempNameNotNull'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateFormTitle }
        ]
      },
      isDoShow: this.isGet,
      mamType: this.ntype,
      editable: this.ntype == '0' ? true : false,
      mobanObj: {}
  	}
  },
  watch: {
  	isGet (val) {
  	  this.isDoShow = val
  	},
  	list (val) {
  	  this.editableTabs = val
      if (val.length > 0) {
        this.editableTabsValue = val[0].name
        this.tabIndex = 0
      }
  	},
    ntype (val) {
      this.mamType = val
      this.editable = val == '0' ? true : false
    }
  },
  mounted () {},
  methods: {
  	editTab (targetName, action) {
      let tabObj = {}
      let _self = this
      this.editableTabs.forEach(function(element, index) {
        if (element.name == targetName) {
          tabObj = element
        }
      })
      if (action === 'add') {
        this.editType = 'add'
        if (this.editableTabs.length < 5) {
          this.tabForm.title = ''
          this.dialogVisible = true     
        } else {
          this.$message({
            showClose: true,
            message: '模板最多5个',
            type: 'warning'
          })
        }  
      }
      if (action === 'remove') {
        /*if(tabObj.title == '面试' || tabObj.title == '商务') {
          this.$message({
            showClose: true,
            message: '商务和面试不能删除',
            type: 'warning'
          })
        } else {*/
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          let activeTitleName
          let typeFlag = 'new'
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                typeFlag = tab.type
                activeTitleName = tab.title
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })           
          } else {
            activeTitleName = tabObj.title//tabs[parseInt(targetName)].title
          }
          this.editableTabsValue = activeName       
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
          if (typeFlag == 'old') {
            this.delUsertemplate(activeTitleName)
          }
        //}
      }
    },
    tabClick (tab, event) {
      if(new Date().getTime() - this.touchtime < 500 ){
        let tabForm = this.editableTabs[parseInt(this.editableTabsValue)]
        if (tabForm.title == '面试' || tabForm.title == '商务') {
          this.$message({
            showClose: true,
            message: '面试和商务模板名称不能修改',
            type: 'warning'
          })
        } else {
          this.editType = 'update'
          this.tabForm = tabForm
          this.dialogVisible = true
        }
      }else{
        this.touchtime = new Date().getTime()
      }
    },
    handleClose () {
      this.tabForm.title = ''
      this.dialogVisible = false
    },
    checkTitle (val) {},
    confirmBtn () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {          
          if (this.editType == 'update') {
            this.doUpdateTab()
          } else {
            this.doAddTab()
          }
        } else {
          //console.log('error submit!!');
          return false;
        }
      })
    },
    doUpdateTab () {
      let newTabName = this.tabForm.title
      this.editableTabs[parseInt(this.editableTabsValue)].title = newTabName
      //this.editableTabsValue = newTabName
      this.dialogVisible = false
    },
    doCancelTab () {
      this.tabForm.title = ''
      this.dialogVisible = false
    },
    doAddTab () {
      let newTabName = new Date().getTime()
      let nArray = []
      this.editableTabs.forEach(function(element, index) {
        let obj = element
        obj.showValue = false
        nArray.push(obj)
      })
      nArray.push({
         title: this.tabForm.title,
         name: newTabName.toString(),
         id: 'new' + newTabName,
         showValue: true,
         closable: true,
         type: 'new'
      })
      this.editableTabs = nArray
      this.editableTabsValue = newTabName.toString()
      this.dialogVisible = false
    },
    delUsertemplate (type) {
      let newForm = {
        templateType: type,
        userid: getCache('userid')
      }
      this.$store.dispatch('delUsertemplate',newForm).then(res => {
        let { status } = res
        if (status == 0) {
          this.$emit('getchange',this.form)
        }
      })
    },
    getEmpMoban (moban) {
      this.mobanObj[moban.templateType] = moban
      this.$emit('getchange',this.mobanObj)
    }
  }
}
</script>