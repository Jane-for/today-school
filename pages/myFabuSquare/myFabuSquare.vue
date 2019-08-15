<template>
	<view>
		<scroll-view scroll-x class="bg-white nav text-center">

			<view class="cu-item" :class="-1==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="-1">
				全部
			</view>
			<view class="cu-item" :class="0==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="0">
				处理申请
			</view>
			<view class="cu-item" :class="1==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="1">
				进行中
			</view>
			<view class="cu-item" :class="2==TabCur?'text-blue cur':''" @tap="tab_02" :data-id="2">
				已完成
			</view>
		</scroll-view>

		<view v-if="-1==TabCur">
			<view class="cu-list menu-avatar" v-for="(item,index) in myfabuInfo" :key="index">
				<view class="cu-item" @tap="toUpSquareInfo" :data-id="item">
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
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.misMoney}}元/天</view>
					</view>
				</view>

			</view>

		</view>
		<view v-if="TabCur==0">
			<view class="cu-list menu-avatar" v-for="(item,index) in iuliInfo" :key="index">
				<view class="cu-item" @tap="toUserInfo" :data-id="item">
					<view class="cu-avatar radius lg" :style="{backgroundImage: 'url('+item.userImgurl+')'}">
						<view class="cu-tag badge"></view>
					</view>
					<view class="content">
						<view>
							<view class="text-cut">{{item.misTilte}}</view>
							<view v-if="item.jpuzTime != null">
								<view class="cu-tag round bg-orange sm">{{item.jpuzTime}}</view>
							</view>
						</view>
					</view>

					<button class="cu-btn round bg-red  shadow" @tap="upFalse" :data-target="item.id">拒绝</button>
					<button class="cu-btn round bg-olive  shadow" @tap="upTrue" :data-target="item.id">同意</button>

				</view>

			</view>

			<view style="width: 100%;height: 1000px;text-align: center;" class="text-sm padding" v-if="myfabuInfo.length == 0 ||  myfabuInfo==null">
				<text class="text-grey">暂时没有可以处理的请求~~</text>
			</view>
		</view>
		<view v-if="TabCur==1">
			<view class="cu-list menu-avatar" v-for="(item,index) in myfabuInfo" :key="index">
				<view class="cu-item" @tap="toUpSquareInfo" :data-id="item">
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
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.misMoney}}元/天</view>
					</view>
				</view>

			</view>
			<view class="text-sm padding">
				<text class="text-grey">小伙伴们已经在加油了哦~~</text>
			</view>

		</view>
		<view v-if="TabCur==2">
			<view class="cu-list menu-avatar" v-for="(item,index) in myfabuInfo" :key="index">
				<view class="cu-item" @tap="toUpSquareInfo" :data-id="item">
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
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.misMoney}}元/天</view>
					</view>
				</view>

			</view>
		</view>

		<view class="cu-modal" :class="yesOrNoName!='-2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">TODAY校园</view>
					<view class="action" @click="hide()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{dlaInfo}}
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
				user_token: '',
				TabCur: -1,
				scrollLeft: 0,
				MisList: [],
				myfabuInfo: [], //我发布的信息
				iuliInfo: [], //待处理的信息
				yesOrNoName: -2,
				dlaInfo: '', //弹窗信息
				jpuzId: -9 //

			};
		},
		onLoad() {
			let that = this;
			that.user_token = uni.getStorageSync("user_token");
			uni.request({
				url: that.MisUrl + '/jpuz/userGetFaBuMisList',
				method: 'POST',
				header: {
					'user_token': that.user_token
				},
				data: {},
				success: res => {
					that.myfabuInfo = res.data.result
				},
				fail: () => {},
				complete: () => {}
			});
			// uni.request({
			// 	url: that.MisUrl + '/mis/getJpUzNumByJpUzId/1',
			// 	method: 'GET',
			// 	data: {},
			// 	success: res => {},
			// 	fail: () => {},
			// 	complete: () => {}
			// });

		},
		methods: {
			hide() {
				this.yesOrNoName = -2
			},
			//拒绝
			upFalse(e) {
				let that = this;
				that.dlaInfo = "你确定要拒绝吗???????????";
				that.jpuzId = e.currentTarget.dataset.target;
				that.yesOrNoName = e.currentTarget.dataset.target;
			},
			//确定拒绝
			yes() {
				let that = this;
				uni.request({
					url: that.MisUrl + '/uar/userUpMis/-1/' + that.jpuzId,
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {
						uni.showToast({
							title: '已拒绝.'
						});
					},
					fail: () => {},
					complete: () => {}
				});
				this.yesOrNoName = -2
			},
			//同意
			upTrue(e) {
				let that = this;
				that.jpuzId = e.currentTarget.dataset.target;
				uni.request({
					url: that.MisUrl + '/uar/userUpMis/1/' + that.jpuzId,
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {},
					success: res => {

						uni.showToast({
							title: '已同意.'
						});

						uni.request({
							url: that.MisUrl + '/uar/userUpMisType/' + 0,
							method: 'POST',
							header: {
								'user_token': that.user_token
							},
							data: {},
							success: res => {
								that.iuliInfo = res.data.result
							},
							fail: () => {},
							complete: () => {}
						});

					},
					fail: () => {},
					complete: () => {}
				});
			},
			//跳转到任务详细信息页面
			toUpSquareInfo(e) {
				var item = e.currentTarget.dataset.id;
				uni.setStorage({
					key: 'old_info',
					data: item
				})
				uni.navigateTo({
					url: 'upSquareInfo/?misId=' + item.misId,
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
						url: that.MisUrl + '/jpuz/userGetFaBuMisList',
						method: 'POST',
						header: {
							'user_token': that.user_token
						},
						data: {},
						success: res => {
							that.myfabuInfo = res.data.result
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					if (id == 0) {
						uni.request({
							url: that.MisUrl + '/uar/userUpMisType/' + 0,
							method: 'POST',
							header: {
								'user_token': that.user_token
							},
							data: {},
							success: res => {
								that.iuliInfo = res.data.result
							},
							fail: () => {},
							complete: () => {}
						});
					} else {
						uni.request({
							url: that.MisUrl + '/jpuz/userGetFaBuMisList/' + id,
							method: 'POST',
							header: {
								'user_token': that.user_token
							},
							data: {},
							success: res => {
								that.myfabuInfo = res.data.result
							},
							fail: () => {},
							complete: () => {}
						});
					}

				}


			}
		}
	}
</script>

<style>

</style>
