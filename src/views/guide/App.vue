<template>
  <div class="guide-container">      
    <div class="form-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>           
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  	return {}
  },
  methods: {},
  created () {
    console.log(this.$route)
  }
}
</script>
<style lang="scss" scoped>
</style>
