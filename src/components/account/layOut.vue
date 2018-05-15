<template>
	<div class="page-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <dl class="barlist boxshadow bgwhite">
          	<dt>{{$t('account.siderBar.title')}}</dt>
          	<template v-for="(item,index) in $t('account.siderBar.list')">
          		<router-link :to="{'name': item.link}" >
                <dd :class="{'active': $route.name === item.link}"><span class="bluelines"></span>{{item.name}}</dd></router-link>
          	</template>
          </dl><!--  -->
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
import {getCache} from '@/utils/auth'
export default {
  data () {
  	return {
      activeClass: 'active'
    }
  }
}
</script>