<template>
	<view>
		<view class="box">
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

		<view v-if="tabNum == 0">商品管理</view>
		<view v-if="tabNum == 1">类型管理</view>
		<view v-if="tabNum == 2">我的</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabNum: 0
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style>
	.box {}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.box {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
