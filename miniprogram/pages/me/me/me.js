// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取缓存中的用户信息
    var userInfoStorage = wx.getStorageSync('user');
    //如果缓存中有用户信息，直接数据绑定
    if (userInfoStorage) {
      this.setData({
        userInfo: userInfoStorage
      })
    }
  },

  /**
   * 跳转到我的动态界面
   */
  goToMyDynamic: function () {
    wx.navigateTo({
      url: '/pages/me/myDynamic/myDynamic',
    })
  },
  /**
   * 跳转到我的帮帮界面
   */
  goToMyHelp:function(){
    wx.navigateTo({
      url: '/pages/me/myHelp/myHelp',
    })
  },

  /**
   * 跳转到获取系统信息的界面
   */
  showSystemInfo: function () {
    wx.navigateTo({
      url: '../device/device',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})