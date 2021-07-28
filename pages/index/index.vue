<template>
	<view class="container">
		<swiper  circular autoplay interval="3000" class="swiper-banner">
			<swiper-item v-for="(item,index) in imgList" :key="index">
				<image :src="item.img" class="img"></image>
			</swiper-item>
		</swiper>
		<div v-for="(item,index) in listData" :key="index" @click="goDetail(item)">
		 
			<div>{{item.title}}</div>
			<image :src="item.cover"></image>

			
		</div>
		<button @tap="toHome">tohome</button>
		<button @tap="toMessage">to message</button>
		<!-- <view class="">23333333</view>
		<text class="intro">详见：</text>
		<button @tap="toHome">tohome</button>
		<button @tap="toMessage">to message</button>
		<button @click="changeTitle">change </button>
		<uni-link :href="href" :text="href"></uni-link> -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				imgList:[
					{
						img:require("@/static/banner1.png")
					},
					{
						img:require("@/static/banner2.png")
					}
				],
				listData:[],
				activeIndex:1,
				status:"more"
			}
		},
		onLoad(){
		  this.getList()
		},
		// 监听下拉刷新
		onPullDownRefresh() {
		  this.page = 1;
		  this.getList();
			},
		// 触底（上拉加载更多）
	    onReachBottom() {
		    if(this.status !== 'more'){
					return
			}
			this.activeIndex = this.activeIndex + 1
			this.status = 'loading';
			this.getList();
			},
		methods: {
			getList(){
				let activeIndex = this.activeIndex
				uniCloud.callFunction({
					name:"article",
					data:{
						activeIndex,
						limit:3,
						type:"list"
					},
					success:(res) =>{
						let list = res.result.data
						list = this.setTime(list)
						this.listData = activeIndex === 1 ? list : [...this.listData,...list],
						this.status = list.length < 3 ? 'noMore' : 'more'
						 if(activeIndex === 1){
						 uni.stopPullDownRefresh()
						}
						console.log(res.result.data)
					},
					fail: (err) => {
						console.log(err)
					}
				})	
			},
			goDetail(val){
				let detail = {
					title:val.title,
					cover:val.cover,
					_id:val._id
				}
				uni.navigateTo({
					url:"../message/message?detailDate=" + encodeURIComponent(JSON.stringify(detail))
				})
			},
			setTime(items) {
			  let newItems = []
			  items.forEach(val =>{
				  newItems.push({
					title:val.title,
					cover:val.cover,
					_id: val._id
				  })
			  })
			  return newItems;
			},
           toHome(){
			   uni.navigateTo({
			   	url:'home'
			   })
		   },
		   toMessage(){
			   uni.navigateTo({
			   	url:'../message/message'
			   })
		   },
		   changeTitle(){
			   uni.setNavigationBarTitle({
			   	 title:'hahhh'
			   })
		   }
		}
	}
</script>

<style lang="less">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.swiper-banner {
			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>
