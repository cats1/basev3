<template>
	<div class="box-section">
		<h3><el-button type="text" @click="showVisit">访客<template v-if="cShow === false">
        <i class="el-icon-caret-bottom"></i>
      </template>
      <template v-else>
        <i class="el-icon-caret-top"></i>
      </template></el-button>
      <el-button type="primary" @click="goControl">数据管理</el-button>
    </h3>
    <el-collapse-transition>
      <div v-show="cShow === true">
        <template v-for="(item,index) in $t('vtype')">
          <span class="vtypespan" :class="{'isActive': index === ctype}" @click="setVtype(index)">{{item}}</span>
        </template>
      </div>
    </el-collapse-transition>
    <template v-if="ctype === 0 || ctype === 3">
      <el-button type="default">访客总数</el-button>
      <el-button type="default">离开人数</el-button>
      <el-button type="default">正在拜访人数</el-button>
    </template>
    <template v-else-if="ctype === 1 || ctype === 2">
      <el-button type="default">总数</el-button>
      <el-button type="default">签到人数</el-button>
      <el-button type="default">未到人数</el-button>
    </template>
	</div>
</template>
<script>
export default {
  data () {
  	return {
      cShow: false,
      ctype: 0
    }
  },
  created () {},
  mounted () {},
  methods: {
  	getSignVisitor () {},
    showVisit () {
      this.cShow = !this.cShow
    },
    setVtype (type) {
      this.ctype = type
      this.$emit('changekit',type)
    },
    goControl () {
      this.$router.push({path: 'data'})
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