<template>
	<div id="cameraPanel" style="display:block">
        
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            photoswf: 'http://www.coolvisit.top/jh/MyCamera.swf'
        }
    },
    mounted () {
    	this.init()
    },
    methods: {
        init () {
          let flash = document.createElement("embed");
			flash.setAttribute("src", 'http://www.coolvisit.top/jh/MyCamera.swf');
			flash.setAttribute("style", "z-index:100");
			flash.setAttribute("pluginspage", "http://www.macromedia.com/go/getflashplayer");
			flash.setAttribute("quality", "high");
			flash.setAttribute("allowscriptaccess", "sameDomain");
			flash.setAttribute("wmode", "transparent");
			flash.setAttribute("type", "application/x-shockwave-flash");
			flash.setAttribute("id", "camera");
			flash.setAttribute("align", "middle");
			flash.setAttribute("name", "My_Cam");

		    document.getElementById("cameraPanel").appendChild(flash);
        }
    }
}
</script>
<style lang="scss" scoped>
/* CSS */
.borderstyle {
    border: 1px solid #b6b6b6;
    width: 320px;
    height: 240px;
}
#camera {
    float: left;
    margin:10px;
}
#canvas {
    width: 320px;
    height: 240px;
    margin:10px;
}
</style>