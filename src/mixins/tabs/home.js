import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    swiperList: [],
    categoryList: [],
    floorList: []
  };

  onLoad() {
    this.getData('/home/swiperdata', 'swiperList')
    this.getData('/home/catitems', 'categoryList')
    this.getData('/home/floordata', 'floorList')
  }
  async getData(url, dataName) {
    const { data: {meta, message} } = await wepy.get(url)
    if (meta.status === 200) {
      this[dataName] = message
      this.$apply()
    } else wepy.alert()
  }
/**
// 获取轮播图
  async getSwiperList() {
    const { data: {meta, message} } = await wepy.get('/home/swiperdata')
    if (meta.status === 200) {
      this.swiperList = message
      this.$apply()
    } else wepy.alert()
  }
  // 获取分类
  async getCategoryList() {
    const { data: {meta, message} } = await wepy.get('/home/catitems')
    if (meta.status === 200) {
      this.categoryList = message
      this.$apply()
    } else wepy.alert()
  }
  // 获取楼层信息
  async getFloorList() {
    const { data: {meta, message} } = await wepy.get('/home/floordata')
    if (meta.status === 200) {
      this.floorList = message
      this.$apply()
    } else wepy.alert()
  }
  */
  methods = {
    goGoodsList(url) {
      wepy.navigateTo({url})
    }
  };
}
