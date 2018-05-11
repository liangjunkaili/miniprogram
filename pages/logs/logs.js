//logs.js
const util = require('../../utils/util.js')

var tempFilePaths = ['1'];
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  cancel:function(){
    requestTask.abort() // 取消请求任务
    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
    uploadTask.abort() // 取消上传任务
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })

    downloadTask.abort() // 取消下载任务
  }
})
const requestTask = wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  method: 'POST',
  dataType: 'json',
  responseType: 'text',
  success: function (res) {
    console.log(res.data);
    console.log(res.statusCode);
    console.log(res.header);
  },
  fail: function () {

  },
  complete: function () {

  }
})
const uploadTask = wx.uploadFile({
  url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
  filePath: tempFilePaths[0],
  name: 'file',
  formData: {
    'user': 'test'
  },
  success: function (res) {
    var data = res.data
    //do something
  }
})
const downloadTask = wx.downloadFile({
  url: 'http://example.com/audio/123', //仅为示例，并非真实的资源
  success: function (res) {
    wx.playVoice({
      filePath: res.tempFilePath
    })
  }
})
