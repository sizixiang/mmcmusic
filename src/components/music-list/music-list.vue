<template>
	<div class="music-list">
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle">
			<div class="filter"></div>
		</div>
		<<scroll></scroll>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import SongList from 'base/song-list/song-list'
	export default{
		props:{
			bgImage:{
				type: String,
				default: ''
			},
			songs:{
				type: Array,
				default: []
			},
			title:{
				type: String,
				default: ''
			}
		},
		computed:{
			bgStyle(){
				return `background-image: url(${this.bgImage})`
			}
		},
		components:{
			Scroll,
			SongList
		}
	}
</script>

<style>
	.music-list{position: fixed;top: 0;width: 100%;bottom: 0;background-color: #000}
	.music-list .title{position: absolute;top: 0;display: block;width: 100%;text-align: center;font-size: 18px;z-index: 99;}
	.bg-image{width: 100%;height: 0;padding-top: 70%;transform-origin: top;background-size: cover;}
	.filter{position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(7,17,27,0.4)}
</style>