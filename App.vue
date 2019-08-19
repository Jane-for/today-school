<script>
	export default {
		onLaunch: function() {
			
				let that = this;
				uni.login({
					success: function(res) {
						var urlVal = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + "wx44458a2d24c31b15" + '&secret=' +
							"0c57a2c2ddeb08d3d289298684127f4e" +
							'&js_code=' + res.code + '&grant_type=authorization_code';
						uni.request({
							url: urlVal,
							data: {},
							method: 'GET',
							success: function(res) {
								var openid = res.data.openid; //获取到的openid
								console.log("openid###", openid);
								uni.setStorageSync('openid', openid); //存储openid 
								// 获取用户信息
								uni.getUserInfo({
									success: function(res) {
										that._data.nickNames = res.userInfo.nickName;
										that._data.avatarUrl = res.userInfo.avatarUrl;
										console.log(that._data.avatarUrl);									
										uni.setStorage({
											key: 'nickNames',
											data: res.userInfo.nickName
										});
										uni.setStorage({
											key: 'avatarUrl',
											data: res.userInfo.avatarUrl
										});
										//储存用户信息
										uni.request({
											url: that.UserUrl + '/login/addInfo',
											method: 'POST',
											data: {
												"openid": openid,
												"imgUrl": that._data.avatarUrl
											},
											success: res => {
												console.log("res.data: " + JSON.stringify(res.data));
												//获取token
												uni.request({
													url: that.UserUrl + '/login/getToken',
													method: 'POST',
													data: {
														"one": openid,
														"one1": that._data.avatarUrl
													},
													success: res => {
														var token = res.data.result.token;
														that.UserToken = token;
														uni.setStorage({
															key: "user_token",
															data: token,
															success() {
			
															}
														})
														console.log("res.data: " + JSON.stringify(res.data));
														that._data.user_token = res.data.result.token;
														//获取用户余额
														uni.request({
															url: that.UserUrl + '/login/getInfo',
															method: 'POST',
															header: {
																"user_token": token
															},
															data: {},
															success: res => {
																// that._data.userinfo = res.data.result;
																// console.log(that._data.userinfo);														
																uni.setStorage({
																	key: 'userinfo',
																	data: res.data.result
																})
															},
															fail: () => {},
															complete: () => {}
														});
													},
													fail: () => {},
													complete: () => {}
												});
											},
											fail: () => {},
											complete: () => {}
										});
									}
								});
			
							}
						})
			
					}
				});
			
			console.log("初始化完成~");
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";


	/*每个页面公共css */
</style>
