import wepy from 'wepy'
const HISTORY_KEY = 'SEARCH_LIST'
export default class extends wepy.mixin {
  config = {};

  data = {
    value: '',
    successList: [],
    historyList: []

  };
  time = 0;
  onLoad() {
    this.getHistoryList()
  }
  // 搜索记录
  getHistoryList() {
    this.historyList = wepy.getStorageSync(HISTORY_KEY) || []
  }
  computed = {
    isShowHistory() {
      return !this.value.trim()
    }
  }
  methods = {
    onSearch (query) {
       // 输入关键词 跳转到商品详情列表
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + query
      })
      // wepy.navigateTo({
      //   url: '/pages/goods_list?query=' + this.value.trim()
      // })
      this.historyList = [...new Set([this.value.trim(), ...this.historyList])].slice(0, 10)
      wepy.setStorageSync(HISTORY_KEY, this.historyList)
    },
    onChange (e) {
      clearTimeout(this.time)
      this.value = e.detail
      e.detail.trim() && (this.time = setTimeout(() => this.getSuccessList(), 700))
    },
    onCancel () {
    },
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?id=' + id
      })
    },
    goGoodsList(query) {
      // this.onSearch({query})
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + query
      })
    },
    clearHistory() {
      wepy.setStorageSync(HISTORY_KEY, this.historyList = [])
    }
  };
  async getSuccessList () {
    const query = this.value.trim()
    const { data: { meta, message } } = await wepy.get('/goods/qsearch', { query })
    if (meta.status === 200) {
      this.successList = message
      this.$apply()
    } else wepy.alert()
  }
}
