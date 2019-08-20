<template>
	<view>
		<view class="flex padding align-center">
			<view class="flex-sub radius" style="height: 250rpx; width: 220rpx; 
			background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);
			  background-repeat:no-repeat;
			                background-size:100% 100%;">
			</view>
			<view class="flex-twice" style="padding-left: 20rpx;">
				<view class="">
					<text class="text-black text-bold padding" style="font-size: 50rpx;">
						大卫龙
					</text>
				</view>
				<view class="align-center margin-top">
					<image src="../../static/img_oth/Money.png" style="width: 50rpx; height: 50rpx;" mode=""></image>
					<text class="text-black text-bold padding" style="font-size: 50rpx;">
						100元/份
					</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop" style="position: fixed; bottom: 0; width: 100%;">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view> 店铺
			</button>
			<view class="action" @tap="toShopPage">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur" @click="addToShop()">加入购物车</button>
				<button class="cu-btn bg-red round shadow-blur">立即订购</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			addToShop() {


			},
			toShopPage() {
				uni.navigateTo({
					url: '../shopping/shopping',
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
