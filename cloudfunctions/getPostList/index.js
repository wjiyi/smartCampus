// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  //从数据库中读取数据
  const post = await db.collection('post')
    .orderBy('date', 'desc')  //按时间逆序
    .limit(event.num) // 限制返回数量
    .skip(event.step)
    .get()
  const temp = post.data;
  for(let i=0;i<temp.length;i++){
    var tempImageList=post.data[i].imageList;
    if(tempImageList.length==0){
      tempImageList=[""]
    }
    const res = await cloud.callFunction({
      // 要调用的云函数名称
      name: 'getImageURL',
      data: {
        imageList: tempImageList, 
      }
    })
    var tempImageURL = res.result;
    //当没有图片时，将imageList置为空
    if (tempImageURL[0].fileID == "") {
      tempImageURL = null;
    }
    temp[i].imageList = tempImageURL
    
  }
  return temp
}