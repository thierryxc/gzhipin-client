//包含多个reducer函数根据老的state和制定的action返回一个新的state
import { combineReducers } from 'redux';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-types';
import {getRedirectTo} from '../untils/index';

const initUser = {
    username: '',//用户名
    type: '',//用户类型
    msg: '',//错误提示信息
    redirectTo:''//指定需要自定重定向的路由路径
};

const initUserList = [];
//产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS://data是user
            const {type, header} = action.data;
            return {...state, ...action.data, redirectTo: getRedirectTo(type, header)};
        case ERROR_MSG ://data是msg
            return {...state, msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state;//
    }
}

//产生userlist的reducer
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST: //data为userlist
            return action.data;
        default:
            return state;
    }   
}

const initChat = {
    user: {},
    chatMsgs: [],
    unReadCount: 0//总的未读数量
}

//产生聊天状态的reducer
function chat(state=initChat, action) {
    console.log(action.type);
    switch(action.type) {
        case RECEIVE_MSG_LIST:
            const {user, chatMsgs, userid} = action.data;
            return {
                user,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0), 0)
            };
        case RECEIVE_MSG:
            const {chatMsg} = action.data;
            return {
                user: state.user,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (chatMsg.to===action.data.userid?1:0)
            };
        case MSG_READ:
            const {from, to, count} = action.data;
            return {
                user: state.user,
                chatMsgs: state.chatMsgs.map(msg =>{
                    if (msg.from === from && msg.to === to && !msg.read) {//需要更新
                        return {...msg, read: true}
                    } else {//不需要更新
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    userList,
    chat
});
//向外暴露的状态结构 { user: {}, userList: [], chat: {} },user在任意组件中都可以通过this.props获得



