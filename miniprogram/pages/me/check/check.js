// pages/me/check/check.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    postList: [],
    //文章ID
    imageList: [],
    postId: null,
    hasClick: [],
    buttonName: [],
    buttonNoNme: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    db.collection("activity").orderBy('time', 'desc').get({
      success: res => {
        this.setData({
          postList: res.data
        })
        // console.log(this.postList)
        var buttonNameArr = []
        var buttonNoNmeArr = []
        for (var i = 0; i < this.data.postList.length; i++){
          buttonNameArr.push('通过')
          buttonNoNmeArr.push('不通过')
        }
        this.setData({
          buttonName: buttonNameArr,
          buttonNoNme: buttonNoNmeArr
        })

      },
      fail: err => {
        console.log(err)
      },
      complete: res => {
        console.log(res)
      }
    })

  },

  goToCheckDetails:function(e){
    var index = e.currentTarget.dataset.idx
    console.log(index)
    var url = '/pages/me/checkDetails/checkDetails?item=' + JSON.stringify(this.data.postList[index])
    wx.navigateTo({ url })
    
  },

//点击通过按钮
  pass:function(e){
    var index = e.currentTarget.dataset.index
    var buttonName = 'buttonName[' + index + ']'
    var hasClick = 'hasClick[' + index + ']'
    this.setData({
      [buttonName]:'已通过',
      [hasClick]: true
    })
    console.log('ss',this.data.postList[index]._openid)
    db.collection("passActivity").add({
     data: {
       content: this.data.postList[index].content,
       date: this.data.postList[index].date,
       enddate: this.data.postList[index].enddate,
       imageList: this.data.postList[index].imageList,
       lookNum: this.data.postList[index].lookNum,
       name: this.data.postList[index].name,
       nickName: this.data.postList[index].nickName,
       organization: this.data.postList[index].organization,
       people: this.data.postList[index].people,
       place: this.data.postList[index].place,
       tag: this.data.postList[index].tag,
       time: this.data.postList[index].time,
       url: this.data.postList[index].url,
     }
    })
  },

//点击不通过按钮
  noPass:function(e) {

    var index = e.currentTarget.dataset.index
    var buttonNoName = 'buttonNoName[' + index + ']'
    var hasClick = 'hasClick[' + index + ']'
    this.setData({
      [buttonNoName]: '不通过',
      [hasClick]: true
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