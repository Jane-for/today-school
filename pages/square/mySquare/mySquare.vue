<template>
	<view>
		<scroll-view scroll-x class="bg-white nav text-center">

			<view class="cu-item" :class="-1==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="-1">
				全部
			</view>
			<view class="cu-item" :class="0==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="0">
				申请中
			</view>
			<view class="cu-item" :class="1==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="1">
				进行中
			</view>
			<view class="cu-item" :class="2==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="2">
				已完成
			</view>
		</scroll-view>

		<view v-if="-1==TabCur">
			<view class="cu-list menu-avatar" v-for="(item,index) in jpuz_info" :key="index">
				<view class="cu-item cur " @tap="toSquareInfo" :data-id="item">
					<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
						<!-- <view class="cu-tag badge"></view> -->
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
		<view v-if="TabCur==0">
			<view class="cu-list menu-avatar" v-for="(item,index) in jpuz_info" :key="index">
				<view class="cu-item cur " @tap="toSquareInfo" :data-id="item">
					<!-- :style="{background: 'url('+hello+')'}" -->
					<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
						<!-- <view class="cu-tag badge"></view> -->
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
		<view v-if="TabCur==1">

			<view class="cu-list menu-avatar" v-for="(item,index) in jpuz_info" :key="index">
				<view class="cu-item cur " @tap="toSquareInfo" :data-id="item">
					<!-- :style="{background: 'url('+hello+')'}" -->
					<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
						<!-- <view class="cu-tag badge"></view> -->
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
			<view class="text-sm padding">
				<text class="text-grey">尽快完成任务哦~</text>
			</view>
		
		</view>
		<view v-if="TabCur==2">

			<view class="cu-list menu-avatar" v-for="(item,index) in jpuz_info" :key="index">
				<view class="cu-item cur " @tap="toSquareInfo" :data-id="item">
					<!-- :style="{background: 'url('+hello+')'}" -->
					<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
						<!-- <view class="cu-tag badge"></view> -->
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token: '',
				TabCur: -1,
				scrollLeft: 0,
				jpuz_info: [],
				MisList: []

			};
		},
		onLoad() {
			let that = this;
			that.user_token = uni.getStorageSync("user_token");
			uni.request({
				url: that.MisUrl + '/jpuz/userGetMis',
				method: 'POST',
				header: {
					'user_token': that.user_token
				},
				data: {},
				success: res => {
					that.jpuz_info = res.data.result
				},
				fail: () => {},
				complete: () => {}
			});

		},
		methods: {
			toSquareInfo(e) {
				let that = this;
				var item = e.currentTarget.dataset.id;
				console.log(e.currentTarget.dataset.id);
				uni.setStorage({
					key: 'square_info',
					data: item
				})
				uni.navigateTo({
					url: 'mySquareInfo/mySquareInfo?misId=' + item.misId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tab_02(e) {
				let that = this;
				console.log(e.currentTarget.dataset.id);
				this.TabCur = e.currentTarget.dataset.id;
				var id = that.TabCur

				if (id == -1) {
					uni.request({
						url: that.MisUrl + '/jpuz/userGetMis',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							that.jpuz_info = res.data.result
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.request({
						url: that.MisUrl + '/jpuz/userGetMis/' + id,
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							that.jpuz_info = res.data.result
						},
						fail: () => {},
						complete: () => {}
					});
				}


			}
		}
	}
</script>

<style>

</style>
