<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div class="language">
      <i class="fa fa-language fa-2x"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
      <!-- <el-dropdown-item command="more" divided>更多</el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  computed: {
  	language() {
      return this.$store.getters.language
    }
  },
  watch: {
    $route (val) {
      this.setTitle()
    }
  },
  mounted () {
    this.$store.dispatch('setLanguage', this.$i18n.locale)
    this.setTitle()
  },
  methods: {
    setTitle () {
      if (this.$route) {
        let title = this.$route.meta.title
        document.title = this.$t('route.' + title) + ' | 来访通 Coolvisit.com'
      }
    },
    handleSetLanguage(lang) {
      if (lang !== 'more') {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
        this.setTitle()
        this.$message({
          message: this.$t('switchLanguage'),
          type: 'success'
        })
      }
    }
  }
}
</script>
<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>