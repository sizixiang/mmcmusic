<template>
	<div class="song-list">
		<ul>
			<li v-for="song in songs" class="item">
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
		methods:{
			getDesc(song){
				return `${song.singer}-${song.album}`
			}
		}
	}
</script>

<style>
	.song-list ul li .content h2,.song-list ul li .content p{padding: 0 20px;margin: 0;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	.song-list ul li .content h2{font-size: 14px;font-weight: 400;}
	.song-list ul li .content p{font-size: 12px;color: #919191;padding: 4px 20px;}
	.song-list ul li{text-align: left;padding: 10px 0;}
</style>