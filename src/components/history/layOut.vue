<template>
	<div class="">
		<hsection vtitle="V2.1.0" vdate="2017-09-20" :is-new="true">
			<div>
				<p>1.{{$t('h1text')}}</p>
				<p>2.{{$t('h2text')}}</p>
				<p>3.{{$t('h3text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V2.0.1" vdate="2017-07-03">
			<div>
				<p>1.新增访客与黑名单模块；</p>
				<p>2.新增安全协议设置；</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.2" vdate="2016-09-19">
			<div>
				<p>1.新增会议管理，增加会议室、查看会议室预订记录等功能。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.1" vdate="2016-07-26">
			<div>
				<p>1.员工登录流程优化，员工第一次使用需要激活账户并设置密码；</p>
				<p>2.访客页面增加签到访客、预约访客、邀请访客查看，及当前访客列表搜索功能；</p>
				<p>3.增加批量签出功能。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.0" vdate="2016-06-25">
			<div>
				<p>1.员工专属链接取消，企业员工可获取初始密码直接登录员工专属页面，进行邀请操作；</p>
				<p>2.入住企业登录，多企业服务模式下的子公司均可登录，进入子公司专属页面，查看来访记录；</p>
				<p>3.优化“自定义设置”项页面布局。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.9" vdate="2016-06-03">
			<div>
				<p>1.增加会议管理模式；</p>
				<p>2.增加身份证签退功能，修改完善身份证签到流程和方式;</p>
				<p>3.修改完善搜索导出功能。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.8" vdate="2016-05-05">
			<div>
				<p>1.新增身份证扫码签到；</p>
				<p>2.新增访客验证app客户端；</p>
				<p>3.新增开关配置页面；</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.7" vdate="2016-04-06">
			<div>
				<p>1.新增二维码扫描签到功能；</p>
				<p>2.新增语音通知、电话控制打印功能。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.6" vdate="2016-03-10">
			<div>
				<p>1.页面全新改版</p>
				<p>2.新增账户信息-企业服务模式：多企业服务模式，适用于众创空间、联合办公场所、物业、写字楼等类型企业服务者，可为入驻的企业提供前台形象展示和访客管理服务。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.3" vdate="2016-02-19">
			<div>
				<p>新增充值管理功能</p>
				<p>1.短信超出使用限额时，可以购买不同短信包；</p>
				<p>2.查看短信使用分布情况；</p>
				<p>3.开具购买短信订单发票。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.2" vdate="2016-01-08">
			<div>
				<p>新增预约功能</p>
				<p>1.支持向访客发送预约短信，包含预约详情、交通停车等信息; </p>
				<p>2.员工可根据模板进行编辑，将邀请函发送给预约访客; </p>
				<p>3.访客到访时输入手机后四位，即可快速实现登记。</p>
				<p>4.新增批量预约功能，可通过Excel表格导入多位预约者信息。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.1" vdate="2015-12-18">
			<div>
				<p>1.新增“钉钉”（ 如何配置钉钉 ）通知方式，并支持通过“钉钉”导入员工通讯录； </p>
				<p>2.新增“曾经来过”功能，再次到访的访客只需输入手机号码，即可完成登记。</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.0" vdate="2015-11-21">
			<div>
				<p>1.新增访客贴纸尺寸及更多内容的自定义设置； </p>
				<p>2.新增团队到访功能；</p>
				<p>3.启用全新的来访通logo；</p>
				<p>4.开启短信通知功能；</p>
			</div>
		</hsection>
		<hsection vtitle="V1.0.1" vdate="2015-10-20">
			<div>
				<p>1.新增来访信息搜索功能，支持对“拜访事由”的统计分析；</p>
				<p>2.新增专用账号（ 什么是专用账号 ）编辑功能；</p>
				<p>3.修改了邮件通知功能，可选择默认配置、SMTP或Exchange；</p>
				<p>4.支持将二维码设置为访客头像；</p>
				<p>5.新增设置访客贴文字功能；</p>
			</div>
		</hsection>
		<hsection vtitle="V1.0.0" vdate="2015-09-20">
			<div>
				<p>1、访客页面功能：支持日历查看当天的访客来访信息；</p>
				<p>2、员工页面功能：支持手动添加、RTX或Excel表格导入员工信息，并可进行批量修改；</p>
				<p>3、通知页面功能：提供微信、RTX、邮件三种通知方式，通过开关设置具体接收方式；</p>
				<p>4、自定义设置-企业形象页面：支持企业logo、iPad首屏轮播图、iPad外观颜色及访客头像自定义设置；</p>
				<p>5、自定义设置-访客登记页面：支持访客登记信息自定义设置，可创建输入项及选择项；</p>
			</div>
		</hsection>
    </div>
</template>
<script>
import hsection from './components/hsection'
export default {
  components: {hsection},
  data () {
  	return {
  	  version: 'V2.1.0'
  	}
  }
}
</script>