//包含多个reducer函数根据老的state和制定的action返回一个新的state
import { combineReducers } from 'redux';
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'
const initUser = {
    username: '',//用户名
    type: '',//用户类型
    msg: '',//错误提示信息
    redirectTo:''//指定需要自定重定向的路由路径
}
//产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS://data是user
            return {...state, ...action.data, redirectTo: '/'};
        case ERROR_MSG ://data是msg
            return {...state, msg: action.data}
        default:
            return state;//
    }
}

export default combineReducers({
    user
});

//向外暴露的状态结构 { user: {} },user在任意组件中都可以通过this.props获得