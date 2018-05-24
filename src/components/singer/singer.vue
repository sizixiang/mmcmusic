<template>
	<div class="singer-box">
		<list-view @select="selectSinger" :data="singer"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import { getSingerList } from "api/singer"
	import { ERR_OK } from "api/config"
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listview'
	//vuex的语法糖
	import {mapMutations} from 'vuex'
	const HOT_NAME = "热门"
	const HOT_SINGER_LENGTH = 10
	export default {
		data() {
			return {
				singer: []
			}
		},
		created() {
			this._getSingerList();
		},
		methods: {
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == ERR_OK) {
						this.singer = this._normalizeSinger(res.data.list);
						console.log(this.singer)
						console.log(this._normalizeSinger(res.data.list));
					}
				})
			},
			_normalizeSinger(list) {
				//map.hot热门
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => {
					//热门的歌手列表
					if(index < HOT_SINGER_LENGTH) {
						map.hot.items.push(
							new Singer({
								id: item.Fsinger_mid,
								name: item.Fsinger_name,
								key: item.Findex
							})
						)
					}
					//这边建立对应的FINDEX对应的下标没有的给添加
					const key = item.Findex
					if(!map[key]){
						map[key]={
							title: key,
							items:[]
						}
					}
					map[key].items.push(
						new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name,
							key: item.Findex
						})
					)
				})
				//为了得到有序列表，我们需要处理map
				let hot = []
				let ret = []
				for (let key in map){
					let val = map[key]
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val);
					}else if(val.title === HOT_NAME){
						hot.push(val);
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			},
			selectSinger(singer){
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer);
				//this.setSinger(singer) = this.$store.commit('SET_SINGER', singer)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
			
		},
		components:{
			ListView
		}
	}
</script>

<style>

</style>