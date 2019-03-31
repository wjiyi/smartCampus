//index.js
const app = getApp()
const db = wx.cloud.database();
const tables = db.collection("passActivity")

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    //文章数组
    postList: [],
    //文章ID
    postId: null,
    imageList: []
  },

  goToHelp:function(){
    wx.navigateTo({
      url: '/pages/index/help/help/help',
    })
  },

  goToInformation:function(){
    wx.navigateTo({
      url: '/pages/index/information/information/information',
    })
  },

  goToSecond:function(){
    wx.navigateTo({
      url: '/pages/index/second/second/second',
    })
  },

  goToCorporation:function(){
    wx.navigateTo({
      url: '/pages/index/corporation/corporation/corporation',
    })
  },

  goToSchool:function(){
    wx.navigateTo({
      url: '/pages/index/school/school/school',
    })
  },

  goToMore:function(){
    wx.navigateTo({
      url: '/pages/index/more/more',
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
this.load()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  load:function(){

    tables.orderBy('lookNum', 'desc').limit(3).get({
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

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  goToInformation:function(){
    wx.navigateTo({
      url: '/pages/index/information/information/information',
    })
  },

//跳转到活动详情页
  goToInformationDetail: function (e) {
    var index = e.currentTarget.dataset.idx
    var url = '/pages/index/information/informationDetail/informationDetail?item=' + JSON.stringify(this.data.postList[index])
    wx.navigateTo({ url })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('passActivity').doc(this.data.postList[index]._id).update({
      data: {
        lookNum: _.inc(1)
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

  onShow(){
    this.onPullDownRefresh()
  },
  onPullDownRefresh:function(){
    this.load()
  }

})
