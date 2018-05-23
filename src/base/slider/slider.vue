<template>
   <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in slider" >
            	<a :href="str.linkUrl">
            		<img :src="str.picUrl" alt="" />
            	</a>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css';
	var swiper;
	export default{
		props:{
			slider:{}
		},
		created(){
//			this.initSwiper();
		},
		mounted(){
			this.initSwiper();
		},
		methods:{
			initSwiper (){
				this.$nextTick(function(){
					swiper = new Swiper('.swiper-container', {
						autoHeight: true,
					    pagination: { el: ".swiper-pagination"},
			            observer:true,//修改swiper自己或子元素时，自动初始化swiper
		    			observeParents:true,//修改swiper的父元素时，自动初始化swiper
		    			loop: true,
    					autoplay: {
            				disableOnInteraction: false,
        				},
        				on:{
						    slideChange: function(){
//						    	swiper.pagination.render()
//						    	swiper.pagination.update()
						    },
						},
					});
				})
			}
		}
	}
	
</script>

<style>
	.swiper-container{
		width: 100%;
		height: 9.8rem;
	}
	.swiper-wrapper{
		width: 100%;
		height: 100%;
	}
	.swiper-slide{
		background-position: center;
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}
	.swiper-slide img{
		width: 100%;
		height: auto;
		display: inline-block;
		vertical-align: top;
	}
	.swiper-pagination-bullet{
		width: 5px;
		height: 5px;
		background-color: rgba(255,255,255,0.8)
	}
	.swiper-pagination-bullet-active{background-color: #fff;width: 14px;border-radius: 100px;}
</style>