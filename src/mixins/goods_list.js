import wepy from 'wepy'
export default class extends wepy.mixin {
  config = {
  };

  data = {
    goodsList: []
  };
  cid = ''
  query = ''
  pagenum = 1
  pagesize = 10
  total = 0
  isLoading = false
  onLoad ({ cid = '', query = '' }) {
    this.cid = cid
    this.query = query
    this.getGoodsList()
  }
  async getGoodsList (callback) {
    this.isLoading = true
    const { cid, query, pagenum, pagesize } = this
    const { data: { meta, message } } = await wepy.get('/goods/search', { cid, query, pagenum, pagesize })
    if (meta.status === 200) {
      this.goodsList = this.goodsList.concat(message.goods)
      this.total = message.total
      this.$apply()
    }
    this.isLoading = false
    callback && callback()
  }
  onReachBottom () {
    // 为了防止不必要的请求，先判断是否还有下一页数据
    if (this.goodsList.length < this.total) {
      this.pagenum++
      this.getGoodsList()
    }
  }
  async onPullDownRefresh() {
    // 重置数据
    this.goodsList = []
    this.pagenum = 1
    this.isLoading = false
    // 请求数据
    await this.getGoodsList(() => wepy.stopPullDownRefresh())
  }
  computed = {
    canLoad() {
      return this.goodsList.length < this.total
    }
  }
  methods = {
    goGoodsList(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    }
  };
}
