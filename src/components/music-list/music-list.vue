<template>
	<div class="music-list">
		<h1 class="title" v-html="title" ref="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgimage">
			<div class="filter"></div>
		</div>
		<scroll :data="songs" :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list" @scroll="scroll">
			<div class="song-list-wrapper">
				<song-list :songs="songs"></song-list>
			</div>
		</scroll>
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
		data(){
			return{
				scrollY: 0
			}
		},
		created(){
			this.listenScroll = true;
			this.probeType = 3;
			this.zIndex = 10;
		},
		mounted(){
			this.bgimageHeight = this.$refs.bgimage.clientHeight;
			this.titleHeight = this.$refs.title.clientHeight;
			this.$refs.list.$el.style.top = `${this.bgimageHeight}`+"px"
			this.tlH_imgH = this.bgimageHeight - this.titleHeight;
		},
		methods:{
			scroll(pos){
				this.scrollY = pos.y;
			}
		},
		computed:{
			bgStyle(){
				return `background-image: url(${this.bgImage})`
			}
		},
		watch:{
			scrollY(newY){
				let scale = 1;
				const percent = Math.abs(newY / this.bgimageHeight)
				if(newY>0){
					scale = 1 + percent
				}
				this.$refs.bgimage.style.transform = `scale(${scale})`
				if(-newY>=this.tlH_imgH){
					this.$refs.bgimage.style.zIndex = `${this.zIndex}`
					this.$refs.bgimage.style.paddingTop = 0;
					this.$refs.bgimage.style.height = `${this.titleHeight}`+"px"
				}else{
					this.$refs.bgimage.style.zIndex = -2
					this.$refs.bgimage.style.paddingTop = 70 + "%";
					this.$refs.bgimage.style.height = 0;
				}
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
	.music-list .title{position: absolute;top: 0;display: block;width: 100%;text-align: center;font-size: 18px;z-index: 99;line-height: 40px;margin: 0;font-weight: 400;}
	.bg-image{width: 100%;height: 0;padding-top: 70%;transform-origin: top;background-size: cover;position: absolute;top: 0;left: 0;}
	.filter{position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(7,17,27,0.4)}
	
	.list{position: fixed;top: 0;bottom: 0;width: 100%;left: 0;}
	.song-list-wrapper{background-color:#000;z-index: -1;padding: 20px 0;}
</style>