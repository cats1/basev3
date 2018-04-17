<template>
  <div class="boxshadow">
    <coms-notice></coms-notice>
  </div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {comsNotice} from './components'
export default {
  components: {comsNotice},
  data () {
    return {
      form: {
        userid: getCache('userid'),
        oldpwd: '',
        newpwd: ''
      },
      renewpwd:''
    }
  },
  methods: {
    saveBase () {
      this.updateOldPwd()
    },
    updateOldPwd () {
      this.$store.dispatch('updatePassword',this.form)
    }
  }
}
</script>