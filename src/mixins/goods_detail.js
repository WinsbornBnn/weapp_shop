import wepy from 'wepy'

export default class extends wepy.mixin {
  config = {};

  data = {
    id: '',
    goodsInfo: null,
    saleIndex: 1,
    saleArr: ['满300减150', '满400减250', '满600减300', '满1000减600', '满1500减800', '未选择'],
    sizeIndex: 2,
    sizeArr: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    active: 1
  };
  onLoad ({ goods_id: goodsid }) {
    this.id = goodsid
    this.getGoodsInfo()
  }
  onReady() {
    this.active = 0
  }
  async getGoodsInfo () {
    const { data: { meta, message } } = await wepy.get('/goods/detail', { goods_id: this.id })
    meta.status === 200 && (this.goodsInfo = message)
    this.$apply()
  }
  methods = {
    changePicker ({ currentTarget: { dataset: { name } }, detail: { value } }) {
      this[name] = value
    }
  };
}
