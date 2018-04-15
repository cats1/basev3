<template>
  <div class="dashboard-container">
    <headnav active-index="setting"></headnav>
    <div class="page-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <sider-bar>
            {{$t('key.siderBar.title')}}
            <template v-for="item in siderArray">
              <sider-bar-menu :header="item.name">
                <template v-for="citem in item.children">
                  <sider-bar-item :index="citem.index">{{citem.name}}</sider-bar-item>
                </template>
              </sider-bar-menu>
            </template>
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
import { siderBar, siderBarItem, siderBarMenu } from '../../components/siderBar'
export default {
  name: 'App',
  data () {
    return {
      siderArray: this.$t('key.siderBar.children')
    }
  },
  components: { headnav, footbom, siderBar, siderBarItem, siderBarMenu }
}
</script>
<style>
</style>