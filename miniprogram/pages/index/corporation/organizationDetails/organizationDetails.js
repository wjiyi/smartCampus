// pages/index/corporation/organizationDetails/organizationDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    item: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取传递过来的值
    var postItem = JSON.parse(options.item)
    this.setData({
      item: postItem,
    })

  },

  //图片点击事件
  previewImg: function (event) {
    var src = this.data.item.erweima[0]; //获取data-src
    var imgList = this.data.item.erweima
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表

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