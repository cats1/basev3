<template>
  <div class="marginbom20">
    <el-button class="marginbom20" type="primary" @click="addSet">{{$t('notice.doorset.dialog.add')}}</el-button>
    <div class="clearfix">
      <template v-for="(item,index) in list">
        <input-one :value="item.gname" :index="index" @getv="setItem" @delekit="deleteItem"></input-one>
      </template>
    </div>
    <el-row class="margintop20">
      <el-button type="primary" @click="saveSetting">{{$t('btn.saveBtn')}}</el-button>
    </el-row>
  </div>
</template>
<script>
import { getCache } from '@/utils/auth'
import {booleanToNumber,numberToBoolean} from '@/utils/common'
import {inputOne} from '@/components/input'
export default {
  components: { inputOne },
  data () {
    return {
      imgSrc: require('@/assets/img/webchatv1.png'),
      isShow: false,
      list: []
    }
  },
  created () {
    this.getSetting()
  },
  methods: {
    showDown () {
      this.isShow = !this.isShow
    },
    setItem (index,val) {
      this.$set(this.list[index],'gname',val)
    },
    deleteItem (index,val) {
      let newArray = this.list
      this.list.splice(index)
    },
    addSet () {
      let obj = {
        gid: '',
        gname: ''
      }
      this.list.push(obj)
    },
    getSetting () {
      let nform = {
        userid: getCache('userid')
      }
      this.$store.dispatch('getGate',nform).then(res => {
        let {status,result} = res
        if (status === 0) {
          this.list = result
        }
      })
    },
    saveSetting () {
      this.$store.dispatch('addGate',this.list).then(res => {
        let {status} = res
        if (status === 0) {
          this.isShow = false
        }
      })
    }
  }
}
</script>