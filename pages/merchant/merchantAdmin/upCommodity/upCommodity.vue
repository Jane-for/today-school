<template>
	<view>
		<view class="cu-form-group">
			<view class="title">商品名称:</view>
			<input placeholder="大卫龙" v-model="comPojo.comName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品价格:</view>
			<input placeholder="1.0" v-model="comPojo.comMoney" type="digit"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品类型:</view>
			<picker @change="PickerChange" :value="index" :range="typeList" range-key="type1Name">
				<view v-if="index != -1">
					<view class="picker">
						{{typeList.length == 0 ? '商品类型为空' : typeList[index].type1Name}}
					</view>
				</view>
				<view v-if="index == -1">
					<view class="picker">
						空
					</view>
				</view>
			</picker>
		</view>
		<view class="cu-form-group ">
			<view class="title">商品图片:</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-if="imgNum == 1" @tap="ViewImage" :data-url="imgUrl">
					<image :src="imgUrl" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgNum == 0">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="text-sm padding">
			<text class="text-grey"></text>
		</view>
		<view class="padding flex flex-direction" style="margin-top: 50rpx;">
			<button class="cu-btn bg-red margin-tb-sm lg" style="background: #2486b9;" @tap="showModal" data-target="DialogModal1">提交修改</button>
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
					你确定修改商品吗?
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
				imgList: [],
				imgNum: 0,
				imgUrl: null,
				user_token: '',
				comPojo: {},
				comImgurl: "", //一下为商品的类型				
				comTop: 0,
				type1Id: 1,
				typeList: [],
				index: -1,

			}
		},
		onLoad() {
			let token = uni.getStorageSync("user_token");
			this.user_token = token;
			var old_com =  uni.getStorageSync("old_com");
			this.comPojo = old_com;
			console.log("this.user_token: " + this.user_token);
			uni.request({
				url: this.MerUrl + '/marcos/getType1',
				method: 'POST',
				header: {
					'user_token': this.user_token
				},
				data: {},
				success: res => {
					this.typeList = res.data.result
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			ChooseImage() {
				let that = this;
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.imgUrl = res.tempFilePaths[0];
						that.imgNum = 1;
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgUrl,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgUrl = null;
				that.imgNum = 0;
			},
			showModal(e) {
				let that = this;
				if (that.comPojo.comName.length == 0) {
					uni.showToast({
						title: '商品名称为空',
						icon: 'none'
					});
				} else {
					this.yesOrNoName = e.currentTarget.dataset.target
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
			//这里面添加想商品
			yes() {
				let that = this;
				var index = that.index;
				var typeId = that.typeList[index].id;
				that.comPojo.type1Id = typeId;
				uni.uploadFile({
					url: this.OthUrl + '/upload/singlefile', // 后端api接口
					filePath: this.imgUrl, // uni.chooseImage函数调用后获取的本地文件路劲
					name: 'file', //后端通过'file'获取上传的文件对象				
					header: {
						"Content-Type": "multipart/form-data"
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log('文件上传成功')
						}
					}
				});
				uni.request({
					url: that.MerUrl + '/marcos/userUpCom',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: that.comPojo,
					success: res => {
						let result = res.data.result;
						uni.showToast({
							title: '' + result,
							icon: 'none',
							success() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
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
