const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function (app) {
  app.get('/home', function (req, res, next) {
    let data = Mock.mock({
      'points|1-10': 1,
      'days|1-100': 1,
      'ranking|1-99.1-2': 1,
      'course|1-10': 1,
      'exam|1-10': 1
    })
    res.json(data)
  }).get('/course', function (req, res, next) {
    let data = Mock.mock({
      'processing|2': [
        {
          'id|+1': 0,
          'title': '@csentence(6, 18)',
          'banner': Random.image('375x80', '#894FC4', '#FFF', 'png', '!')
        }
      ],
      'finished|5': [
        {
          'id|+1': 0,
          'title': '@csentence(6, 18)',
          'banner': Random.image('375x80', '#894FC4', '#FFF', 'png', '!')
        }
      ]
    })
    res.json(data)
  }).get('/points', function (req, res, next) {
    let data = Mock.mock({
      'points|5': [
        {
          'id|+1': 1,
          'content': '@cparagraph'
        }
      ],
      'questions|5': [
        {
          'id|+1': 1,
          'content': '@csentence',
          'options': [
            '正确',
            '@csentence',
            '@csentence',
            '@csentence'
          ],
          'correct|1': '正确',
          'state': 0
        }
      ]
    })
    res.json(data)
  })
}

