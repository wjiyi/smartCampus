const cloud = require('wx-server-sdk')
cloud.init()

/**
 * 通过文件ID换取图片临时URL
 */
exports.main = async (event, context) => {
  const fileList = event.imageList
  const result = await cloud.getTempFileURL({
    fileList,
  })
  return result.fileList
}