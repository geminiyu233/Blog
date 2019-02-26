const AdminModel = require('../dbs/models/admin')
import AddressComponent from '../prototype/addressComponent'

//用于密码加密
import crypto from 'crypto'
//createToken
import createToken from '../token/createToken.js'
// 格式化时间
import moment from 'moment'
import objectIdToTimestamp from 'objectid-to-timestamp'
//数据库的操作
//注册
class Admin extends AddressComponent {
  constructor() {
    super();
    this.login = this.login.bind(this)
    this.encryption = this.encryption.bind(this)
    this.Md5 = this.Md5.bind(this)
  }

  //登录
  async login(ctx) {
    //拿到账号和密码
    const {
      username,
      password
    } = ctx.request.body
    const newpassword = this.encryption(password);

    try {
      let admin = await AdminModel.findOne({
        username
      });
      if (!admin) {
        console.log('用户名不存在');
        const admin_id = await this.getId('admin_id');
        const cityInfo = await this.guessPosition(ctx);
        let admin = await AdminModel.create({
          id: admin_id,
          username,
          password: newpassword,
          token: createToken(this.username), //创建token并存入数据库
          city: cityInfo.city,
          create_time: moment(Date.now()).valueOf()
        })
        if (admin) {
          console.log('注册成功');
          ctx.body = {
            success: true,
            message: '注册成功, 请登录',
            admin_id: admin_id,
            token
          };
        } else {
          ctx.body = {
            success: false,
            message: '服务器错误'
          };
        }
      } else if (newpassword.toString() != admin.password.toString()) {
        console.log('管理员登录密码错误');
        ctx.body = {
          success: false,
          message: '该用户已存在，密码输入错误',
        };
      } else {
        console.log('登录成功', admin)
        //生成一个新的token,并存到数据库
        let token = createToken(username);
        await admin.updateOne({admin_id: admin.id}, {token: token})
        // admin.token = token; // 登录成功 创建一个新的token存入数据库
        // await admin.save()
        ctx.body = {
          success: true,
          message: '登录成功',
          admin_id: admin.id,
          token
        };
      }
    } catch (err) {
      console.log('登录管理员失败', err);
      ctx.body = {
        success: false,
        message: '登录管理员失败',
      };
    }
  }

  async singout(ctx) {
    try {
      ctx.body = {
        success: true,
        success: '退出成功'
      };
    } catch (err) {
      console.log('退出失败', err)
      ctx.body = {
        success: false,
        message: '退出失败'
      };
    }
  }

  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword
  }

  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
}

export default new Admin()
