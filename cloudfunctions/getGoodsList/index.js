// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const goods = await db.collection('goods')
  .orderBy('date','desc')
  .skip(event.step)
  .limit(event.num)
  .get()
  var temp = goods.data;
  for (let i = 0; i < temp.length; i++) {
    var tempImageList = goods.data[i].imageList;
    if (tempImageList.length == 0) {
      tempImageList = [""]
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