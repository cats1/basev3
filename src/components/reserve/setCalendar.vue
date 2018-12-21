<template>
	<div class="bgwhite">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <calendar-set
          ref="calendar1"
          :lunar="calendar1.lunar" 
          :value="calendar1.value"
          :zero="true"
          :setdates="setdates"
          @select="select"
          @update="update"
          @selectMonth="selectMonth"
          @selectYear="selectYear" ></calendar-set>
      </el-col>
    </el-row>         
        <el-dialog
          :title="$t('dateSet')"
          :visible.sync="dialogVisible"
          width="30%" >
          <el-form ref="form" :model="form" label-width="80px">
          	<el-form-item :label="$t('setStyle')">
          		<el-radio-group v-model="form.passFlag">
				        <el-radio :label="0">{{$t('workday')}}</el-radio>
				        <el-radio :label="1">{{$t('playday')}}</el-radio>
				      </el-radio-group>
          	</el-form-item>
          	<el-form-item :label="$t('form.remark.text')">
          		<el-input
      					type="textarea"
      					:rows="2"
                :maxlength="18"
      					:placeholder="$t('formCheck.remark.tip1')"
      					v-model="form.remark">
      				</el-input>
          	</el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          	<el-button type="primary" @click="saveHoliday">{{$t('btn.saveBtn')}}</el-button>
            <el-button type="danger" @click="delHoliday" v-show="form.hid !== ''">{{$t('btn.deleteBtn')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script>
import calendarSet from '@/components/calendar/calendarSet.vue'
import {formatDate,getYearFormat,getMonthFormat,getDayFormat} from '@/utils/index'
import { getCache } from '@/utils/auth'
export default {
  components: {calendarSet},
  data () {
  	return {
  	  dialogVisible: false,
  	  value10: '',
      calendar1: {
        value: [], //默认日期
        lunar:true,
        gregorian: true,
        zero: true,
        timestamp: Date.now()
      },
      value: new Date(),
      radio2: 0,
      form: {
      	hdate: '',
      	remark: '',
      	passFlag: 0,
        userid: getCache('userid')
      },
      setdates: [],
      updateKey: ''
  	}
  },
  created () {
    this.getHoliday(new Date())
  },
  methods: {
    initValue () {
      let year = this.value.getFullYear()
      let month = this.value.getMonth() + 1
      let day = this.value.getDate()
      this.calendar1.value = [year,month,day]
    },
  	select(value) {
      this.form = {
        hid: '',
        hdate: new Date(value.join('-')),
        remark: '',
        passFlag: 0,
        userid: getCache('userid')
      }
  		this.dialogVisible  = true
    },
    update (value,item,k) {
      this.updateKey = k
      this.form = {
        hid: item.hid,
        hdate: item.hdate,
        remark: item.remark,
        passFlag: item.passFlag,
        userid: getCache('userid')
      }
      this.dialogVisible  = true
    },
    selectMonth(month, year,day) {
      let date = new Date()
      let nYear = date.getFullYear()
      this.calendar1.value = [year,month,day]
      this.getHoliday(new Date(year + '-01-01'))
    },
    selectYear(year) {
      this.getHoliday(new Date(year + '-01-01'))
    },
    saveHoliday () {
      if (this.form.hid !== '') {
        this.updateHoliday()
      } else {
        this.addHoliday()
      }
    },
    addHoliday () {
      let nform = {
        hdate: this.form.hdate,
        remark: this.form.remark,
        passFlag: this.form.passFlag,
        userid: getCache('userid')
      }
      this.$store.dispatch('addHoliday', nform).then(res => {
      	let { status } = res
        if (status == 0) {
          this.value = nform.hdate
          this.getHoliday(nform.hdate)
          this.dialogVisible  = false
        }
      })
    },
    updateHoliday () {
      let nform = {
      	hid: this.form.hid,
      	hdate: this.form.hdate,
      	remark: this.form.remark,
      	passFlag: this.form.passFlag,
        userid: getCache('userid')
      }
      this.$store.dispatch('updateHoliday',nform).then(res => {
      	let { status } = res
        if (status == 0) {
          this.setdates[this.updateKey].remark = this.form.remark
          this.setdates[this.updateKey].passFlag = this.form.passFlag
          this.dialogVisible  = false
        }
      })
    },
    delHoliday () {
      let nform = {
      	hid: this.form.hid,
        userid: getCache('userid')
      }
      this.$store.dispatch('delHoliday',nform).then(res => {
      	let { status } = res
        if (status == 0) {
          this.setdates.splice(this.updateKey,1)
          this.dialogVisible  = false
        }
      })
    },
    getHoliday (val) {
      let nform = {
      	hdate: val,
        userid: getCache('userid')
      }
      this.$store.dispatch('getHoliday',nform).then(res => {
        let { status,result } = res
        if (status == 0) {
          let _self = this
          _self.setdates = []
          result.forEach(function(el,index){
            let sel = {
              year: getYearFormat(el.hdate),
              month: getMonthFormat(el.hdate),
              day: getDayFormat(el.hdate),
              hid: el.hid,
              hdate: el.hdate,
              passFlag: el.passFlag,
              remark: el.remark
            }
            _self.setdates.push(sel)
          })
        }
      })
    }
  }
}
</script>