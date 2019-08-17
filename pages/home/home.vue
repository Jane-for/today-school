<template>
	<view class="bg-white">
		<!-- 头部 -->
		<view class="flex  p-xs margin-bottom-sm mb-sm radius" style="padding-top: 100rpx;">
			<view class="flex-sub padding-sm margin-xs radius">
				<view class="cu-avatar xl padding round margin-left" :style="{backgroundImage:'url('+avatarUrl+')'}"></view>
				<!-- <image class="cu-avatar xl padding round margin-left" :src="avatarUrl" -->
				<!-- mode=""></image> -->
				<view class="padding text-center">{{nickNames}}</view>

			</view>
			<view class="flex-twice padding-sm margin-xs radius">
				<view class="flex">
					<view class="padding" style="margin-right: 0rpx;">我的余额:</view>
					<view class="padding">
						<view class="text-xxl">
							<text class="text-price text-red" style="margin-left: 0rpx;">{{userinfo.userMoney}}</text>
						</view>
						<button class="cu-btn round padding" style="margin-top: 50rpx;" @click="wwxn()">提现</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 菜单 -->
		<!-- 宫格菜单 -->
		<view class="bg-white padding">
			<view class="flex cu-list grid">
				<view class="flex-sub" @click="toAddSquare()">
					<view class="padding align-center">
						<text class="cuIcon-form"></text>
					</view>
					<view class="padding align-center">
						<text>发布任务</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="padding align-center">
						<text class="cuIcon-form"></text>
					</view>
					<view class="padding align-center">
						<text>我的订单</text>
					</view>
				</view>
				<view class="flex-sub" @click="ToMySquare()">
					<view class="padding align-center">
						<text class="cuIcon-form"></text>
					</view>
					<view class="padding align-center">
						<text>我的任务</text>
					</view>
				</view>
				<view v-if="ifPutMer == 0" class="flex-sub" @click="toUserPutMer()">
					<view class="padding align-center">
						<text class="cuIcon-form"></text>
					</view>
					<view class="padding align-center">
						<text>申请店铺</text>
					</view>
				</view>
				<view v-if="ifPutMer == 1" class="flex-sub" @click="toMyMer()">
					<view class="padding align-center">
						<text class="cuIcon-form"></text>
					</view>
					<view class="padding align-center">
						<text>我的店铺</text>
					</view>
				</view>
			</view>
			<!-- 其他功能 -->
			<view class="cu-list menu">
				<view class="cu-bar bg-white" @click="toSite()">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-xl text-bold">管理地址</text>
					</view>
				</view>
				<view class="cu-bar bg-white" @click="toFabuSquare()">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-xl text-bold">我发布的任务</text>
					</view>
				</view>
				<view class="cu-bar bg-white" @click="toAbout()">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						<text class="text-xl text-bold">关于我们</text>
					</view>
				</view>
			</view>
		</view>
		<view class=" text-sm padding  ">
			<text class="text-grey" style="
			height: 200rpx;width: 1000rpx;
            text-align:center;           
            display: table-cell;
            vertical-align:middle">项目一定要写完整</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickNames: '匿名用户',
				avatarUrl: '',
				show: '',
				hidden: '',
				user_token: '',
				userinfo: {
					'userMoney': '888'
				},
				ifPutMer: 0

			}
		},
		onLoad: function(option) {
			this.upNew();
		},
		onPullDownRefresh: function() {
			this.upNew();
		},
		methods: {
			toSite() {
				uni.navigateTo({
					url: '../site/site',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toMyMer() {
				let that = this;				
				uni.request({
					url: that.MerUrl + '/mer/userGetMer',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						var info = res.data.result;
						uni.setStorage({
							key: 'mer_info',
							data: info
						})
						if (info.merSturts == 0) {
							uni.navigateTo({
								url: '../merchant/ifUserPutMer/ifUserPutMer',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
						if (info.merSturts == 1) {
							uni.navigateTo({
								url: '../merchant/merchantAdmin/merchantAdmin',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			upNew() {
				uni.showNavigationBarLoading();
				let that = this;
				that.userinfo = uni.getStorageSync("userinfo");
				that.avatarUrl = uni.getStorageSync("avatarUrl");
				that.nickNames = uni.getStorageSync("nickNames");
				that.user_token = uni.getStorageSync("user_token");
				uni.request({
					url: that.MerUrl + '/mer/ifUserPutMer',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						that.ifPutMer = res.data.result;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					},
					fail: () => {},
					complete: () => {}
				});

			},
			toUserPutMer() {
				uni.navigateTo({
					url: '../merchant/userPutMerchant/userPutMerchant',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			wwxn() {
				uni.showToast({
					title: ':)',
					icon: 'none'
				});
			},
			toFabuSquare() {
				uni.navigateTo({
					url: '../myFabuSquare/myFabuSquare',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toAbout() {
				uni.navigateTo({
					url: '../about/about',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toAddSquare() {
				uni.navigateTo({
					url: '../square/addSquare/addSquare',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			ToMySquare() {
				uni.navigateTo({
					url: '../square/mySquare/mySquare',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}

	}
</script>

</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
