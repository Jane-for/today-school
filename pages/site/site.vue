<template>
	<view>
		
		<view v-if="siteList.length == 0" class="text-center" style="margin-top: 500rpx; width: 100%;height: 100%;">
			<view class="text-xl">
				<text class="text-black " style=" margin-top: 1000rpx;">您的订当前的地址为空！</text>
			</view>
		</view>



		<view v-for="item in siteList" :key="item.id">

			<view class="flex bg-white radius margin-top">
				<view class="flex-twice padding">
					<view class="">
						<text style="font-size: 30rpx;">姓名:</text>{{item.othName}}
					</view>
					<view class="margin-top">
						<text style="font-size: 30rpx;">宿舍号:</text>{{item.othSuue}}
					</view>
					<view class="margin-top">
						<text style="font-size: 30rpx;">学校:</text>{{item.othSchool}}
					</view>
					<view class="margin-top">
						<text style="font-size: 30rpx;">联系方式:</text>{{item.othPhone}}
					</view>
				</view>
				<view class=" flex-sub text-center padding">
				<button class="cu-btn round bg-red  shadow margin-top" @tap="upFalse" data-target="item.id">删除</button>
				<button class="cu-btn round bg-olive  shadow margin-top" @tap="upTrue" data-target="item.id">编辑</button>
					
				</view>
				
			</view>

		</view>
		<button class="cu-btn bg-red margin-bottom-sm lg" style="position: fixed;
    bottom: 0;
    width: 100%;" @click="toAddSite()">添加地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token: '',
				siteList: []
			}
		},
		onLoad() {
			this.upNew();
		},
		onPullDownRefresh() {
			this.upNew();
		},
		methods: {
			//初始化页面,单独写的好处是,刷新的时候,可以服用代码
			upNew() {
				let that = this;
				uni.showNavigationBarLoading();
				that.user_token = uni.getStorageSync("user_token");
				uni.request({
					url: that.MerUrl + '/site/get',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						that.siteList = res.data.result
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toAddSite() {
				uni.navigateTo({
					url: 'addSite/addSite',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
