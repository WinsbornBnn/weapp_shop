import wepy from 'wepy'

const BASE_URL = 'https://www.uinav.com/api/public/v1'
// 封装错误提示信息
wepy.alert = (title = '请求失败', isOK = false) => wepy.showToast({ title, icon: isOK ? 'success' : 'none' })

// 基本函数
const request = (partialUrl, data, isPost = false) => wepy.request({url: BASE_URL + partialUrl, data, method: isPost ? 'POST' : 'GET'})

// get请求API
wepy.get = (url, data) => request(url, data)
wepy.post = (url, data) => request(url, data, true)
