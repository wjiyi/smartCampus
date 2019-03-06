var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse:wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userInfoStorage = wx.getStorageSync('user');
    //如果缓存中有用户信息，那么就跳转到首页，不跳转到登录界面
    if (userInfoStorage) {
      wx.switchTab({
        url: '/pages/index/index/index',
        success: function () {
          console.log("跳转到首页 success")
        },
        fail: function () {
          console.log("跳转到首页 failed")
        },
        complete: function () {
          console.log("跳转到首页 complete")
        }
      });
    }

  },

  /**
 * 判断是否已经授权登录，
 * 如果已经授权了，event.detail.errMsg的值为getUserInfo:ok
 */
  getUserInfomation: function (event) {
    console.log("是否已经获取过用户的信息"+event.detail.errMsg);
    
    //如果已经授权了，则跳转到首页
    if (event.detail.errMsg === 'getUserInfo:ok') {
      this._getUserInfo(event.detail);
      
      this.toIndex();
    }
    else{

    }
    
   
  },

  /**
   * 获取用户信息
   */
  _getUserInfo: function (detail) {
    console.log('执行获取用户信息');
    var userInfoStorage = wx.getStorageSync('user');
    //如果缓存中没有用户信息，那么就获取用户信息
    if (!userInfoStorage) {
      var that = this;
      wx.login({
        success: function (res) {
          //根据openID去判断该用户信息是否在数据库中
          const db = wx.cloud.database();
          db.collection('user').where({
            _openid: app.globalData.openid
          }).get({
            success(dbres) {
              //如果数据库中还没有该用户openID,则保存到数据库中
              if (dbres.data.length == 0) {
                db.collection('user').add({
                  // data 字段表示需新增的 JSON 数据
                  data: {
                    openid: app.globalData.openID,
                    nickName: detail.userInfo.nickName,
                    avatarUrl: detail.userInfo.avatarUrl,
                    province: detail.userInfo.province,
                    city: detail.userInfo.city

                  },
                  success(res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    console.log("用户ID：" + res._id)
                  }
                })
              }
            }
          })
        }
      })   
      //将用户的基本信息保存到缓存中
      wx.setStorageSync('user', detail.userInfo);
    }
    else {
      
    }
  },

  /**
   * 跳转到首页
   */
  toIndex:function(event){
    wx.switchTab({
      url: '/pages/index/index/index',
      success: function () {
        console.log("jump success")
      },
      fail: function () {
        console.log("jump failed")
      },
      complete: function () {
        console.log("jump complete")
      }
    });
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