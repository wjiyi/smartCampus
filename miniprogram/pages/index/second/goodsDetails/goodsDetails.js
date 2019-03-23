// pages/index/second/goodsDetails/goodsDetails.js
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
    var goodsItem = JSON.parse(options.item)
    this.setData({
      item: goodsItem
    })
  },

  //图片点击放大
  previewImg: function (e) {
    var imgIndex = e.currentTarget.dataset.imgIndex
    var goodsImg = this.data.item.imageList
    var imgs = [];
    for (var i = 0; i < goodsImg.length; i++) {
      imgs.push(goodsImg[i].tempFileURL);
    }
    wx.previewImage({
      current: imgs[imgIndex],
      urls: imgs,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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