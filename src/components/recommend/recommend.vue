<template>
	<!--推荐列表-->
	<transition name="slider">
		<div class="recommend">
			<scroll ref="scroll" :pullup="pullup" @scrollToEnd="listLoding" class="recommend-content" :data="lodinlist" v-if="show">
				<div ref="listsr">
					<v-slider :slider="slider"></v-slider>
					<h2 class="recom-title-box">热门歌单推荐</h2>
					<div class="music-list-box">
						<ul>
							<template v-for="list in lodinlist">
								<transition name="slider">
									<li class="list-li-box">
										<img v-lazy="list.imgurl" class="list-icon" alt="" />
										<div class="list-name-box">
											<h4>{{list.creator.name}}</h4>
											<span>{{list.dissname}}</span>
										</div>
									</li>
								</transition>
							</template>
							
						</ul>
					</div>
				</div>
			</scroll>
			<v-login v-if="!show"></v-login>
		</div>
	</transition>
</template>

<script>
	import {ERR_OK,LIST_SHOW} from 'api/config'
	import {getRecommend,getDiscList} from 'api/recommend'
	import slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import Login from 'base/lodin/lodin'
	export default {
		data(){
			return{
				slider:{},
				distlist:[],
				show:false,
				lodinlist:[],
				pullup: true
			}
		},
		created(){
			this._getRecommend();
			this._getDiscList();
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code === ERR_OK){
						this.slider = res.data.slider;
						console.log(this.slider);
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					if(res.code === ERR_OK){
						var self = this;
						this.distlist = res.data.list;
						for(var i=0;i<=LIST_SHOW;i++){
							this.lodinlist.push(res.data.list[i])
						}
						console.log(this.lodinlist)
						console.log(this.distlist);
						setTimeout(function(){
							self.show = true;
						},1500)
					}
				})
			},
			listLoding(){
				//上拉加载
				let listcllength = this.distlist.length-this.lodinlist.length;
				for(let i=0;i<listcllength;i++){
					this.lodinlist.push(this.distlist[this.lodinlist.length]);
				}
			}
		},
		components:{
			'v-slider':slider,
			'scroll':Scroll,
			'v-login':Login
		}
	}
</script>

<style scoped="scoped">
	.recommend{width: 100%;z-index: -1;position: fixed;top: 92px;bottom: 0;}
	.recommend-content{height: 100%;overflow: hidden;}
	.recom-title-box{font-size: 15px;font-weight: 600;color: #FECC32}
	.music-list-box ul{position: relative;}
	.music-list-box ul li{display: flex;}
	.list-icon{width: 60px;height: 60px;}
	.list-name-box{flex: 1;text-align: left;padding-left: 15px;display: flex;justify-content: center;flex-direction:column;}
	.list-name-box h4{padding: 0;margin: 0;padding-bottom: 10px;font-weight: initial;font-size: 15px;}
	.list-name-box span{font-size: 12px;color: rgba(255,255,255,0.3);font-size: 14px;}
	.list-li-box{padding: 10px 20px;}
	/*.slider-enter-active, .slider-leave-active {
	  	transition: all .3s ease;
	}
	.slider-enter, .slider-leave-to{
	  	transform: translateX(-200px);
  		opacity: 0;
	}*/
</style>