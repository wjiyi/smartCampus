// pages/discovery/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //文章数组
    postList:[],
    //步长
    step:0,
    //是否隐藏评论输入框
    hiddenInput:true,
    //评论内容
    commentInput:"",
    //文章ID
    postId:null,
  },

  /**
   * 跳转到发表动态界面
   */
  addDetial:function(){
    wx.navigateTo({
      url: '/pages/discovery/add/add',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //每次加载三篇文章
    this.getPost(this.data.step);
    //每加载一篇文章，步长就加一，这样就可以在下次读取文章时跳过上一篇
    this.data.step+=3;  
  },

  /**
   * 获取文章然后进行数据绑定
   */
  getPost :function(step){
    var that=this;
    var postList=that.data.postList
    //调用云函数去读取文章(云函数端已经将文件ID换成临时路径)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getPostList',
      // 传递给云函数的参数(num代表读取的数量，step代表步长)
      data: {
        num: 3,
        step: step,
      }
    })
    .then(res => {
      console.log("获取文章成功如下");
      console.log(res);
      that.setData({
        postList : postList.concat(res.result)
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //每次加载三篇文章
    this.getPost(this.data.step);
    //每加载一篇文章，步长就加一，这样就可以在下次读取文章时跳过上一篇
    this.data.step += 3;  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //停止下拉刷新
    wx.stopPullDownRefresh();
    console.log("下拉刷新");
    this.data.postList=[];
    this.data.step=0;
    //每次加载三篇文章
    this.getPost(this.data.step);
    //每加载一篇文章，步长就加一，这样就可以在下次读取文章时跳过上一篇
    this.data.step += 3;  
  },

  /**
   * 提交评论
   */
  submitComment :function(event){
    var that=this;
    //获取用户缓存
    var userInfoStorage = wx.getStorageSync('user');
    //用户名称
    var nickName = userInfoStorage.nickName;
    //评论内容
    var commentInput=that.data.commentInput;
    var comment = { "nickName": nickName, "commentInput": commentInput};
    //调用云函数添加评论
    wx.cloud.callFunction({
      
      name: 'addComment',
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
      //评论完成后下拉刷新
      that.onPullDownRefresh();
    }).catch(err => {
      console.log("添加评论失败");
    })
  },

  /**
   * 获取评论框的值
   */
  bindCommentInput :function(event){
    this.data.commentInput = event.detail.value;
  },

  /**
   * 显示评论输入框
   */
  showInput : function(event){
    var postId = event.currentTarget.dataset.postId;
    this.setData({
      hiddenInput: !this.data.hiddenInput,
      postId : postId,
      commentInput : ""
    })
  },

  /**
   * 隐藏评论输入框
   */
  hiddenInput :function(){
    this.setData({
      hiddenInput: true
    })
  },

  /**
   * 图片预览功能，点击图片放大看
   */
  previewImg : function(event){
    //获取文章序列号
    var postIndex=event.currentTarget.dataset.postIndex;
    //获取图片序列号
    var imgIndex = event.currentTarget.dataset.imgIndex;
    var postImg = this.data.postList[postIndex].imageList;
    var imgs=[];
    for (var i = 0; i < postImg.length;i++ ){
      imgs.push(postImg[i].tempFileURL);
    }
    wx.previewImage({
      current : imgs[imgIndex],
      urls: imgs,
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
    //重新返回后下拉刷新
    this.onPullDownRefresh();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})