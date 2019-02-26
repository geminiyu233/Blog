import BaseComponent from './baseComponent'

/*
腾讯地图API调配组件
 */
class AddressComponent extends BaseComponent {
	constructor(){
		super();
    this.tencentkey = 'KYKBZ-M43RO-FUTWA-SZKDB-OO4S2-PXFVY';
    this.axios = this.axios.bind(this);
	}
	//获取定位地址
	async guessPosition(req){
		return new Promise(async (resolve, reject) => {
			let ip;
			const defaultIp = '171.88.68.143';
	 		if (process.env.NODE_ENV == 'development') {
	 			ip = defaultIp;
	 		} else {
	 			try {
					ip = req.headers['x-forwarded-for'] || 
			 		req.connection.remoteAddress || 
			 		req.socket.remoteAddress ||
			 		req.connection.socket.remoteAddress;
			 		const ipArr = ip.split(':');
			 		ip = ipArr[ipArr.length -1] || defaultIp;
				} catch (e) {
					ip = defaultIp;
				}
	 		}
	 		try{
		 		let result = await this.axios('http://apis.map.qq.com/ws/location/v1/ip', {
		 			ip,
		 			key: this.tencentkey,
				 })
				 console.log('地址result', result);
		 		if (result.status == 0) {
		 			const cityInfo = {
		 				lat: result.result.location.lat,
		 				lng: result.result.location.lng,
		 				city: result.result.ad_info.city,
		 			}
		 			cityInfo.city = cityInfo.city.replace(/市$/, '');
		 			resolve(cityInfo)
		 		}else{
		 			console.log('定位失败', result)
		 			reject('定位失败');
		 		}
	 		}catch(err){
	 			reject(err);
	 		}
		})
	}
}

export default AddressComponent