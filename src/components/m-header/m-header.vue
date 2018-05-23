<template>
	<!--头部-->
	<div class="header">
		<div class="hader-title">
			<i class="icon-mine"></i>
			MMC Music
			<router-link to="/personal">
				<i class="iconfont icon-user">&#xe608;</i>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style>
	.hader-title{color: #fecc32;font-size: 18px;vertical-align: top;padding: 8px 0;line-height: 34px;position: relative;font-weight: lighter;}
	.icon-mine{background: url(logo@2x.png) no-repeat center center;background-size: 30px 30px;width: 30px;height: 30px;display: inline-block;vertical-align: top;padding-right: 6px;}
	.icon-user{font-size: 24px;position: absolute;right: 12px;color: #FECC32}
</style>