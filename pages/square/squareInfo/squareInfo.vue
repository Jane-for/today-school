<template>
	<view>
		<view class="padding flex">
			<view class="cu-avatar xl padding round margin-left" :style="{backgroundImage:'url('+info.userImgurl+')'}"></view>
			<view class="padding margin-left">
				任务名称:{{upInfo.misTilte}}
			</view>
		</view>

		<view class="flex padding">
			<view class="padding">
				<text>本次召集人数:{{upInfo.misXuqqnum}}</text>
			</view>
			<view class="padding">
				<text>已经召集人数:{{jpuzNum}}</text>
			</view>
		</view>
		<view class="flex padding">

			<view class="padding" v-if="upInfo.misTime1 != null">
				<text>任务时间:{{upInfo.misTime1}}</text>
				<view class="padding">
					<text>任务佣金:{{upInfo.misMoney}}元/天</text>
				</view>
			</view>
			<view class="padding" v-if="upInfo.misTime2 != null">
				<text>即时任务##任务时间:{{upInfo.misTime1}}</text>
				<view class="padding">
					<text>任务佣金:{{upInfo.misMoney}}元/次</text>
				</view>
			</view>
		</view>

		<view class="flex padding">
			<view class="padding">
				<text>任务介绍</text>
			</view>
			<view class="padding">
				<text>{{upInfo.misContent}}</text>
			</view>

		</view>

		<view class="padding flex" style="margin-top: 200rpx;">

			<!-- <button class="flex-sub cu-btn block line-blue padding-sm margin-xs  radius" disabled>举报任务</button> -->
			<button class="flex-sub cu-btn bg-blue padding-sm margin-xs radius" style="background-color: #2486b9;" @tap="showModal"
			 data-target="DialogModal1">申请任务</button>
		</view>
		<view class="cu-modal" :class="yesOrNoName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">TODAY校园</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你确定申请吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @click="hide()">取消</button>
						<button class="cu-btn bg-green margin-left" style="background: #2486b9;" @click="yes()">确定</button>

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
				yesOrNoName: null,
				misId: '',
				info: '',
				upInfo: '',
				jpuzNum: 0,
				user_token: ''
			}
		},
		onLoad(e) {
			let that = this;
			that.misId = e.misId;
			console.log(e.misId);
			that.user_token = uni.getStorageSync("user_token");
			var info = uni.getStorageSync("square_info")
			that.info = info;
			uni.request({
				url: that.MisUrl + '/mis/getMisById/' + that.misId,
				method: 'POST',
				header: {
					'user_token': that.user_token
				},
				data: {},
				success: res => {
					that.upInfo = res.data.result
					console.log("that.upInfo: " + JSON.stringify(that.upInfo));
					uni.request({
						url: that.MisUrl + '/mis/getJpUzNumByJpUzId/' + that.upInfo.jpuzId,
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							var data = res.data.result;
							that.jpuzNum = data;
							console.log(that.jpuzNum);
						},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
				complete: () => {}
			});


		},
		methods: {

			showModal(e) {
				this.yesOrNoName = e.currentTarget.dataset.target
			},

			hide() {
				this.yesOrNoName = null,
					uni.showToast({
						title: '已取消',
						icon: 'none'
					});
			},
			//发起申请任务
			yes() {
				let that = this;
				that.yesOrNoName = null;
				uni.request({
					url: that.MisUrl + '/jpuz/userPutMis/' + that.upInfo.jpuzId,
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						var flag = res.data.result;
						if (flag == 1) {
							uni.showToast({
								title: '提交成功'
							});
						} else {

						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
