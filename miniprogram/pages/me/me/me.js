// pages/me/me.js
const app = getApp()
const db = wx.cloud.database();
const tables = db.collection("administrator")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName:true,
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取缓存中的用户信息
    var userInfoStorage = wx.getStorageSync('user');
    console.log(userInfoStorage)
    //如果缓存中有用户信息，直接数据绑定
    if (userInfoStorage) {
      this.setData({
        userInfo: userInfoStorage
      })
    }
    var that = this
    tables.get({
      success: res => {
        for(let i = 0;i<res.data.length;i++){
          if (userInfoStorage.nickName == res.data[i].name ){
            this.setData({
              hiddenName:false
            })
          }
        }
      }
    })
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
   * 跳转到审核后台的界面
   */
  goToCheck:function(){
    wx.navigateTo({
      url: '/pages/me/check/check',
    })
  },

  /**
   * 跳转到获取系统信息的界面
   */
  goToDevice: function () {
    wx.navigateTo({
      url: '/pages/me/device/device',
    })
  },
  /**
     * 跳转到关于我们的界面
     */
  goToAbout: function () {
    wx.navigateTo({
      url: '/pages/me/about/about',
    })
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