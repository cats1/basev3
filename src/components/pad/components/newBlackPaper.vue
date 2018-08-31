<template>
	<div>
		<el-col :span="12">
			<div class="self-card-wrap" id="self-card-wrap">
                <div class="self-card-show" id="self-card-show">
                    <iframe :src="iframeSrc" scrolling="no" frameborder="0" id="cardiframe"></iframe>
                </div>
            </div>
		</el-col>
		<el-col :span="10">
			<el-form ref="form" class="modeform" :model="form" label-width="100px" :label-position="labelPosition">
			  <h3 class="form-item-nowrap">{{$t('vCardType')}}</h3>
			  <div class="form-item-nowrap borderbom">
			  	<el-radio-group v-model="form.badgemode" @change="setCardSeting">
				    <el-radio :label="0">{{$t('commonText')}}</el-radio>
				    <el-radio :label="1">{{$t('customized')}}</el-radio>
				</el-radio-group>
			  </div>
			  <template v-if="form.badgemode == 0">
			  	<div>
				  	<el-row :gutter="20">
					  	<el-col :span="12" >
					  	  <el-form-item :label="$t('logoTypeText')">
						    <el-select v-model="form.brandType" @change="changeIframeSrc">
						      <el-option :key="0" :label="$t('logoText')" :value="0"></el-option>
						      <el-option :key="1" :label="$t('logoImage')" :value="1"></el-option>
						    </el-select>
						  </el-form-item>
						</el-col>
						<el-col :span="12">
						  <el-form-item :label="$t('logoTypePosition')">
						    <el-select v-model="form.brandPosition" @change="changeIframeSrc">
						      <el-option :key="0" :label="$t('logoPositionTop')" :value="0"></el-option>
						      <el-option :key="1" :label="$t('logoPositionBom')" :value="1"></el-option>
						      <el-option :key="2" :label="$t('logoPositionMid')" :value="2"></el-option>
						    </el-select>
						  </el-form-item>
					  	</el-col>
				    </el-row>
				  </div>
	              <div class="form-item-nowrap">
				  	<el-checkbox v-model="form.showAvatar" @change="changeIframeSrc">{{$t('isShowAvatar')}}</el-checkbox>
	              </div>
	              <template v-if="form.showAvatar">
	              	<div>
	              		<el-row :gutter="20">
	              		  <el-col :span="12" >
	              		  	<el-form-item :label="$t('portraitType')">
	              		       <el-select v-model="form.avatarType" @change="changeIframeSrc">
							      <el-option :key="0" :label="$t('userPhoto')" :value="0"></el-option>
							      <el-option :key="1" :label="$t('fixedPhoto')" :value="1"></el-option>
							      <el-option :key="2" :label="$t('codePhoto')" :value="2"></el-option>
							    </el-select>
						    </el-form-item>
						  </el-col>
					    </el-row>
				    </div>
					<el-form-item :label="$t('fixedPhoto')" v-if="form.avatarType == 1">
						<el-col :span="18" >
	              		  	<el-input v-model="form.fixAvatarUrl" readonly></el-input>
	              		</el-col>
	              		<el-col :span="4" >
	              			<self-upload-pic id="modeupload" eType="success" @geturl="getfixAvatarUrl"></self-upload-pic>
	              		</el-col>
					</el-form-item>
					<el-form-item :label="$t('codeText')" v-else-if="form.avatarType == 2">
					  	<el-input v-model="form.qrcodeText" @focus="changeIframeSrc" @blur="changeIframeSrc" @change="changeIframeSrc"></el-input>
					</el-form-item>
	              </template>
	              <el-form-item :label="$t('customText')">
					<el-input v-model="form.customText" @focus="changeIframeSrc" @blur="changeIframeSrc" @change="changeIframeSrc"></el-input>
				  </el-form-item>
			  </template>
			  <template v-else>
			  	<el-form-item :label="$t('badgeCustom')">
				  	<el-input v-model="form.badgeCustom" @focus="changeSelfIframeSrc" @blur="changeSelfIframeSrc" @change="changeSelfIframeSrc"></el-input>
				</el-form-item>
			  </template>
            </el-form>
		</el-col>
	</div>
</template>
<script>
import {getCache} from '@/utils/auth'
import {booleanToNumber,numberToBoolean,checkIsNull,getBaseLink,getBaseCardLink} from '@/utils/common'
import selfUploadPic from '@/components/upload/selfUploadPic'
export default {
  props: {
    cardType: {
      type: Number,
      default: 0
    },
    cardSize: {
      type: Number,
      default: 0
    }
  },
  components: { selfUploadPic },
  data () {
    return {
      labelPosition: 'left',
      iframeSrc: getBaseCardLink() + '/card/index.html?userid=' + getCache('userid') + '&token=' + getCache('token'),
      form:{
      	badgemode: parseInt(getCache('badgeMode')) || 0,
      	brandType: parseInt(getCache('brandType')) || 0,
      	brandPosition: parseInt(getCache('brandPosition')) || 0,
      	brandText: getCache('cardText'),
      	showAvatar: numberToBoolean(parseInt(getCache('showAvatar'))),
      	avatarType: parseInt(getCache('avatarType')),
      	fixAvatarUrl: getCache('qrcode').split('#')[1],
      	qrcodeText: getCache('qrcode').split('#')[0],
      	customText: getCache('customText'),
      	badgeCustom: checkIsNull(getCache('badgeCustom')) == '' ? 'deji' : getCache('badgeCustom'),
      	brandImageUrl: ''
      },
      checked: false
    }
  },
  mounted () {
  	//console.log(this.form.badgemode)
  },
  methods: {
  	changeIframeSrc () {
  		this.iframeSrc = getBaseCardLink() +'/card/index.html?badgeMode=' + this.form.badgeMode + '&badgeCustom=' + this.form.badgeCustom + '&brandType=' + this.form.brandType + '&brandPosition=' + this.form.brandPosition + '&showAvatar=' + booleanToNumber(this.form.showAvatar) + '&avatarType=' + this.form.avatarType + '&fixAvatarUrl=' + this.form.fixAvatarUrl + '&qrcodeText=' + this.form.qrcodeText + '&customText=' + this.form.customText + '&brandText=' + this.form.brandText + '&brandImageUrl=' + this.form.brandImageUrl + '&userid=' + getCache('userid') + '&token=' + getCache('token')
  		this.$emit('getmode',this.form)
  	},
  	changeSelfIframeSrc () {
  		this.iframeSrc = getBaseCardLink() + '/card/custom/' + this.form.badgeCustom + '/index.html'
  		this.$emit('getmode',this.form)
  	},
    getfixAvatarUrl (url) {
      this.form.fixAvatarUrl = url
      this.changeIframeSrc()
    },
    setCardSeting (val) {
      if (val == 0) {
      	this.changeIframeSrc()
      } else if (val == 1) {
      	this.changeSelfIframeSrc()
      }
    }
  }
}
</script>