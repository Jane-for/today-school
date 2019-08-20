<template>
	<view class="bg-white" style="margin: 0; padding: 0;">
		<!-- 轮播开始 -->
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-pink"></text> TODAY校园
			</view>
		</view>
		<swiper style="background: #FFFFFF;" class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true"
		 :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in carList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.carImgurl" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 推荐开始 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">| 最火商品</text>
				<text class="text-ABC text-blue">TOP</text>
			</view>
		</view>

		<view class="cu-list menu-avatar">
			<view v-for="(item,index) in comList" :key="index" class="cu-item cur" @click="ing()">
				<view class="cu-avatar radius lg" :style="'background-image:url('+item.comImgurl+');'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.comName}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut"> {{item.comMoney}}元/份
						</view>
					</view>
				</view>
				<view class="action">
					添加
				</view>
			</view>
		</view>
		<!-- 店铺列表 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">| 店铺列表</text>
				<text class="text-ABC text-blue">TOP</text>
			</view>
		</view>

		<view class="cu-list menu-avatar">
			<view v-for="(item,index) in merList" :key="index" class="cu-item cur" @click="ing()">
				<view class="cu-avatar radius lg" :style="'background-image:url('+item.merImgurl+');'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.merName}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut"> {{item.merInfo}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
		</view>
		<!-- 推荐开始 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">| 最新任务</text>
				<text class="text-ABC text-blue">NEW</text>
			</view>
		</view>

		<view class="cu-list menu-avatar" v-for="(item,index) in MisList" :key="index">
			<view class="cu-item cur" @tap="toSquareInfo" :data-id="item">
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
				cardCur: 0,
				carList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				comList: [],
				merList: [],
				MisList: []
			};
		},
		onLoad() {
			this.upNew();
		},
		onPullDownRefresh() {
			this.upNew();
		},
		methods: {
			upNew() {
				let that = this;
				that.UserToken = uni.getStorageSync("user_token");
				uni.showNavigationBarLoading();
				uni.request({
					url: that.OthUrl + '/carousel/getAll',
					method: 'GET',
					data: {},
					success: res => {
						that.carList = res.data.result
					},
					fail: () => {},
					complete: () => {}
				});
				console.log("that.UserToken: " + that.UserToken);
				uni.request({
					url: that.MisUrl + '/mis/getNewList',
					method: 'POST',
					header: {
						'user_token': that.UserToken
					},
					data: {},
					success: res => {
						that.MisList = res.data.result;
					},
					fail: () => {},
					complete: () => {}
				});
				uni.request({
					url: that.MerUrl + '/marcos/getNewCom',
					method: 'POST',
					data: {},
					success: res => {
						that.comList = res.data.result;
					},
					fail: () => {},
					complete: () => {}
				});
				uni.request({
					url: that.MerUrl + '/marcos/getNewMer',
					method: 'POST',
					data: {},
					success: res => {
						that.merList = res.data.result;
					},
					fail: () => {},
					complete: () => {}
				});
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
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
					url: '../square/squareInfo/squareInfo?misId=' + item.misId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			ing() {
				uni.showToast({
					title: '待开发',
					icon: 'none'
				});
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
