<template>
	<!--顶部导航-->
	<div class="tab">
		<ul>
			<li>
				<router-link to="/recommend">
					推荐
				</router-link>
			</li>
			<li>
				<router-link to="/singer">
					歌手
				</router-link>
			</li>
			<li>
				<router-link to="/ranking">
					排行
				</router-link>
			</li>
			<li>
				<router-link to="/grabble">
					搜索
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style>
	.tab ul{display: flex;}
	.tab ul li{flex: 1;list-style: none;text-align: center;}
	.tab ul li a{color: #919191;display: block;margin: 0 28px;padding: 10px 0;}
	.tab ul li a.active{border-bottom: 2px solid #FECC32;color: #FECC32}
</style>