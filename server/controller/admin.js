const Admin = require('../dbs/models/admin')

//生成时间
const dtime = require('time-formater');
//用于密码加密
const crypto = require('crypto');
//createToken
const createToken = require('../token/createToken.js');

//数据库的操作
//注册
const SignUp = async (ctx, res, next) => {
  const {
    user_name,
    password
  } = ctx.request.body

  let admin = await Admin.findOne({
    user_name
  });
  if (admin) {
    console.log('用户已经存在');
    res.send({
      success: false,
      message: '用户已存在'
    });
  } else {
    let admin = await Admin.create({
      user_name,
      password: encryption(password),
      create_time: dtime().format('YYYY-MM-DD HH:mm:ss'), //创建时间
      token: createToken(this.user_name) //创建token并存入数据库
    })
    if (admin) {
      console.log('注册成功');
      res.send({
        success: true,
        message: '注册成功, 请登录'
      })
    } else {
      res.send({
        success: false,
        message: '服务器错误'
      })
    }
  }
};

//登录
const Login = async (ctx, res, next) => {
  //拿到账号和密码
  const {
    user_name,
    password
  } = ctx.request.body
  const newpassword = encryption(password);

  try {
    let admin = await Admin.findOne({
      user_name
    });
    if (!admin) {
      console.log('用户名不存在');
      let admin = await Admin.create({
        user_name,
        password: encryption(password),
        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'), //创建时间
        token: createToken(this.user_name) //创建token并存入数据库
      })
      if (admin) {
        console.log('注册成功');
        res.send({
          success: true,
          message: '注册成功, 请登录'
        })
      } else {
        res.send({
          success: false,
          message: '服务器错误'
        })
      }
    } else if (newpassword.toString() != admin.password.toString()) {
      console.log('管理员登录密码错误');
      res.send({
        success: false,
        message: '该用户已存在，密码输入错误',
      })
    } else {
      //生成一个新的token,并存到数据库
      let token = createToken(user_name);
      console.log(token);
      admin.token = token;
      await admin.save()
      res.send({
        success: true,
        message: '登录成功',
        create_time: admin.create_time,
        user_name,
        token, //登录成功要创建一个新的token,应该存入数据库
      })
    }
  } catch (err) {
    console.log('登录管理员失败', err);
    res.send({
      success: false,
      message: '登录管理员失败',
    })
  }
};

const Singout = async (req, res, next) => {
  try {
    res.send({
      success: true,
      success: '退出成功'
    })
  } catch (err) {
    console.log('退出失败', err)
    res.send({
      success: false,
      message: '退出失败'
    })
  }
}

function encryption(password) {
  const newpassword = Md5(Md5(password).substr(2, 7) + Md5(password));
  return newpassword
}

function Md5(password) {
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('base64');
}
module.exports = {
  Login,
  SignUp,
  Singout
};
