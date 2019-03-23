/**
 * 通过文章ID将评论内容添加到comment数组后面
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('post').where({
      _id: event.postId
    })
      .update({
        data: {
          comment: _.push(event.comment)
        },
      })
  } catch (e) {
    console.error(e)
  }
}