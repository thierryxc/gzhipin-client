//包含了n个接口请求的函数模块
import ajax from './ajax';
//注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST');
//登录接口
export const reqLogin = (user) => ajax('/login', user, 'POST');
//更新用户接口
export const reqUpdate = (user) => ajax('/update', user, 'POST');
//获取用户信息
export const reqUser = () => ajax('/user');
//获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type});
//获取当前用户消息列表
export const reqChatMsgList = () => ajax('/msglist');
//修改当前消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST');
