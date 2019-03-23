// pages/help/help.js
const db = wx.cloud.database();
const tables = db.collection("helpMessage")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前页面
    currentTab: 0,
    //文章数组
    dataList: [],

    //是否隐藏评论输入框
    hiddenInput: true,
    //评论内容
    commentInput: "",
    //文章ID
    postId: null,
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current == 0) {
      tables.orderBy('date', 'desc').where({
        tag: "失物招领"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else if (e.detail.current == 1) {
      tables.orderBy('date', 'desc').where({
        tag: "借书"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else if (e.detail.current == 2) {
      tables.orderBy('date', 'desc').where({
        tag: "快递代拿"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else {
      tables.orderBy('date', 'desc').where({
        tag: "其他"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
      }
  
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    console.log(e.target.dataset.current)
    if (e.target.dataset.current == 0){
      tables.orderBy('date', 'desc').where({
        tag: "失物招领"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else if(e.target.dataset.current == 1){
      tables.orderBy('date', 'desc').where({
        tag: "借书"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else if (e.target.dataset.current == 2) {
      tables.orderBy('date', 'desc').where({
        tag: "快递代拿"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
    else {
      tables.orderBy('date', 'desc').where({
        tag: "其他"
      }).get({
        success: res => {
          this.setData({
            dataList: res.data
          })
          var temp = res.data
          console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            temp[i].tempImageURL = []
            var tempImageList = res.data[i].imageList;
            console.log('tempImageList:', tempImageList)
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
    }
  
  },

  publish:function(){
    wx.navigateTo({
      url: '/pages/index/help/helpAdd/helpAdd',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tables.orderBy('date', 'desc').where({
      tag: "失物招领"
    }).get({
      success: res => {
        this.setData({
          dataList: res.data
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
            for(var j = 0;j<imgArr.length;j++){
              var oSelected = "dataList[" + i + "].tempImageURL["+j+"]"
              if (imgArr[j].fileID !== ""){
                this.setData({
                  [oSelected]: imgArr[j].tempFileURL
                })
              }
            }
          })
    
        }
      },
      fail:err=>{
        console.log(err)
      },
      complete:res=>{
        console.log(res)
      }
    })
  },

  
  /**
     * 提交评论
     */
  submitComment: function (event) {
    var that = this;
    //获取用户缓存
    var userInfoStorage = wx.getStorageSync('user');
    //用户名称
    var nickName = userInfoStorage.nickName;
    //评论内容
    var commentInput = that.data.commentInput;
    var comment = { "nickName": nickName, "commentInput": commentInput };
    //调用云函数添加评论
    wx.cloud.callFunction({

      name: 'addHelpComment',
      // 传递给云函数的event参数
      data: {
        postId: that.data.postId,
        comment: comment,
      }
    }).then(res => {
      console.log("添加评论成功");
      console.log(res);
      that.setData({
        hiddenInput: true,
        commentInput: ""
      })
      that.onPullDownRefresh();
    }).catch(err => {
      console.log("添加评论失败");
    })
  },

  /**
   * 获取评论框的值
   */
  bindCommentInput: function (event) {
    this.data.commentInput = event.detail.value;
  },

  /**
   * 显示评论输入框
   */
  showInput: function (event) {
    var postId = event.currentTarget.dataset.postId;
    this.setData({
      hiddenInput: !this.data.hiddenInput,
      postId: postId,
      commentInput: ""
    })
  },

  /**
   * 隐藏评论输入框
   */
  hiddenInput: function () {
    this.setData({
      hiddenInput: true
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