<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_info: []
			}
		},
		onShow() {
			this.upNew();
		},
		methods: {
			upNew() {
				let that = this;
				that.shop_info = uni.getStorageSync("shop_info");

			}
		}
	}
</script>

<style>

</style>
