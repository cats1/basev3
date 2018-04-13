<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <sider-bar>
            <h2>{{$t('key.siderBar.title')}}</h2>
            <sider-bar-item>
              8888
            </sider-bar-item>
          </sider-bar>
        </el-col>
        <el-col :span="20">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '../../components/headnav/headnav'
import footbom from '../../components/footer/footbom'
import { siderBar, siderBarItem } from '../../components/siderBar'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { headnav, footbom, siderBar, siderBarItem }
}
</script>
<style>
</style>