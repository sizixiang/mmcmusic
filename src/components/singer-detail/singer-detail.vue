<template>
	<transition name='slide'>
		<div class="singer-detail-box">
			<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail,getSendVkeyInformation} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import MusicList from 'components/music-list/music-list'
	import {createSong} from 'common/js/song'
	export default{
		data(){
			return{
				songs:[]
			}
		},
		computed:{
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created(){
			this._getDetail()
		},
		methods:{
			_getDetail(){
				console.log(this.singer);
				if(!this.singer.id){
					this.$router.push('/singer')
					return;
				}
				getSingerDetail(this.singer.id).then((res)=>{
					if(res.code === ERR_OK){
						this.songs = this._normalizeSongs(res.data.list);
					}
				})
			},
			//对数据进行处理，筛选自己想要的数据
			_normalizeSongs(list){
				let ret = []
				list.forEach((item)=>{
					//es6的解构赋值
					let {musicData} = item
					if(musicData.songid && musicData.albummid){
						ret.push(createSong(musicData))
					}
				})
				console.log(ret)
				return ret
			}
		},
		components:{
			MusicList
		}
	}
</script>

<style>
	.singer-detail-box{position: fixed;top: 0;width: 100%;bottom: 0;background-color: #000}
	.slide-enter-active,.slide-leave-active{transition: all 0.3s}
	.slide-enter,.slide-leave-top{transform: translate3d(100%,0,0);}
</style>