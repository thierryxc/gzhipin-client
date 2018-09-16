//包含了n个接口请求的函数模块
import ajax from './ajax';
//注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST');
//登录接口
export const reqLogin = (user) => ajax('/login', user, 'POST');
//更新用户接口
export const reqUpdate = (user) => ajax('/update', user, 'POST');