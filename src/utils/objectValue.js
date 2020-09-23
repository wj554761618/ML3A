

/**
 * 配置对象
 * @class ObjectValue
 * @param opt.attr is optional, can add other info
 * opt = { a:{ id:1,value:2,key:'a' } }
 * id & value & key is required
 */
class ObjectValue{
  //TODO: add opt
  constructor(id,value,key,attr) {
    this.id = id;
    this.value = value;
    this.key = key;
    //添加属性到实例
    let that = this;
    if(attr){
      Object.keys(attr).forEach((v,i)=>{
        that[v] = attr[v]
      })
    }

  }
}

let _attr = Symbol('_attr');

class ObjectValueCollection {
  constructor(){
    this[_attr] = {}
  }

  add(object){
    let key = object.key
    this[_attr][key] = object
  }

  /**
   * 在集合中根据已知的value，查询对应的objectValue
   * @param value
   * @param key 这个value对应的键，e.g id,value..
   * @returns {*}
   */
  getByValue(value,key){
    let attr = this[_attr]
    for(let k in attr){
      if(String(attr[k][key]) === String(value)){
        return attr[k]
      }
    }
  }

  /**
   * 按照某个键值输出数组格式
   * @param type  id,value,key...
   */
  toArray(type){
    type = type || 'value'
    let final = []
    let attr = this[_attr]
    for(let k in attr){
      final.push(attr[k][type])
    }
    return final
  }

  /**
   * 返回对象数组
   */
  toObjectArray(){
    let final = []
    let attr = this[_attr]
    for(let k in attr){
      let o = attr[k]
      final.push(o)
    }
    return final
  }

  /**
   * 获取Object
   * @param key
   * @returns {*}
   */
  get(key){
    return this[_attr][key]
  }

  /**
   * 返回某个键值的枚举对象
   */
  toEnum(type){
    type = type || 'value'
    let final = {}
    let attr = this[_attr]
    for(let k in attr){
      final[k] = attr[type]
    }

    return final
  }

}


exports.ObjectValue = ObjectValue
exports.ObjectValueCollection = ObjectValueCollection

