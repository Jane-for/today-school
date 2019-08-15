<template>
	<view>
		<form action="">
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="请输入标题" v-model="title"></input>
			</view>
			<view class="cu-form-group" style="height: 300rpx;">
				<view class="title">内容</view>
				<!-- <input placeholder="请包含联系方式" v-model="content" type="text"></input> -->
				<!-- <view class="cu-form-group margin-top"> -->
					<textarea maxlength="100" v-model="content" style="height: 300rpx; padding-top: 50rpx;" placeholder="请包含联系方式"></textarea>
				<!-- </view> -->
			</view>
			<view class="cu-form-group">
				<view class="title">召集人数</view>
				<input placeholder="1人" v-model="zuqqNum" type="number"></input>
			</view>

			<view v-if="!jiui">
				<view class="cu-form-group">
					<view class="title">开始时间</view>
					<view class="cu-form-group">
						<picker mode="date" :value="dateTime1" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{dateTime1}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">结束时间</view>
					<view class="cu-form-group">
						<picker mode="date" :value="dateTime2" start="2015-09-01" end="2020-09-01" @change="DateChange2">
							<view class="picker">
								{{dateTime2}}
							</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">价格</view>
				<input placeholder="单位:元/人" v-model="money"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					即时任务
				</view>
				<switch class='red' @change="jiUiSwit" :class="jiui?'checked':''" :checked="jiui?true:false" color="#e54d42"></switch>
			</view>

			<view class="text-sm padding">
				<text class="text-grey">#提示:如果你发布的需求时间为某个时间段,
					请关掉即时任务~
					且后期不可修改时间</text>
			</view>
			<view class="padding flex flex-direction" style="margin-top: 50rpx;">
				<button class="cu-btn bg-red margin-tb-sm lg" style="background: #2486b9;" @tap="showModal" data-target="DialogModal1">发布任务</button>
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
						你确定提发布吗?
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
				title: '',
				content: '',
				zuqqNum: '',
				money: '',
				user_token: ''
			}
		},
		onLoad() {
			let token = uni.getStorageSync("user_token");
			this.user_token = token;
			console.log("this.user_token: " + this.user_token);
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
				if (that.title.length == 0) {
					uni.showToast({
						title: '标题为空',
						icon: 'none'
					});
				} else {
					if (that.content.length == 0) {
						uni.showToast({
							title: '内容为空',
							icon: 'none'
						});
					} else {
						if (that.zuqqNum.length == 0) {
							uni.showToast({
								title: '召集人数为空',
								icon: 'none'
							});
						} else {
							if (that.money.length == 0) {
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
			hideModal(e) {
				this.yesOrNoName = null
			},
			addMission() {

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
						url: that.MisUrl + '/mis/userAddMis',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {
							'title': that.title,
							'content': that.content,
							'zuqqNum': that.zuqqNum,
							'money': that.money,
							'jiui': '0',
							'time1': that.dateTime1,
							'time2': that.dateTime2
						},
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.request({
						url: that.MisUrl + '/mis/userAddMis',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {
							'title': that.title,
							'content': that.content,
							'zuqqNum': that.zuqqNum,
							'money': that.money,
							'jiui': '1'
						},
						success: res => {},
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
