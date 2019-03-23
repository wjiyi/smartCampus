//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
    else {
      //云开发初始化
      wx.cloud.init({
        env: 'wujiyi-6948f6',
        traceUser: true,
      })
      //调用云函数获取openid,并保存在全局变量openid中
      this.getOpenid();
    }
  },

  // 获取用户openid
  getOpenid() {
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getOpenid',
      success(res) {
        console.log('云函数获取到的openid: ', res.result.openId);
        that.globalData.openid = res.result.openId;
      },
      fail: console.error
    })
  },

  /**
     * 全局变量
     */
  globalData: {

    openid: ""
  }
})
