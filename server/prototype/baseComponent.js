import axios from 'axios'
import Ids from '../dbs/models/ids'

export default class BaseComponent {
  constructor() {
    this.idList = ['admin_id', 'tag_id', 'article_id', 'article_statu_id', 'draft_id', 'permission_id']
  }
  //获取id列表
  async getId(type) {
    console.log('type', type)
    if (!this.idList.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return
    }
    try {
      const idData = await Ids.findOne();
			idData[type] ++ ;
			await idData.save();
			return idData[type]
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err)
    }
  }

  async axios(url = '', data = {}, type = 'GET', resType = 'JSON') {
    type = type.toUpperCase();
    resType = resType.toUpperCase();
    if (type == 'GET') {
      let dataStr = ''; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }

    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
		}
		let response
    try {
      response = await axios(url, requestConfig);
    } catch (err) {
      console.log('获取http数据失败', err);
      throw new Error(err)
    }
    return response.data
  }
}
