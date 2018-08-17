<template>
	<div class="iephotowrap" style="">
        <el-row>
            <iframe :src="photoUrl" :interface="interface" :token="itoken" scrolling="no" frameborder="0" id="ieframe" ></iframe>
        </el-row>
    </div>
</template>
<script>
import $ from 'jquery'
import {getCache} from '@/utils/auth'
import { getBaseLink,getBaseUrl } from '@/utils/common'
export default {
    name: 'App',
    data () {
        return {
          photoUrl: getBaseLink() + '/photo/photo2.html',
          itoken: getCache('token'),
          interface: getBaseUrl()
        }
    },
    computed: {
        takephotourl: {
            get () {
              return $("#ieframe").attr('src')
            },
            set () {}
        }
    },
    watch: {
      takephotourl (val) {
        this.$emit('uploaddata',val)
      }
    },
    mounted () {
    	this.init()
    },
    methods: {
        init () {
            let _self = this
            document.getElementById('ieframe').onload = function(){
               _self.test()
            }
        },
        test () {
            console.log(888)
        }
    }
}
</script>
<style lang="scss" scoped>
/* CSS */
.iephotowrap {
    border: 1px solid #b6b6b6;
    width: 100%;
    height: 600px;
    iframe {
      width: 100%;
      height: 600px;
    }
}
</style>