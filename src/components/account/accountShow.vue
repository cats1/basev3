<template>
	<div class="page-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <dl class="barlist">
          	<dt>{{$t('account.siderBar.title')}}</dt>
          	<template v-for="(item,index) in $t('account.siderBar.list')">
          		<dd><router-link :to="item.link">{{item.name}}</router-link></dd>
          	</template>
          </dl>
        </el-col>
        <el-col :span="20">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data () {
  	return {}
  }
}
</script>