const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    StatusChangeTime: '@datetime',
    Name: '@name',
    Area:'@county',
    'OnlineStatus|1': ['0', '1'],
    'QualityStatus|1': ['0', '1','2'],
    'RecordStatus|1': ['0', '1'],
    'StreamDelay|2': ['34', '56'],
    VideoQualityDiagnosisTime: '@datetime',
    'OfflineTime|10-20':10
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/monitorDetect/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10} = config.query
      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  }
]

