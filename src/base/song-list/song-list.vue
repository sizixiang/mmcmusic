<template>
	<div class="song-list">
		<ul>
			<li v-for="song in songs" class="item">
				<div class="song-image-box">
					<img :src="song.image" :onerror='logo' alt="" />
				</div>
				<div class="content">
					<h2 class="name">{{song.name}}</h2>
					<p class="desc">{{getDesc(song)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			songs:{
				type: Array,
				default:[]
			}
		},
		data(){
			return {
				logo: 'this.src="'+require('../../common/image/010d2c58c3fb40a801219c77c8b1c9.gif')+'"'
			}
		},
		methods:{
			getDesc(song){
				return `${song.singer}-${song.album}`
			}
		}
	}
</script>

<style>
	.song-list ul li .content h2,.song-list ul li .content p{margin: 0;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	.song-list ul li .content h2{font-size: 14px;font-weight: 400;padding: 4px 10px;}
	.song-list ul li .content p{font-size: 12px;color: #919191;padding: 4px 10px;}
	.song-list ul li.item{text-align: left;padding: 10px 20px;display: flex;}
	.song-list ul li.item .song-image-box img{width: 44px;height: 44px;}
	.song-list ul li .content{flex: 1;overflow: hidden;}
</style>