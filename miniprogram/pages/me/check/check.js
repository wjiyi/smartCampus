// pages/me/check/check.js
const db = wx.cloud.database();
const tables = db.collection("activity")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    postList: [],
    //文章ID
    imageList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    tables.orderBy('time', 'desc').get({
      success: res => {
        this.setData({
          postList: res.data
        })
        var temp = res.data
        for (let i = 0; i < temp.length; i++) {
          temp[i].tempImageURL = []
          var tempImageList = res.data[i].imageList;
          if (tempImageList.length == 0) {
            tempImageList = [""]
          }
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'getImageURL',
            data: {
              imageList: tempImageList,
            }
          })
            .then(res => {
              var imgArr = res.result;
              for (var j = 0; j < imgArr.length; j++) {
                var oSelected = "dataList[" + i + "].tempImageURL[" + j + "]"
                if (imgArr[j].fileID !== "") {
                  this.setData({
                    [oSelected]: imgArr[j].tempFileURL
                  })
                }
              }
            })

        }
      },
      fail: err => {
        console.log(err)
      },
      complete: res => {
        console.log(res)
      }
    })

  },

  goToInCheckDetails:function(e){
    var index = e.currentTarget.dataset.idx
    var url = '/pages/me/checkDetails/checkDetails?item=' + JSON.stringify(this.data.postList[index])
    wx.navigateTo({ url })
    
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