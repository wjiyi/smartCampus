// pages/index/information/information/information.js
const db = wx.cloud.database();
const tables = db.collection("activity")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    //文章数组
    postList: [],
    //文章ID
    postId: null,
    imageList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    tables.orderBy('time', 'desc').where({
      tag: "活动"
    }).get({
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

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if(e.detail.current == 0) {
      tables.orderBy('time', 'desc').where({
        tag: "活动"
      }).get({
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

    }
    else if (e.detail.current == 1) {
      tables.orderBy('time', 'desc').where({
        tag: "讲座"
      }).get({
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

    }
    else {
        tables.orderBy('time', 'desc').where({
          tag: "其他"
        }).get({
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
    if (e.target.dataset.current == 0) {
      tables.orderBy('time', 'desc').where({
        tag: "活动"
      }).get({
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

    }
    else if (e.target.dataset.current == 1) {
      tables.orderBy('time', 'desc').where({
        tag: "讲座"
      }).get({
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

    }
    else {
      tables.orderBy('time', 'desc').where({
        tag: "其他"
      }).get({
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


    }
  },

  goToInformationAdd:function(){
    wx.navigateTo({
      url: '/pages/index/information/informationAdd/informationAdd',
    })
  },

  goToInformationDetail:function(e){
    var index = e.currentTarget.dataset.idx
    var url = '/pages/index/information/informationDetail/informationDetail?item=' + JSON.stringify(this.data.postList[index])
    wx.navigateTo({ url })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('activity').doc(this.data.postList[index]._id).update({
      data: {
        lookNum: _.inc(1)
      },
      success(res) {
        console.log(res.data)
      }
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