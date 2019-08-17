<template>
	<view>
		<view class="cu-form-group">
			<view class="title">商品名称:</view>
			<input placeholder="大卫龙" v-model="comPojo.comName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品类型:</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'商品类型为空'}}
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
			<button class="cu-btn bg-red margin-tb-sm lg" style="background: #2486b9;" @tap="showModal" data-target="DialogModal1">添加商品</button>
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
					你确定添加商品吗?
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
				title: '',
				content: '',
				imgList: [],
				imgNum: 0,
				imgUrl: null,
				user_token: '',
				comPojo:{},
				comImgurl: "", //一下为商品的类型				
				comTop: 0,
				type1Id: 1,				
				typeList:[],
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],

			}
		},
		onLoad() {
			let token = uni.getStorageSync("user_token");
			this.user_token = token;
			console.log("this.user_token: " + this.user_token);
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
				if (that.name.length == 0) {
					uni.showToast({
						title: '名称为空',
						icon: 'none'
					});
				} else {
					if (that.info.length == 0) {
						uni.showToast({
							title: '店铺简介为空',
							icon: 'none'
						});
					} else {
						if (that.phone.length == 0) {
							uni.showToast({
								title: '联系方式为空',
								icon: 'none'
							});
						} else {
							if (that.imgUrl.length == 0) {
								uni.showToast({
									title: '店铺头像不可为空',
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
			addMission() {

			},
			hide() {
				this.yesOrNoName = null
			},
			yes() {
				let that = this;
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
					url: that.MerUrl + '/mer/userPutMer',
					method: 'POST',
					header: {
						'user_token': that.user_token
					},
					data: {
						"phone": that.phone,
						"imgUrl": that.imgUrl,
						"name": that.name,
						"info": that.info
					},
					success: res => {
						let result = res.data.result;
						uni.showToast({
							title: '' + result,
							icon: 'none'
						});
						uni.navigateBack({
							delta: 1
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
