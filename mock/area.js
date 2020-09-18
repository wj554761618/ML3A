const province=[
  {
    AreaCode:"65",
    Name:"新疆维吾尔自治区",
    city:[
      {
        AreaCode:"6501",
        Name:"乌鲁木齐",
        country:[
          {
            AreaCode:"650102",
            Name:"天山区"
          }
        ]
      },
      {
        AreaCode:"650106",
        Name:"职业技能培训学校",
        country:[
          {
            AreaCode:"650101",
            Name:"天目区"
          }
        ]
      }
    ]
  },
  {
    AreaCode:"46",
    Name:"海南省",
    city:[
      {
        AreaCode:"4601",
        Name:"海口市",
        country:[
          {
            AreaCode:"460100",
            Name:"美兰区"
          },
          {
            AreaCode:"460100",
            Name:"秀英区"
          }
        ]
      },
      {
        AreaCode:"4602",
        Name:"琼海市",
        country:[
          {
            AreaCode:"460201",
            Name:"龙江镇"
          }
        ]
      }
    ]
  }
]
let getProvince=function(areaCode){
  if(areaCode==="0") return province;
  for(let i=0;i<province.length;i++){
    if(province[i].AreaCode===areaCode){
      return province[i].city
    }else {
      city=province[i].city;
      for(let j=0;j<city.length;j++){
        if(city[j].AreaCode===areaCode){
          return  city[j].country
        }
      }
    }
  }
}
module.exports=[
  //获取省市县
  {
    url: '/vue-admin-template/getAreaList',
    type: 'post',
    response: config => {
      const { AreaCode } = config.body

      // mock error
      if (!AreaCode) {
        return {
          code: 50008,
          message: 'areaCode必传'
        }
      }
      let data=getProvince(AreaCode);
      return {
        code: 20000,
        data: data
      }
    }
  }
]
