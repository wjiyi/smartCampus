
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //商品数组
    goodList: [],
    //步长
    step:0,
    imageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //每次加载三篇文章
    this.getGoods(this.data.step);
    //每加载一篇文章，步长就加一，这样就可以在下次读取文章时跳过上一篇
    this.data.step += 3;  

  },

  getGoods:function(step) {
    var that = this;
    var goodsList = this.data.goodList;
    wx.cloud.callFunction({
      name:'getGoodsList',
      data: {
        num: 3,
        step: step,
      }

    })
      .then(res => {
        console.log("获取文章成功如下");
        console.log(res);
        that.setData({
          goodsList: goodsList.concat(res.result),
          
        })
       
      })

  },

//跳转到添加商品信息页
  goToGoodsAdd:function(){
    wx.navigateTo({
      url: '/pages/index/second/goodsAdd/goodsAdd',
    })
  },
  //跳转到商品详情页
  goToGoodsDetails:function(){
    wx.navigateTo({
      url: '/pages/index/second/goodsDetails/goodsDetails',
    })
  },

  //图片点击放大
  previewImg:function(e){
    var index = e.currentTarget.dataset.index
    console.log(this.data.goodsList[0].imageList)
    wx.previewImage({
      current: this.data.goodsList.imageList[index],
      urls: this.data.goodsList.imageList,
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