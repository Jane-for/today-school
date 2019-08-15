<script>
	export default {
		onLaunch: function() {
			let that = this;

			uni.login({
				success: function(res) {
					console.log(res);
					console.log(res.code);
					var urlVal = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + "wx2dd1e2aa59ad792d" + '&secret=' +
						"c5bf449b752ddc4820693ab9ecd7ab39" +
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

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";


	/*每个页面公共css */
</style>
