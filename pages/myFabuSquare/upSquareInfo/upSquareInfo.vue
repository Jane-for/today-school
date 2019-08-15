<template>
	<view>
		<form action="">
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="请输入标题" v-model="old_info.misTilte"></input>
			</view>
			<view class="cu-form-group" style="height: 300rpx;">
				<view class="title">内容</view>
				<!-- <input placeholder="请包含联系方式" v-model="content" type="text"></input> -->
				<!-- <view class="cu-form-group margin-top"> -->
				<textarea maxlength="100" v-model="old_info.misContent" @input="textareaAInput" style="height: 300rpx; padding-top: 50rpx;"
				 placeholder="请包含联系方式"></textarea>
				<!-- </view> -->
			</view>
			<view class="cu-form-group">
				<view class="title">召集人数</view>
				<input placeholder="1人" v-model="old_info.misXuqqnum" type="number"></input>
			</view>



			<view class="cu-form-group">
				<view class="title">价格</view>
				<input placeholder="单位:元/人" v-model="old_info.misMoney"></input>
			</view>


			<view class="text-sm padding">
				<text class="text-grey">#提示:修改信息后请尽快通知你的小伙伴哦~~</text>
			</view>
			<view class="padding flex flex-direction" style="margin-top: 50rpx;">
				<button class="cu-btn bg-red margin-tb-sm lg" style="background: #2486b9;" @tap="showModal" data-target="DialogModal1">更新任务</button>
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
						你确定更新该任务吗吗?
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @click="hide()">取消</button>
							<button class="cu-btn bg-green margin-left" style="background: #2486b9;" @click="yes()">确定</button>

						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateTime1: '2019-00-00',
				dateTime2: '2019-00-00',
				jiui: true,
				yesOrNoName: null,
				user_token: '',
				old_info: {}
			}
		},
		onLoad() {
			let that = this;
			let token = uni.getStorageSync("user_token");
			that.user_token = token;
			that.old_info = uni.getStorageSync("old_info");


		},
		methods: {
			DateChange(e) {
				this.dateTime1 = e.detail.value
			},
			DateChange2(e) {
				this.dateTime2 = e.detail.value
			},
			jiUiSwit(e) {
				this.jiui = e.detail.value
			},
			showModal(e) {
				let that = this;
				if (that.old_info.misTilte.length == 0) {
					uni.showToast({
						title: '标题为空',
						icon: 'none'
					});
				} else {
					if (that.old_info.misContent.length == 0) {
						uni.showToast({
							title: '内容为空',
							icon: 'none'
						});
					} else {
						if (that.old_info.misXuqqnum.length == 0) {
							uni.showToast({
								title: '召集人数为空',
								icon: 'none'
							});
						} else {
							if (that.old_info.misMoney.length == 0) {
								uni.showToast({
									title: '价格为空',
									icon: 'none'
								});
							} else {
								if (!that.jiui) {
									console.log("that.dataTime1: " + that.dateTime1);
								}
								this.yesOrNoName = e.currentTarget.dataset.target
							}
						}
					}
				}


			},

			hide() {
				this.yesOrNoName = null
			},
			yes() {
				let that = this;
				that.yesOrNoName = null;
				if (!that.jiui) {
					console.log("that.dataTime1: " + that.dateTime1);
					uni.request({
						url: that.MisUrl + '/mis/userUpMis',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {
							mission: that.old_info
						},
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.request({
						url: that.MisUrl + '/mis/userUpMis',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: that.old_info,
						success: res => {
							console.log("that.old_info: " + JSON.stringify(that.old_info));
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
