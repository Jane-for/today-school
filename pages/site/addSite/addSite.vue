<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">学校</view>
			<input placeholder="请输入学校" v-model="site.othSchool"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">宿舍</view>
			<input placeholder="请输入宿舍号" v-model="site.othSuue" type="number"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input placeholder="请输入宿舍号" v-model="site.othName" type="number"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			<input placeholder="xxxx05180" v-model="site.othPhone" type="number"></input>
		</view>
		<view class="text-sm padding">
			<text class="text-grey">#提示:请认真填写哦~</text>
		</view>
		<view class="padding flex flex-direction" style="margin-top: 50rpx;">
			<button class="cu-btn bg-red margin-tb-sm lg" style="background: #2486b9;" @tap="showModal" data-target="DialogModal1">添加地址</button>
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
					你确定添加地址吗?
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
				user_token: '',
				site: {}
			}
		},
		onLoad() {
			let token = uni.getStorageSync("user_token");
			this.user_token = token;
		},
		methods: {
			showModal(e) {
				let that = this;
				if (that.site.othSchool.length == 0) {
					uni.showToast({
						title: '学校为空',
						icon: 'none'
					});
				} else {
					if (that.site.othSuue.length == 0) {
						uni.showToast({
							title: '宿舍为空',
							icon: 'none'
						});
					} else {
						if (that.site.othName.length == 0) {
							uni.showToast({
								title: '姓名为空',
								icon: 'none'
							});
						} else {
							if (that.site.othPhone.length == 0) {
								uni.showToast({
									title: '联系方式为空',
									icon: 'none'
								});
							} else {
								this.yesOrNoName = e.currentTarget.dataset.target
							}
						}
					}
				}
			},
			hideModal(e) {
				this.yesOrNoName = null
			},
			hide() {
				this.yesOrNoName = null
			},
			yes() {
				let that = this;
				that.yesOrNoName = null;				
				uni.request({
					url: that.MerUrl + '/site/userAddSite',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: that.site,
					success: res => {
						console.log("that.site: " + JSON.stringify(that.site));
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
