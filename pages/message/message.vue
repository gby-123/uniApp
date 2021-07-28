<template>
	<view>
     <div>{{ banner.title }}</div>
	 <image :src="banner.cover"></image>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			 title: '',
			 banner:{},
			 htmlNodes:[]
			}
		},
		onLoad(event){
		const payload = event.detailDate || event.payload;
	try {
		  this.banner = JSON.parse(decodeURIComponent(payload));
	    } catch (error) {
		  this.banner = JSON.parse(payload);
	    }
		uni.setNavigationBarTitle({
		title: this.banner.title
		});
		this.getDetail();
		console.log(this.banner)
		},
		methods:{
		getDetail() {
		   uniCloud.callFunction({
			  name:"article",
			  data:{
				type:"content",
				id:this.banner._id
			},
			  success: (res) => {
				 
				let d = res.result.data
				 if(d.length){
					  console.log(res)
					// var htmlString = d[0].content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
					// this.htmlNodes = htmlParser(htmlString);
					}
				},
				fail: (err) => {
				console.log(err);
				}
			})			
			}
		}
	}
</script>

<style lang="less">
</style>
