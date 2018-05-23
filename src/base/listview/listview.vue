<template>
	<transition name="slider">
		<div class="listview">
			<scroll :data="data" :probeType="probeType" v-if="show" class="listview-content" ref="listview" :listenScroll="listenScroll" @scroll="scroll">
				<div>
					<ul>
						<li v-for="group in data" class="list-grounp" ref="listgroup">
							<h2 class="list-group-title">{{group.title}}</h2>
							<ul>
								<li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
									<img v-lazy="item.avatar" alt="" />
									<span class='name'>{{item.name}}</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				
			</scroll>
			<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
				<ul>
					<li v-for="(item,index) in shortcutList" class="itemscort" :data-index="index" :class="{'current':currentIndex==index}">
						{{item}}
					</li>
				</ul>
			</div>
			<div class="list-fixed" v-show="fixedTitle" ref="fixed">
				<h2 class="fixed-title">{{fixedTitle}}</h2>
			</div>
			<v-login v-if="!show"></v-login>
		</div>
	</transition>
</template>

<script>
	import Scroll from '../scroll/scroll'
	import Login from 'base/lodin/lodin'
	import {getData} from 'common/js/dom'
	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30
	export default{
		props:{
			data: {
				type: Array,
				default:null
			}
		},
		data(){
			return{
				//加载动画
				show: false,
				//初始滚动值
				scrollYe: -1,
				//初始元素下标
				currentIndex: 0,
				//列表高度数组初始值
				listHeight: [],
				//固定标题
				diff:[],
			}
		},
		created(){
			//初始touch手指对象
			this.touch = {}
			//设置better-scroll的滚动监听为打开状态
			this.listenScroll = true
			this.probeType = 3
		},
		methods:{
			//列表点击事件
			selectItem(item){
				this.$emit('select',item)
			},
			//手指点击事件触发函数
			onShortcutTouchStart(e){
				//获取当前点击元素的属性的值、关联dom.js
				let anchorIndex = getData(e.target,'index')
				//初始点击位置
				let firstTouch = e.touches[0]
				//获取初始点击手指所在位置的Y轴
				this.touch.y1=firstTouch.pageY;
				//将获取到的当前点击元素的属性的值赋值给touch.anchorIndex
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex);
			},
			//手指移动事件触发函数
			onShortcutTouchMove(e){
				//获取当前手指所在的位置
				let firstTouch = e.touches[0]
				//获取当前手指所在位置的Y轴
				this.touch.y2=firstTouch.pageY
				//当前手指所在位置的Y轴 - 初始点击手指所在位置的Y轴 = 偏差
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT|0;
				//获取当前需要滚动的下标
				let anchorIndex = parseInt(this.touch.anchorIndex) + parseInt(delta)
				this._scrollTo(anchorIndex);
			},
			//滚动到指定下标位置的方法，统一滚动方法
			_scrollTo(index){
				//判断当前下标的值是否为null或者不等于0
				if(!index && index !== 0){
					return
				}
				//判断当前下标的值是否小于0是便初始化index
				if(index<0){
					index = 0;
				}
				else if(index>this.listHeight.length-2){
					index = this.listHeight.length-2
				}
				//设置当前下标滚动的距离从而引起数据改变触发scrollYe事件函数
				this.scrollYe = -this.listHeight[index]
				
				this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)
			},
			//获取每个li元素距离顶部的高度
			_calculateHeight(){
				//获取ref 名为listgroup元素的DOM节点
				const list = this.$refs.listgroup
				//设置初始默认距离顶部高度为0
				let height = 0
				//给listHeight数组添加每个listgroup的高度数据
				this.listHeight.push(height)
				
				//遍历list节点
				for(let i = 0;i < list.length;i++){
					//将每个list节点赋值给item
					let item = list[i]
					//获取当前item节点的高度叠加赋值给height变量
					height += item.clientHeight
					//每遍历一次将listHieght数组末尾添加height的值
					this.listHeight.push(height)
				}
			},
			//better-scroll滚动监听监听当前滚动Y轴的距离
			scroll(pos){
				this.scrollYe = pos.y
			}
		},
		watch:{
			//当data数据发生变化是执行的方法
			data(){
				//因为当前有一个加载动画设置时间喂800毫秒所以当前执行方法延迟执行时间为900毫秒
				//小于或者等于800毫秒将会获取不到DOM节点数据，会报错
				setTimeout(()=>{
					this._calculateHeight()
				},900)
			},
			scrollYe(newY){
				const listHeight = this.listHeight
				//当滚动到顶部，newY>0
				if(newY>0){
					this.currentIndex = 0
					return
				}
				//在中间部分滚动
				for(let i=0;i<listHeight.length;i++){
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(!height2||(-newY >= height1 && -newY < height2)){
						this.currentIndex = i
						//滚动距离的偏差
						this.diff = height2 + newY
						return
					}
				}
				//在底部部分滚动，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
			},
			//当diff数据发生变化时触发
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
				fixedTop = parseInt(fixedTop)
		        if (this.fixedTop === fixedTop) {
		          return
		        }
		        this.fixedTop = fixedTop
		        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
		},
		computed:{
			shortcutList(){
				if(this.data.length!=0){ 
					setTimeout(()=>{
						this.show = true;	
					},800)
					return this.data.map((group)=>{
						return group.title.substr(0, 1)
					})
				}
			},
			fixedTitle(){
				if(this.scrollYe>0){
					return ''
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
			}
		},
		components:{
			Scroll,
			'v-login':Login
		}
	}
</script>

<style>
	.listview{width: 100%;position: fixed;top: 92px;bottom: 0;z-index: -1;}
	.listview-content{height: 100%;overflow: hidden;}
	.list-group-title{margin: 0;padding: 5px 15px;height: 20px;line-height: 20px;font-size: 12px;text-align: left;font-weight: 400;background-color:#333;color: #919191}
	.list-group-item{text-align: left;padding: 20px 0 0 30px;font-size: 14px;color: #919191}
	.list-grounp{padding-bottom: 20px}
	.list-group-item img{display: inline-block;width: 50px;height: 50px;vertical-align: middle;border-radius: 50%;}
	.list-group-item .name{padding-left: 20px;}
	.list-shortcut{position: absolute;right: 0;top: 50%;transform: translateY(-50%);font-size: 12px;color: #919191;background-color: #333;}
	.list-shortcut ul li{list-style: none;padding: 2px 3px;}
	.current{color: #FECC32}
	.list-fixed{position: absolute;top: 0;left: 0;width: 100%;background-color: #333;color: #919191;}
	.list-fixed h2{margin: 0;height: 20px;line-height: 20px;padding: 5px 15px;font-size: 12px;text-align: left;font-weight: 400;}
	/*.slider-enter-active, .slider-leave-active {
	  	transition: all .3s ease;
	}
	.slider-enter, .slider-leave-to{
	  	transform: translateX(-200px);
  		opacity: 0;
	}*/
</style>