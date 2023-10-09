let [priceList, speedList, discountList, termsList] = [[], [], [], []]

export const serviceParamsHandler = {
  setPriceList: function (data) {
    priceList = Array.isArray(data) ? data : []
  },
  getPriceList: function () {
    return priceList
  },

  setSpeedList: function (data) {
    speedList = Array.isArray(data) ? data : []
  },
  getSpeedList: function () {
    return speedList
  },

  setDiscountList: function (data) {
    discountList = Array.isArray(data) ? data : []
  },
  getDiscountList: function () {
    return discountList
  },

  setTermsList: function (data) {
    termsList = Array.isArray(data) ? data : []
  },
  getTermsList: function () {
    return termsList
  }
}
