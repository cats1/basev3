<template>
  <div class="app-wrapper" >
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <div class="main-container">
      <!-- <navbar></navbar>
      <tags-view></tags-view> -->
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { AppMain } from './components'

export default {
  data () {
    return {}
  },
  components: {
    AppMain
  }
}
</script>
