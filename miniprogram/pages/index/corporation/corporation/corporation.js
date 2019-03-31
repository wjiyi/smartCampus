// pages/index/corporation/corporation/corporation.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tags: ['全部', '社会公益类', '体育竞技类', '文化艺术类','学术科技类','学习实践类'],
    currentTag: "全部",
    corporationList:[],
    organizationList:[],
    tag:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载组织信息
    db.collection("organization").get({
      success: res => {
        this.setData({
          organizationList:res.data
        })
        console.log('hahh', res.data)
      }
    })

    //加载社团信息
    wx.cloud.init({
      traceUser:true
    })
    wx.cloud.callFunction({
      name:'getCorporationList',
      success: res => {
        this.setData({
          corporationList: res.result.data 
        })
        console.log(res.result.data)
      },
     
    })

  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
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
  },

  //选择标签
  selectTag: function (event) {
    var tag = event.currentTarget.dataset.tag;
    console.log(tag)
    this.setData({
      currentTag: tag
    })
    if (tag == '全部') {
      wx.cloud.init({
        traceUser: true
      })
      wx.cloud.callFunction({
        name: 'getCorporationList',
        success: res => {
          this.setData({
            corporationList: res.result.data
          })
          console.log(res.result.data)
        },

      })

    }
    else if(tag == '社会公益类'){
      db.collection("corporation").where({
        tag:"社会公益类"
      }).get({
        success: res => {
          this.setData({
            corporationList: res.data
          })
        }
      })
    }
    else if (tag == '体育竞技类') {
      db.collection("corporation").where({
        tag: "体育竞技类"
      }).get({
        success: res => {
          this.setData({
            corporationList: res.data
          })
        }
      })
    }
    else if (tag == '文化艺术类') {
      db.collection("corporation").where({
        tag: "文化艺术类"
      }).get({
        success: res => {
          this.setData({
            corporationList: res.data
          })
        }
      })
    }
    else if (tag == '学术科技类') {
      db.collection("corporation").where({
        tag: "学术科技类"
      }).get({
        success: res => {
          this.setData({
            corporationList: res.data
          })
        }
      })
    }
    else{
      db.collection("corporation").where({
        tag: "学习实践类"
      }).get({
        success: res => {
          this.setData({
            corporationList: res.data
          })
        }
      })
    }
 
  },

  goToDetails:function(e){
    var index = e.currentTarget.dataset.idx
    var url = '/pages/index/corporation/corporationDetails/corporationDetails?item=' + JSON.stringify(this.data.corporationList[index])
    wx.navigateTo({
      url
    })
  },

  goToOrganizationDetails:function (e) {
    var index = e.currentTarget.dataset.idx
    var url = '/pages/index/corporation/organizationDetails/organizationDetails?item=' + JSON.stringify(this.data.organizationList[index])
    wx.navigateTo({
      url
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