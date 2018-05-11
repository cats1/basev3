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
				<p>1.{{$t('h4text')}}</p>
				<p>2.{{$t('h5text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.2" vdate="2016-09-19">
			<div>
				<p>1.{{$t('h6text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.1" vdate="2016-07-26">
			<div>
				<p>1.{{$t('h7text')}}</p>
				<p>2.{{$t('h8text')}}</p>
				<p>3.{{$t('h9text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.2.0" vdate="2016-06-25">
			<div>
				<p>1.{{$t('h10text')}}</p>
				<p>2.{{$t('h11text')}}</p>
				<p>3.{{$t('h12text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.9" vdate="2016-06-03">
			<div>
				<p>1.{{$t('h13text')}}</p>
				<p>2.{{$t('h14text')}};</p>
				<p>3.{{$t('h15text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.8" vdate="2016-05-05">
			<div>
				<p>1.{{$t('h16text')}}</p>
				<p>2.{{$t('h17text')}}</p>
				<p>3.{{$t('h18text')}}</p>
				<p>4.{{$t('h188text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.7" vdate="2016-04-06">
			<div>
				<p>1.{{$t('h19text')}}</p>
				<p>2.{{$t('h20text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.6" vdate="2016-03-10">
			<div>
				<p>1.{{$t('h21text')}}</p>
				<p>2.{{$t('h22text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.3" vdate="2016-02-19">
			<div>
				<p>{{$t('h23text')}}</p>
				<p>1.{{$t('h24text')}}</p>
				<p>2.{{$t('h25text')}}</p>
				<p>3.{{$t('h26text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.2" vdate="2016-01-08">
			<div>
				<p>{{$t('h27text')}}</p>
				<p>1.{{$t('h28text')}}; </p>
				<p>2.{{$t('h29text')}}; </p>
				<p>3.{{$t('h30text')}}</p>
				<p>4.{{$t('h31text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.1.1" vdate="2015-12-18">
			<div>
				<p>1.{{$t('h32text')}}</p>
				<p>2.{{$t('h33text')}}</p>
				<!-- <p>1.{{$t('h34text')}} </p> -->
			</div>
		</hsection>
		<hsection vtitle="V1.1.0" vdate="2015-11-21">
			<div>
				
				<p>1.{{$t('h35text')}}</p>
				<p>2.{{$t('h36text')}}</p>
				<p>3.{{$t('h37text')}}</p>
				<p>4.{{$t('h38text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.0.1" vdate="2015-10-20">
			<div>
				
				<p>1.{{$t('h39text')}}</p>
				<p>2.{{$t('h40text')}}</p>
				<p>3.{{$t('h41text')}}</p>
				<p>4.{{$t('h42text')}}</p>
				<p>5、{{$t('h43text')}}</p>
			</div>
		</hsection>
		<hsection vtitle="V1.0.0" vdate="2015-09-20">
			<div>
				<p>2、{{$t('h44text')}}</p>
				<p>3、{{$t('h45text')}}</p>
				<p>4、{{$t('h46text')}}</p>
				<p>5、{{$t('h47text')}}</p>
				<p>5、{{$t('h48text')}}</p>
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