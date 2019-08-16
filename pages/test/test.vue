<template>
	<view>
		<view class="flex bg-white radius margin-top"> 
			<view class="flex-twice padding">
				<view class="">
					<text style="font-size: 30rpx;">姓名:</text>asd
				</view>
				<view class="margin-top">
					<text style="font-size: 30rpx;">宿舍号:</text>asd
				</view>
				<view class="margin-top">
					<text style="font-size: 30rpx;">学校:</text>asd
				</view>
				<view class="margin-top">
					<text style="font-size: 30rpx;">联系方式:</text>asd
				</view>
			</view>
			<view class=" flex-sub text-center padding">
			<button class="cu-btn round bg-red  shadow margin-top" @tap="upFalse" data-target="item.id">删除</button>
			<button class="cu-btn round bg-olive  shadow margin-top" @tap="upTrue" data-target="item.id">编辑</button>
				
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

		}
	}
</script>

<style>

</style>
