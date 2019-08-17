<template>
	<view class="bg-white">
		<view class="padding flex ">
			<button class="flex-sub cu-btn bg-red padding-sm margin-xs radius" @click="toAddSquare()">发布任务</button>
			<button class="flex-sub cu-btn bg-blue padding-sm margin-xs radius" @click="toMySquare()">我的任务</button>
		</view>
		<!-- 推荐开始 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">| 置顶任务</text>
				<text class="text-ABC text-blue">TOP</text>
			</view>
		</view>
		<view class="cu-list menu-avatar" v-for="(item,index) in MisList" :key="index">
			<view class="cu-item cur " v-if="item.misTop == 1" @tap="toSquareInfo" :data-id="item">
				<!-- :style="{background: 'url('+hello+')'}" -->
				<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.misTilte}}</view>
						<view v-if="item.misTime1 != null">
							<view class="cu-tag round bg-orange sm">{{item.misTime1}}</view>
						</view>
						<view v-if="item.misTime2 != null">
							<view class="cu-tag round bg-orange sm">{{item.misTime2}}</view>
						</view>

					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.misContent}}

							<text v-if="item.misStruts == 1" class="cuIcon-locationfill text-orange margin-right-xs">招人中</text>
							<text v-if="item.misStruts == 2" class="cuIcon-locationfill text-orange margin-right-xs">进行中</text>
							<text v-if="item.misStruts == 3" class="cuIcon-locationfill text-orange margin-right-xs">已完成</text></view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item.misMoney}}元/天</view>
				</view>

			</view>

		</view>





		<!-- 最新任务 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">| 最新任务</text>
				<text class="text-ABC text-blue">NEW</text>
			</view>
		</view>

		<view class="cu-list menu-avatar" v-for="(item,index) in MisList" :key="index">
			<view class="cu-item cur " v-if="item.misTop == 0" @tap="toSquareInfo" :data-id="item">
				<!-- :style="{background: 'url('+hello+')'}" -->
				<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.misTilte}}</view>
						<view v-if="item.misTime1 != null">
							<view class="cu-tag round bg-orange sm">{{item.misTime1}}</view>
						</view>
						<view v-if="item.misTime2 != null">
							<view class="cu-tag round bg-orange sm">{{item.misTime2}}</view>
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.misContent}}

							<text v-if="item.misStruts == 1" class="cuIcon-locationfill text-orange margin-right-xs">招人中</text>
							<text v-if="item.misStruts == 2" class="cuIcon-locationfill text-orange margin-right-xs">进行中</text>
							<text v-if="item.misStruts == 3" class="cuIcon-locationfill text-orange margin-right-xs">已完成</text></view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item.misMoney}}元/天</view>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token: '',
				MisList: []
			}
		},

		onLoad() {

			uni.showNavigationBarLoading();
			let that = this;
			that.user_token = uni.getStorageSync("user_token");
			uni.request({
				url: that.MisUrl + '/mis/getMisList',
				method: 'POST',
				header: {
					'user_token': that.user_token
				},
				data: {},
				success: res => {
					that.MisList = res.data.result;
					console.log("square###that.MisList: ###" + that.MisList);
					console.log("square###that.MisList: JSON###" + JSON.stringify(that.MisList));
					uni.hideNavigationBarLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onPullDownRefresh: function() {
			this.upNew();
		},
		methods: {
			upNew() {
				uni.showNavigationBarLoading();
				let that = this;
				that.user_token = uni.getStorageSync("user_token");
				uni.request({
					url: that.MisUrl + '/mis/getMisList',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						that.MisList = res.data.result;
						console.log("square###that.MisList: ###" + that.MisList);
						console.log("square###that.MisList: JSON###" + JSON.stringify(that.MisList));
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					},
					fail: () => {},
					complete: () => {}
				});

			},
			toSquareInfo(e) {
				let that = this;
				var item = e.currentTarget.dataset.id;
				console.log(e.currentTarget.dataset.id);
				this.TabCur = e.currentTarget.dataset.id;
				uni.setStorage({
					key: 'square_info',
					data: item
				})
				uni.navigateTo({
					url: 'squareInfo/squareInfo?misId=' + item.misId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toMySquare() {
				uni.navigateTo({
					url: 'mySquare/mySquare',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toAddSquare() {
				uni.navigateTo({
					url: 'addSquare/addSquare',
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
