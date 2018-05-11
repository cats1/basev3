<template>
	<div class="smscodewrap">
		<el-input name="code" type="text" v-model="code" autoComplete="on" :placeholder="$t('smsCode')" @change="setCode"/>
		<template v-if="show">
			<el-button class="codebtn" type="primary" @click="sendCode">{{$t('sendSmsCode')}}</el-button>
		</template>
		<template v-else>
			<el-button class="codebtn" type="primary" disabled>{{$t('reget')}}({{count}}s)</el-button>
		</template>
		
	</div>
</template>
<script>
export default {
  props: ['phone'],
  data () {
  	return {
      code: '',
      show: true,
      count: '',
      timer: null
  	}
  },
  methods: {
  	timeClick () {
      const TIME_COUNT = 60
      if (!this.timer) {
      	this.count = TIME_COUNT
      	this.show = false
      	this.timer = setInterval(() => {
	       if (this.count > 0 && this.count <= TIME_COUNT) {
	         this.count--;
	        } else {
	         this.show = true;
	         clearInterval(this.timer);
	         this.timer = null;
	        }
	    }, 1000)
      }
  	},
  	setCode (value) {
      this.$emit('comit',value)
  	},
  	sendCode () {
  	  if (this.phone) {
  	  	let form = {
  	  	  phone: this.phone
  	  	}
  	    this.$store.dispatch('sendSmsCode',form).then(res => {
  	      this.timeClick()
  	    })
  	  } else {
        console.log(999)
  	  }
  	}
  }
}
</script>
