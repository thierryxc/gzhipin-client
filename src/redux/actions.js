//包含N个action creator
//异步action
//同步action
import {reqLogin, reqRegister, reqUpdate, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from '../api';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-types';
import io from 'socket.io-client'; 

//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
//接收用户的同步action
const receveUser = (user) => ({type: RECEIVE_USER, data: user});
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
//接受用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList });
//获取当前用户消息列表
const receiveMsgList = ({user, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {user, chatMsgs, userid}});
//接收一个消息的同步action
const receiveMsg = ({chatMsg, userid}) => ({type: RECEIVE_MSG, data: {chatMsg, userid}});
//读取某个聊天消息的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}});

//单例对象
//1.创建对象之前，判断对象是否已经存在，只有不存在才创建
//2.创建对象之后，保存对象

function initIO(dispatch, userid) {
    if (!io.socket) {
        //连接服务器,得到与服务器的连接对象
        io.socket = io('ws://localhost:4000');
    }
    io.socket.on('receiveMsg', function(chatMsg){
        console.log('客户端接收的消息', chatMsg);
        //只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
        if (userid === chatMsg.from || userid === chatMsg.to) {
            dispatch(receiveMsg({chatMsg, userid}));
        }   
    });
}
//异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid);
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {
        const {user, chatMsgs} = result.data;
        //分发同步action
        dispatch(receiveMsgList({user, chatMsgs, userid}));
    }
}
//异步发送消息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('send',{from, to, content});
        //发消息
        io.socket.emit('sendMsg', {from, to, content}) 
    } 
}

//读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from);
        const result = response.data;
        if (result.code === 0) {
            const count = result.data;
            dispatch(msgRead({count, from, to}));
        }
    }
}

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
            getMsgList(dispatch, result.data._id);
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
            getMsgList(dispatch, result.data._id);
            dispatch(authSuccess(result.data));
        } else {//失败
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user);
        const result = response.data;
        if (result.code === 0) {//更新成功
            
            dispatch(receveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {//更新成功
            getMsgList(dispatch, result.data._id);
            dispatch(receveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUserList(type);
        const result = response.data;
        //取到结果后,分发一个同步action
        if (result.code === 0) {
            dispatch(receiveUserList(result.data));
        }
    }
}

