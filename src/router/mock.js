const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function (app) {
  app.get('/course', function (req, res, next) {
    let data = Mock.mock({
      'processing|2': [
        {
          'id|+1': 0,
          'title': '@sentence(18)',
          'banner': Random.image('375x60')
        }
      ],
      'finished|5': [
        {
          'id|+1': 0,
          'title': '@sentence(18)',
          'banner': Random.image('375x60')
        }
      ]
    })
    res.json(data)
  })
}

