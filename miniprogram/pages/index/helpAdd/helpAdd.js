// pages/helpAdd/helpAdd.js
var util = require('../../../utils/utils.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:[],
    tags: ['失物招领', '借书', '快递代拿', '其他'],
    currentTag:"失物招领",
    comment:"",
    img:"",
    tag:"",
    time:"",
    nickname:"",
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

//获取textrea的值
  bindTextAreaInput:function(e){
    // var _this = this;
    this.setData({
      comment: e.detail.value
    })
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


//发布按钮
  send:function(e){
    
    if (this.data.comment === ''){
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }
    //获取缓存信息
    var userInfoStorage = wx.getStorageSync('user');
    //连接数据库
    const db = wx.cloud.database({});
    const tables = db.collection("helpMessage");
    var comment = this.data.comment
    var time = util.formatTime(new Date()); 
    var img = this.data.img_url; 
    var tag = this.data.currentTag;
    var nickname = userInfoStorage.nickName;
    var avatarUrl = userInfoStorage.avatarUrl;
    tables.add({
      data:{
          comment: comment,
          img: img,
          tag: tag,
          time:time,
          nickname:nickname,
          avatarUrl:avatarUrl
      }
      
    })
    //交互反馈
    wx.showToast({
      title: '发表成功',
      duration: 2000,
      icon: "suceess",
      mask: true,
      success: function () {
        //要延时执行的代码
        setTimeout(function () {
          //跳转到发现页面
          wx.redirectTo({
            url: '../help/help'
          })
        }, 2000) //延迟时间 
      }
    });
  },

  selectTag: function(event) {
    var tag = event.currentTarget.dataset.tag;
    this.setData({
      currentTag:tag
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