<template>
	<div class="box-section">
		<h3><el-button type="text" @click="showVisit">{{$t('vnum[6]')}}<template v-if="cShow === false">
        <i class="el-icon-caret-bottom"></i>
      </template>
      <template v-else>
        <i class="el-icon-caret-top"></i>
      </template></el-button>
      <el-button type="primary" v-show="dataShow" class="right" @click="goControl">
        <i class="fa fa-line-chart"></i>{{$t('dataM')}}</el-button>
    </h3>
    <el-collapse-transition>
      <div class="margintop20 marginbom20" v-show="cShow === true">
        <template v-for="(item,index) in $t('vtype')">
          <span class="vtypespan" :class="{'isActive': index === ctype}" @click="setVtype(index)">{{item}}</span>
        </template>
      </div>
    </el-collapse-transition>
    <div class="margintop20">
      <template v-if="ctype === 0 || ctype === 3">
        <el-button type="default" @click="getTotal">{{$t('vnum[0]')}}({{total}})</el-button>
        <el-button type="default" @click="getLeavel">{{$t('vnum[1]')}}({{LeavelNo}})</el-button>
        <el-button type="default" @click="getOn">{{$t('vnum[2]')}}({{onNo}})</el-button>
      </template>
      <template v-else-if="ctype === 1 || ctype === 2">
        <el-button type="default" @click="getTotal">{{$t('vnum[3]')}}({{total}})</el-button>
        <el-button type="default" @click="getOn">{{$t('vnum[4]')}}({{onNo}})</el-button>
        <el-button type="default" @click="getLeavel">{{$t('vnum[5]')}}({{LeavelNo}})</el-button>
      </template>
      <el-input class="right" style="width:200px;" v-model="sname" @change="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div class="paddingtb20" v-show="signOutShow">
        <el-button type="primary" @click="signDotOut">{{$t('btn.batchOut')}}</el-button>
        <div class="right" v-show="doOutShow">
          <el-button @click="doConfirmOut">{{$t('btn.confirmBtn')}}</el-button>
          <el-button @click="doCancelOut">{{$t('btn.cancelBtn')}}</el-button>
        </div>
      </div>
    </el-collapse-transition>
	</div>
</template>
<script>
export default {
  props: {
    totalNum: {
      type: Number,
      default: 0
    },
    leavelNum: {
      type: Number,
      default: 0
    },
    onNum: {
      type: Number,
      default: 0
    },
    checkArray: {
      type: Array,
      default: []
    },
    dataShow: {
      type: Boolean,
      default: true
    },
  },
  data () {
  	return {
      cShow: false,
      ctype: 0,
      total: 0,
      onNo: 0,
      LeavelNo: 0,
      sname: '',
      signOutShow: false,
      doOutShow: false,
      form: []
    }
  },
  watch: {
    totalNum (val) {
      this.total = val
    },
    leavelNum (val) {
      this.LeavelNo = val
    },
    onNum (val) {
      this.onNo = val
    },
    checkArray (val) {
      let ara = []
      val.forEach(function(element, index) {
        let obj = {
          vid: element.vid
        }
        ara.push(obj)
      })
      this.form = ara
    }
  },
  created () {},
  mounted () {},
  methods: {
  	getSignVisitor () {},
    showVisit () {
      this.cShow = !this.cShow
    },
    searchName (val) {
      console.log(val)
      this.$emit('searchkit',val)
    },
    setVtype (type) {
      this.ctype = type
      this.signOutShow = false
      this.$emit('changekit',type)
    },
    getTotal () {
      this.signOutShow = false
      this.$emit('totalkit')
    },
    getLeavel () {
      this.signOutShow = false
      this.$emit('leavelkit')
    },
    getOn () {
      if (this.ctype === 0) {
        this.signOutShow = true
      } else {
        this.signOutShow = false
      }
      this.$emit('onkit')
    },
    goControl () {
      this.$router.push({path: 'data'})
    },
    signDotOut () {
      this.doOutShow = true
      this.$emit('outkit')
    },
    doConfirmOut () {
      this.$store.dispatch('batchSignOut',this.form).then(res => {
        let {status} = res
        if (status === 0) {
          this.doOutShow = false
          this.signOutShow = false
          this.$emit('outconfirmkit')
        }
      })
    },
    doCancelOut () {
      this.doOutShow = false
      this.$emit('outcancelkit',false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .isActive{
    color: #409EFF;
  }
  .vtypespan{
    padding: 10px 10px;
  }
</style>