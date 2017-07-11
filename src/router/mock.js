const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function (app) {
  app.get('/home', function (req, res, next) {
    let data = Mock.mock({
      'summary': {
        'points|1-10': 1,
        'days|1-100': 1,
        'ranking|1-99.1-2': 1,
        'course|1-10': 1,
        'exam|1-10': 1
      }
    })
    res.json(data)
  }).get('/course', function (req, res, next) {
    let data = Mock.mock({
      'courses|7': [
        {
          'id|+1': 0,
          'title': '@csentence(6, 12)',
          'banner': Random.image('320x180', '#894FC4', '#FFF', 'png', '!'),
          'points|1-100': 1,
          'deadline': '@date("yyyy年MM月dd日")',
          'state|0-1': 1
        }
      ]
    })
    res.json(data)
  }).get('/point', function (req, res, next) {
    let data = Mock.mock({
      'points|5': [
        {
          'id|+1': 1,
          'content': '@cparagraph'
        }
      ]
    })
    res.json(data)
  }).get('/point/test', function (req, res, next) {
    let data = Mock.mock({
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
          'correct': '正确',
          'state': 0
        }
      ]
    })
    res.json(data)
  }).get('/exam', function (req, res, next) {
    let data = Mock.mock({
      'exams|7': [
        {
          'id|+1': 0,
          'title': '@csentence(6, 12)',
          'banner': Random.image('320x180', '#894FC4', '#FFF', 'png', '!'),
          'questions|5-100': 1,
          'deadline': '@date("yyyy年MM月dd日")',
          'state|0-1': 1,
          'pass|0-1': 1
        }
      ]
    })
    res.json(data)
  }).get('/exam/start', function (req, res, next) {
    let data = Mock.mock({
      'timelimit': 30,
      'scoreline': 90,
      'chance|1-3': 1
    })
    res.json(data)
  }).get('/exam/test', function (req, res, next) {
    let id = req.params.id
    let data = Mock.mock({
      'id': id,
      'title': '@csentence(6, 12)',
      'timelimit': 30,
      'scoreline': 90,
      'questions|5': [
        {
          'id|+1': 0,
          'content': '@cparagraph',
          'options': [
            '正确',
            '@csentence',
            '@csentence',
            '@csentence'
          ],
          'correct': '正确'
        }
      ]
    })
    res.json(data)
  }).get('/exam/finished', function (req, res, next) {
    let data = Mock.mock({
      'title': '@csentence(6, 12)',
      'scoreline': 90,
      'correct|0-5': 1,
      'wrong|0-5': 1,
      'score|80-100': 1
    })
    res.json(data)
  }).get('/exam/wrong', function (req, res, next) {
    let data = Mock.mock({
      'questions|5': [
        {
          'id|+1': 0,
          'content': '@cparagraph',
          'options': [
            '错误',
            '正确',
            '@csentence',
            '@csentence'
          ],
          'correct': '正确',
          'answer': '错误'
        }
      ]
    })
    res.json(data)
  })
}
