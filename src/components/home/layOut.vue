<template>
  <div class="dashboard-container">
   <headnav :active-index="activeIndex"></headnav>
    <div class="page-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footbom></footbom>
  </div>
</template>
<script>
import headnav from '@/components/headnav/headnav'
import footbom from '@/components/footer/footbom'
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '',
      indexList: ['visitor','index','data'],
      empList: ['emp','emplist','role','visitlist','blacklist'],
      noticeList: ['notice'],
      settingList: ['pad','reserve','approve','key','list','record'],
      meetingList: ['meeting','mdetail']
    }
  },
  components: { headnav, footbom },
  created () {
    if (this.checkIndex()) {
      this.activeIndex = 'index'
    } else if (this.checkEmp()) {
      this.activeIndex = 'emp'
    } else if (this.checkNotice()) {
      this.activeIndex = 'notice'
    } else if (this.checkSetting()) {
      this.activeIndex = 'setting'
    } else if (this.checkMeeting()) {
      this.activeIndex = 'meeting'
    }
  },
  methods: {
    checkIndex () {
      let matched = this.$route.matched
      let flag = false
      this.indexList.forEach(function(element, index) {
        matched.forEach(function(ele, eindex) {
          if (element === ele.name) {
            flag = true
          }
        })
      })
      return flag
    },
    checkEmp () {
      let matched = this.$route.matched
      let flag = false
      this.empList.forEach(function(element, index) {
        matched.forEach(function(ele, eindex) {
          if (element === ele.name) {
            flag = true
          }
        })
      })
      return flag
    },
    checkNotice () {
      let matched = this.$route.matched
      let flag = false
      this.noticeList.forEach(function(element, index) {
        matched.forEach(function(ele, eindex) {
          if (element === ele.name) {
            flag = true
          }
        })
      })
      return flag
    },
    checkSetting () {
      let matched = this.$route.matched
      let flag = false
      this.settingList.forEach(function(element, index) {
        matched.forEach(function(ele, eindex) {
          if (element === ele.name) {
            flag = true
          }
        })
      })
      return flag
    },
    checkMeeting () {
      let matched = this.$route.matched
      let flag = false
      this.meetingList.forEach(function(element, index) {
        matched.forEach(function(ele, eindex) {
          if (element === ele.name) {
            flag = true
          }
        })
      })
      return flag
    }
  }
}
</script>
<style>
</style>
