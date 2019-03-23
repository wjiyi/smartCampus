
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
  goToGoodsDetails:function(e){
    var index = e.currentTarget.dataset.postIndex
    var url = '/pages/index/second/goodsDetails/goodsDetails?item=' + JSON.stringify(this.data.goodsList[index])
    wx.navigateTo({url})
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('goods').doc(this.data.goodsList[index]._id).update({
      data:{
        lookNum: _.inc(1)
      },
      success(res) {
        console.log(res.data)
      }
    })
  
  },

  //图片点击放大
  previewImg:function(e){
    var postIndex = e.currentTarget.dataset.index
    var imgIndex = e.currentTarget.dataset.imgIndex
    var goodsImg = this.data.goodsList[postIndex].imageList
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