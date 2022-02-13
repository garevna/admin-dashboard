class StatisticsController {
  async update (request) {
    self.postMessage(await self.updateStatistics(request.customerId, request.customerServices))
  }
}

export const statisticsController = new StatisticsController()
