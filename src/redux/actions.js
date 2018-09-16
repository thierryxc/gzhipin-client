//包含N个action creator
//异步action
//同步action
import {reqLogin, reqRegister} from '../api';
import {AUTH_SUCCESS, ERROR_MSG} from './action-types';

//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

//注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user;
    //表单前台验证，如果不通过分发errorMsg的同步action
    if (!username) {
        return errorMsg('用户名不能为空');
    } else if (password !== password2) {
        return  errorMsg('两次密码不一致');
    }
    //表单验证通过，返回一个发ajax的异步action
    return async dispatch => {
        //发送注册异步ajax请求
        const response = await reqRegister({username, password, type});
        const result = response.data;
        if (result.code === 0) {//成功
            //分发成功action
            dispatch(authSuccess(result.data));
        } else {//失败
            //分发失败action
            dispatch(errorMsg(result.msg))
        }
    }
}
//登陆异步action
export const login = (user) => {
    const {username, password} = user;
    //表单前台验证，如果不通过分发errorMsg的同步action
    if (!username) {
        return errorMsg('用户名不能为空');
    } else if (!password) {
        return  errorMsg('密码不能为空');
    }

    return async dispatch => {
        //发送注册异步ajax请求
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code === 0) {//成功
            dispatch(authSuccess(result.data));
        } else {//失败
            dispatch(errorMsg(result.msg))
        }
    }
}