<template>
  <div class="marginbom20">
    <one-notice :is-no-padding="false" :n-icon="imgSrc" :n-title="$t('tagTitle')" :n-desc="$t('tagDesc')" :btn-flag="true" @btn-click="showDown"></one-notice>
    <el-dialog :visible.sync="isShow" width="50%" >
      <div>
        <el-row :gutter="20" class="paddingbom20">
          <el-col :span="20"><el-input placeholder="请输入标签" v-model="value"></el-input></el-col>
          <el-col :span="4"><el-button type="primary" @click="doConfirm">确定</el-button></el-col>
        </el-row>
        <p class="paddingbom20">标签列表:</p>
        <ul class="taglist">
          <li v-for="item in tagList">
            <span class="liclose" @click="doDel(item)"><i class="fa fa-close"></i></span>
              {{item.tagName}}
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { oneNotice } from '@/components/notice'
import { getCache } from '@/utils/auth'
export default {
  components: { oneNotice },
  data () {
    return {
      imgSrc: require('@/assets/img/tag.png'),
      isShow: false,
      value: '',
      tagList: [],
      form: {
        secureProtocol: getCache('secureProtocol'),
        userid: getCache('userid')
      }
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getTags()
    })
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    getsp (con) {
      this.form.secureProtocol = con
    },
    getTags () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getTags',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.tagList = result
        }
      })
    },
    addTags (tagname) {
      let nform = {
        tagName: tagname,
        userid: getCache('userid')
      }
      this.$store.dispatch('addTag',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.value = ''
          this.getTags()
        }
      })
    },
    delTags (tid) {
      let nform = {
        tid: tid,
        userid: getCache('userid')
      }
      this.$store.dispatch('delTag',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.getTags()
        }
      })
    },
    doConfirm () {
      if (this.value != '') {
        if (this.tagList.length >= 30) {
          this.$message({
            showClose: true,
            message: '标签最多30个',
            type: 'warning'
          })
        } else {
          this.addTags(this.value)
        }
      } else {
        this.$message({
          showClose: true,
          message: this.$t('exporttype.isNull'),
          type: 'warning'
        })
      }      
    },
    doDel (item) {
      this.delTags(item.tid)
    }
  }
}
</script>
<style lang="scss" scoped>
.quillcons{
  overflow: hidden;
  min-height: 385px;
} 
</style>