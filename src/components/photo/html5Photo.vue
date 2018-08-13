<template>
  <div class="html5photo" id="contentHolder" >
        <video id="video" width="320" height="320" autoplay></video>
        <button id="picture" class="btn blue-button1" style="display:block;margin: 10px auto;">拍照</button>
        <canvas style="display:block;margin: 10px auto;" id="canvas" width="320" height="320"></canvas>
        <button id="sc" class="btn blue-button1" style="display:block;margin: 10px auto;">确定</button>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var mediaStreamTrack;
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: { width: 320, height: 320 } },
            function(stream) {
                mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                console.log(video)
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
    });
    }
  }
}
</script>