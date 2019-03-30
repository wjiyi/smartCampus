// pages/me/checkDetails/checkDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    item: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取传递过来的值
    var postItem = JSON.parse(options.item)
    this.setData({
      item: postItem
    })

  },

  copy: function (e) {
    console.log(e.target.dataset.url)
    wx.setClipboardData({
      data: e.target.dataset.url,
      success(res) {
        console.log(res.data)
      }
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