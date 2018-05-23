<template>
	<transition name='slide'>
		<div class="singer-detail-box">
			
			
		</div>
	</transition>
</template>

<script>
	
</script>

<style>
	.singer-detail-box{position: fixed;top: 0;width: 100%;bottom: 0;background-color: #000}
	.slide-enter-active,.slide-leave-active{transition: all 0.3s}
	.slide-enter,.slide-leave-top{transform: translate3d(100%,0,0);}
</style>