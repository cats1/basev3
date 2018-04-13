<template>
	<div class="noticewrap">
      <div class="noticeheader" :class="{boxshadow: isBox,padding0: isNoPadding}">
      	<span class="noticeicon" v-show="nIcon">
      		<img :src="nIcon" alt="">
      	</span>
      	<span class="noticetext">
          <h3>{{nTitle}}</h3>
		      <p>{{nDesc}}</p>
      	</span>
      	<span class="noticeswitch">
          <template v-if="switchFlag !== undefined">
            <el-switch v-model="switchValue" @change="setSwitch">
            </el-switch>
          </template>
      	  <template v-else-if="btnFlag !== undefined">
            <el-button type="primary" @click="doEdit">{{btnText}}</el-button>
          </template>
      	</span>
      </div>		
	</div>
</template>
<script>
export default {
  props: {
    isBox: {
      type: Boolean,
      default: true
    },
    isNoPadding: {
      type: Boolean,
      default: false
    },
    switchFlag: null,
    btnFlag: null,
    nTitle: null,
    nDesc: null,
    nIcon: null
  },
  data () {
    return {
      switchValue: this.switchFlag,
      btnText: this.$t('btn.editBtn'),
      clickFlag: false
    }
  },
  methods: {
    setSwitch () {
      this.$emit('gswitch', this.switchValue)
    },
    doEdit () {
      this.clickFlag = !this.clickFlag
      this.btnText = this.clickFlag === true ? this.$t('btn.shouBtn') : this.$t('btn.editBtn')
      this.$emit('btn-click')
    }
  },
  mounted () {
    console.log(this.btnFlag)
  }
}
</script>
<style></style>
