// pages/helpAdd/helpAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    img_url:[],
    parameter: [{ id: 1, name: '失物招领' }, { id: 2, name: '借书' }, { id: 3, name: '快递代领' }, { id: 4, name: '其他' }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.parameter[0].checked = true;
    this.setData({
      parameter: this.data.parameter,
    })//默认parameter数组的第一个对象是选中的

  },

  //选择照片
  chooseimage: function (options) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        if (res.tempFilePaths.length > 0) {
          //图满一张后不显示加号
          if (res.tempFilePaths.length == 1) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }
          let img_url = that.data.img_url;
          img_url.push(res.tempFilePaths);
          that.setData({
            img_url: img_url
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 参数点击响应事件
  parameterTap: function (e) {//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else {
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList
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