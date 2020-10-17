import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    cateList: [],
    activeKey: 0,
    scrollTop: 0
  };
  methods = {
    onSideChange(e) {
      this.activeKey === e.detail || (this.scrollTop = (this.scrollTop - 1) % 2)
      this.activeKey = e.detail
    },
    goGoodsList(cid) {
      wepy.navigateTo({
        url: '/pages/goods_list?cid=' + cid
      })
    }
  };
  computed = {
    secondCate() {
      const item = this.cateList[this.activeKey] || {}

      return item.children
    }
  };
  onLoad() {
    this.getCateList()
  }
  async getCateList() {
    const { data: {meta, message} } = await wepy.get('/categories')
    if (meta.status === 200) {
      this.cateList = message
      this.$apply()
    } else wepy.alert()
  }
}
