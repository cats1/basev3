<template>
  <div class="html5photo" id="contentHolder" >
      <video id="video" width="320" height="320" autoplay></video>
      <el-button type="primary" id="picture" class="btn blue-button1" style="display:block;margin: 10px auto;">拍照</el-button>
      <canvas style="display:block;margin: 10px auto;" id="canvas" width="320" height="320"></canvas>
      <el-button type="success" id="sc" class="btn blue-button1" style="display:block;margin: 10px auto;">确定</el-button>
    </div>
</template>
<script>
import { UploadBase64Common } from '@/utils/upload'
export default {
  data () {
    return {
     mediaStreamTrack: null 
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      var mediaStreamTrack
      this.mediaStreamTrack = mediaStreamTrack
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: { width: 320, height: 320 } },
            function(stream) {
                _self.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                video.play();
                /*  var video = document.getElementById("video");
                 video.src = window.URL.createObjectURL(stream);
                 video.onloadedmetadata = function(e) {
                     console.log('nihao44eee4aaaaddda');
                     video.play();
                 }; */
            },
            function(err) {
                console.log("The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
    /*document.getElementById("stop").addEventListener("click", function() {
        mediaStreamTrack && mediaStreamTrack.stop();
    });*/
    document.getElementById("picture").addEventListener("click", function() {
        var context = document.getElementById("canvas").getContext("2d");
        context.drawImage(video, 0, 0, 320, 320);
    });
    document.getElementById("sc").addEventListener("click", function() {
        var imgData = document.getElementById("canvas").toDataURL("image/png");
        //var mmmd = getBase64Image(document.getElementById("mmm"));
        var data = imgData.substr(22);
        //console.log(mmmd)        
        UploadBase64Common(data, function(data) {
            _self.$emit('uploaddata',data)
            _self.mediaStreamTrack && _self.mediaStreamTrack.stop();
        })
    });
    }
  },
  beforeDestroy () {
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
  },
  destroyed () {

  }
}
</script>