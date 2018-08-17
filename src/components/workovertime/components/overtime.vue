<template>
	<div class="boxshadow bgwhite paddinglr30 paddingtb20 marginbom20">
		<el-form :model="form" ref="sform" label-width="50px" style="width:100%">
      <el-row>
        <el-col :span="4">
          <el-form-item :label="$t('form.name.text')">
            <el-input v-model="form.empName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('form.position.text1')">
            <el-input v-model="form.empNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('date')">
            <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="-" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    :start-placeholder="$t('vtime[0]')"
                    :end-placeholder="$t('vtime[1]')" @change="getDate">
                    </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
			
			
			<el-form-item :label="$t('status.text')">
			    <el-checkbox-group v-model="form.slist" @change="getStatus" :min="1">
			      <el-checkbox :label="0" :key="0">{{$t('unresolve')}}</el-checkbox>
			      <el-checkbox :label="1" :key="1">{{$t('agree')}}</el-checkbox>
			      <el-checkbox :label="2" :key="2">{{$t('refuse')}}</el-checkbox>
			    </el-checkbox-group>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="doSearch">{{$t('btn.searchBtn')}}</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" border @row-click="showEmp">
	  		<el-table-column prop="empName" width="100" :label="$t('form.name.text')"></el-table-column>
	  		<el-table-column prop="empNo" width="100" :label="$t('form.position.text1')"></el-table-column>
	  		<el-table-column prop="status" width="100" :label="$t('status.text')">
	  			<template slot-scope="scope">
	  				<span v-if="scope.row.status == 0">{{$t('unresolve')}}</span>
	  				<span v-else-if="scope.row.status == 1">{{$t('agree')}}</span>
	  				<span v-else-if="scope.row.status == 2">{{$t('refuse')}}</span>
	  			</template>
	  		</el-table-column>
	  		<el-table-column :label="$t('date')">
	  			<template slot-scope="scope">
	  				<span>{{scope.row.oDates}}</span>
	  			</template>
	  		</el-table-column>
	  	</el-table>
	  	<div class="page-footer">
	  		<el-pagination
	  		  @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
		      :current-page="form.startIndex"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="form.requestedCount"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	  	</div>
	  	<emp-new-detail :btn-show="false" :parent="parent" :btn-type="btnType" :edit-type="editType" :cur-emp="selectCurEmp" :dlist="dlist" :onwork="true" :dialog-show="dialogShow" @updateempkit="getUpdatekit"></emp-new-detail>
	</div>
</template>
<script>
import {empNewDetail} from '@/components/emplist/components'
import {getCache} from '@/utils/auth'
export default {
	components: {empNewDetail},
  data () {
  	return {
  	  checkAll: false,
      isIndeterminate: true,
  	  form: {
  	  	userid: getCache('userid'),
		empNo: '',
		empName: '',
		startDate: null,
		endDate: null,
		slist: [0],
		startIndex: 1,
        requestedCount: 10
  	  },
  	  total: 0,
  	  dateRange: [new Date(), new Date()],
  	  list: [],
  	  editType: 0,
      dialogVisible: false,
      selectCurEmp: {},
      btnType: 1,
      editType: 1,
      dlist: [],
      parent: {},
      dialogShow: false,
  	}
  },
  mounted () {
  	this.doSearch()
  },
  methods: {
  	showEmp (val) {
      this.parent = {}
      this.getDeptByEmpid(val.empid)
      this.dialogShow = true
      this.editType = 1
      this.selectCurEmp = val
    },
    getUpdatekit (data) {
      this.editType = 0
      this.dialogShow = false
      this.selectCurEmp = {}
      this.doSearch()
    },
    getDeptByEmpid (type) {
      let nform = {
        empid: type,
        userid: getCache('userid')
      }
      this.$store.dispatch('getDeptByEmpid',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          if (result.length > 0) {
            let nobj = {
              label: result[0].deptName + '(' + result[0].empCount + ')',
              name: result[0].deptName,
              pid: result[0].parentId,
              pcount: result[0].empCount,
              dp: result[0].deptName,
              children: [],
              id: result[0].deptid
            }
            this.parent = nobj
          }
        }
      })
    },
  	handleSizeChange (val) {
  	  this.form.requestedCount = val
  	  this.doSearch()	  
  	},
  	handleCurrentChange (val) {
      this.form.startIndex = (val - 1) * this.form.requestedCount + 1
      this.doSearch()	 
  	},
  	getStatus (val) {},
  	getDate (val) {
  	  if (val.length > 0) {
  	  	this.form.startDate = new Date(val[0])
  	  	this.form.endDate = new Date(val[1])
  	  }
  	},
  	doSearch () {
  	  let nform = {
  	  	userid: getCache('userid'),
		empNo: this.form.empNo,
		empName: this.form.empName,
		startDate: this.form.startDate || new Date(this.dateRange[0]),
		endDate: this.form.endDate || new Date(this.dateRange[1]),
		slist: this.form.slist,
		startIndex: this.form.startIndex,
        requestedCount: this.form.requestedCount
  	  }
  	  this.$store.dispatch('getOverTimeList', nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.list = result.list
          this.total = result.count
        }
      })
  	}
  }
}
</script>