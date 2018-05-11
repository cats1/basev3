<template>
	<div class="guidewrap">
		<h1 class="guidelogo"><img :src="imgSrc" alt=""></h1>
		<div class="guidecell">			
			<div class="guidetop">
				<div class="guidesteps">
					<step-one :num="2" :total="5"></step-one>
				</div>
				<p class="guide-top-title">{{$t('guide.guide2.title')}}</p>
				<p class="guide-top-desc">{{$t('guide.guide2.desc')}}</p>
			</div>
			<div class="guidebody">
				<el-row style="margin-bottom: 20px;" :gutter="20">
					<el-col :span="8">
						{{$t('formCheck.validEmpName.holder')}}
					</el-col>
					<el-col :span="8">
						{{$t('formCheck.validphone.holder')}}
					</el-col>
					<el-col :span="8">
						{{$t('form.email.text')}}
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 20px;" :gutter="20" v-for="(item,index) in empArray" :key="index">
					<el-col :span="8">
						<el-input v-model="item.name" :placeholder="$t('formCheck.validEmpName.holder')"></el-input>
					</el-col>
					<el-col :span="8">
						<el-input v-model="item.phone" :placeholder="$t('formCheck.validphone.holder')"></el-input>
					</el-col>
					<el-col :span="8">
						<el-input v-model="item.email" :placeholder="$t('form.email.text')"></el-input>
					</el-col>
				</el-row>
			</div>
			<div class="guidebom">
				<p class="desc">{{$t('guide.guide2.next')}}</p>
				<el-button type="primary" @click="goNext">{{$t('guide.guide2.btn')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import stepOne from './stepOne'
export default {
  components: { stepOne },
  data () {
  	return {
      empArray: [{
      	name: getCache('username'),
      	phone: getCache('phone'),
      	email: getCache('email')
      },{
      	name: '',
      	phone: '',
      	email: ''
      },{
      	name: '',
      	phone: '',
      	email: ''
      }],
      imgSrc: require('@/assets/img/guide-logo.png')
  	}
  },
  methods: {
  	goNext () {
  	  let earray = []
  	  this.empArray.forEach(function(element, index) {
  	  	if (element.name!==''&&element.phone!==''&&element.email!=='') {
          earray.push(element)
  	  	}
  	  })
  	  if (earray.length === 0) {
  	  	this.$message({
  	  	  type: 'warning',
  	  	  message: '请至少添加一条员工信息'
  	  	})
  	  } else {
  	  	let length = earray.length
  	  	let _self = this
  	  	earray.forEach(function(element, index) {
  	  	  let nform = {
            userid: getCache('userid'),
            employee_name: element.name,
            empNo: '',
            email: element.email,
            phone: element.phone,
            emptype: 2,
            empPosition: '',
            telephone: '',
            workbay: '',
            visitType: '',
            subaccountId: 0,
            empNickname: '',
            remark: '',
            deptIds: [],
            cardNo: '',
            egids: '',
            startDate: '',
            endDate: ''
          }
          _self.$store.dispatch('addEmployee',nform).then(res => {
            let {status} = res
            if (status === 0) {
              if ((index + 1) === length) {
              	_self.$router.push({path:'guide3'})
              }
            }
          })
  	  	})
  	  }
  	}
  }
}	
</script>