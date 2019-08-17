<template>
	<view>
		<view class="box" style="
		position: fixed;
		bottom: 0;
		width: 100%;
	">
			<view class="cu-bar tabbar bg-white">
				<view class="action" @tap="com()">
					<view class="cuIcon-cu-image" v-if="tabNum == 0">
						<image src="/static/tabbar/basics_cur.png"></image>
					</view>
					<view class="cuIcon-cu-image" v-if="tabNum != 0">
						<image src="/static/tabbar/basics.png"></image>
					</view>
					<view :class="tabNum == 0 ? 'text-green': 'text-gray'">商品管理</view>
				</view>
				<view class="action" @tap="comType()">
					<view class="cuIcon-cu-image" v-if="tabNum == 1">
						<image src="/static/tabbar/component_cur.png"></image>
					</view>
					<view class="cuIcon-cu-image" v-if="tabNum != 1">
						<image src="/static/tabbar/component.png"></image>
					</view>
					<view :class="tabNum == 1 ? 'text-green': 'text-gray'">类型管理</view>
				</view>
				<view class="action" @tap="my()">
					<view class="cuIcon-cu-image" v-if="tabNum == 2">
						<image src="/static/tabbar/about_cur.png"></image>
					</view>
					<view class="cuIcon-cu-image" v-if="tabNum != 2">
						<image src="/static/tabbar/about.png"></image>
					</view>
					<view :class="tabNum == 2 ? 'text-green': 'text-gray'">我的</view>
				</view>
			</view>
		</view>

		<view v-if="tabNum == 0">
			<!-- 商品管理 -->
			<!-- <view class="text-center" style="width: 100%;">
				<button class="cu-btn bg-green round lg shadow">添加商品</button>
			</view> -->
			<view v-for="(item,index) in merComList" :key="index">

				<view class="cu-list menu sm-border card-menu margin-top" @click="toNext(11)">
					<view class="cu-item">
						<view class="content">
							<image :src="item.comImgurl" class="png" mode="aspectFit"></image>
							<text class="text-grey">{{item.comName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-top" @click="toNext(11)">
				<view class="cu-item arrow">
					<view class="content">
						<image src="/static/tabbar/basics_cur.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">添加商品</text>
					</view>
				</view>
			</view>
			<view class="text-center margin-top">
				<text class="text-grey">#提示:点击商品名称可以对其修改或删除</text>
			</view>
		</view>
		<view v-if="tabNum == 1">

		</view>
		<view v-if="tabNum == 2">

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token: '',
				tabNum: 0,
				merComList: [],
				merComTypeList: [],
				merInfo: {}
			}
		},
		onPullDownRefresh() {
			this.upNew();
		},
		onLoad() {
			this.upNew();
		},
		methods: {
			toNext(e) {
				console.log("e: " + e);
				//跳转到添加商品页面
				if (e == 11) {
					uni.navigateTo({
						url: 'addCommons/addCommons',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			com() {
				let that = this;
				that.tabNum = 0;
			},
			comType() {
				let that = this;
				that.tabNum = 1;
			},
			my() {
				let that = this;
				that.tabNum = 2;
			},
			upNew() {
				let that = this;
				uni.showNavigationBarLoading();
				that.user_token = uni.getStorageSync("user_token");
				if (that.tabNum == 0) {
					uni.request({
						url: that.MerUrl + '/marcos/get',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							that.merComList = res.data.result;
						},
						fail: () => {},
						complete: () => {}
					});

				}
				if (that.tabNum == 1) {

					uni.request({
						url: that.MerUrl + '/marcos/getType1',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							that.merComTypeList = res.data.result;
						},
						fail: () => {},
						complete: () => {}
					});

				}
				if (that.tabNum == 2) {

				}

				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
			}
		}
	}
</script>

<style>
	.box {}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.box {}
</style>
