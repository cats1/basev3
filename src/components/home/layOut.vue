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
      activeIndex: 'index',
      indexList: ['data'],
      empList: ['emplist','role','visitlist','blacklist'],
      noticeList: ['notice'],
      settingList: ['pad','reserve','key','list','record'],
      meetingList: ['meeting']
    }
  },
  components: { headnav, footbom },
  created () {
    let name = this.$route.name
    console.log(name)
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
      let name = this.$route.name
      let flag = false
      this.indexList.forEach(function(element, index) {
        if (element === name) {
          flag = true
        }
      })
      return flag
    },
    checkEmp () {
      let name = this.$route.name
      let flag = false
      this.empList.forEach(function(element, index) {
        if (element === name) {
          flag = true
        }
      })
      return flag
    },
    checkNotice () {
      let name = this.$route.name
      let flag = false
      this.noticeList.forEach(function(element, index) {
        if (element === name) {
          flag = true
        }
      })
      return flag
    },
    checkSetting () {
      let name = this.$route.name
      let flag = false
      this.settingList.forEach(function(element, index) {
        if (element === name) {
          flag = true
        }
      })
      return flag
    },
    checkMeeting () {
      let name = this.$route.name
      let flag = false
      this.meetingList.forEach(function(element, index) {
        if (element === name) {
          flag = true
        }
      })
      return flag
    }
  }
}
</script>
<style>
</style>
