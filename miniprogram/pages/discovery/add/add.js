var app = getApp();
var util = require('../../../utils/utils.js')

// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择的图片的临时URL
    chooseFiles: [],
    //文章内容
    content: "",
    //图片文件ID列表
    fileIDList: [],
  },

  /**
   * 发表文章
   */
  addPost: function (event) {
    if (this.data.content === '') {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }
    //交互反馈
    wx.showToast({
      title: '发表成功',
      duration: 1500,
      icon: "suceess",
      mask: true,
      success: function () {
        //要延时执行的代码
        setTimeout(function () {
          //跳转到发现页面
          wx.switchTab({
            url: '../discovery/discovery'
          })
        }, 1500) //延迟时间 
      }
    });

    this.savePost();
  },

  /**
   * 将文章内容保存到数据库
   */
  savePost: function () {
    console.log("将文章插入数据库");
    console.log(this.data.fileIDList);
    var userInfoStorage = wx.getStorageSync('user');
    //将文章插入数据库
    const db = wx.cloud.database();
    db.collection('post').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _openid: app.globalData.openID,
        avatarUrl: userInfoStorage.avatarUrl,
        nickName: userInfoStorage.nickName,
        date: util.formatTime(new Date(), "Y-M-D h:m:s"),
        content: this.data.content,
        imageList: this.data.fileIDList,
        comment: []
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("保存文章成功" + res);
      }
    })
  },

  /**
   * 监听获取文本框的值
   */
  contentInput: function (event) {
    this.data.content = event.detail.value;
  },

  /**
     * 选择本地照片与拍照
     */
  chooseImage: function (event) {
    //已选择图片数组
    var imgArr = this.data.chooseFiles;
    //已上传的图片数组
    var imgIDArr = this.data.fileIDList;
    //只能上传3张图片，包括拍照，leftCount检测已选了多少张图片
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }

    var that = this;
    wx.chooseImage({
      count: leftCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        //可以分次选择图片，但总数不能超过3张
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });

        //将选择的图片上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {

          //图片临时路径
          var tempPath = res.tempFilePaths[i];
          //图片临时路径的长度
          var tempPathLen = tempPath.length;
          //截取临时路径后面一部分作为云存储的图片名字
          var imagePath = tempPath.substring(tempPathLen - 16, tempPathLen);
          // 将图片上传至云存储空间

          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'post/' + imagePath,
            // 指定要上传的文件的小程序临时文件路径
            filePath: tempPath,
            // 成功回调
            success: function (res2) {
              console.log('上传成功', res2.fileID);
              that.setData({
                fileIDList: that.data.fileIDList.concat(res2.fileID)
              })

            },
          })
        }
      },
    })

  },

  /**
   * 删除已经选择的图片
   */
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    var tempFileIDList = this.data.fileIDList[index];
    //删除上传的图片
    wx.cloud.deleteFile({
      fileList: ['' + tempFileIDList],
      success: res => {
        //删除文件ID数组中的文件ID
        this.data.fileIDList.splice(index, 1);
        console.log("删除图片成功" + res.fileList)
      },
      fail: err => {

      }
    })
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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