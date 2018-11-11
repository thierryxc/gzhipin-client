//主路由组件
import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; //可以操作前端cookie对象
import {NavBar} from 'antd-mobile';

import LaobanInfo from '../laoban-info/Laoban-info';
import DashenInfo from '../dashen-info/Dashen-info';
import Dashen from '../dashen/Dashen';
import Laoban from '../laoban/Laoban';
import Message from '../message/Message';
import Personal from '../personal/Personal';
import NotFound from '../../components/not-found/NotFound';
import NavFooter from '../../components/nav-footer/NavFooter'; 
import Chat from '../chat/Chat';

import {getRedirectTo} from '../../untils';
import {getUser} from '../../redux/actions'; 

class Main extends Component {
  
  //给组件对象添加属性
  navList = [//所有导航组件的相关信息数据
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人'
    }
  ];

  componentDidMount() {
    //登陆过（有cookie）但还没有登陆（redux中的user中没有_id），发请求获取对应user
    const userid = Cookies.get('userid');
    const {_id} = this.props.user;
    if (userid && !_id) {
      //发送异步请求，获取user信息
      //console.log('发送ajax请求，获取user');
      this.props.getUser();
    }
  }

  render() {
    //读取cookie中的userid
    const userid = Cookies.get('userid');
    //如果没有，到登陆界面
    if (!userid) {
      return <Redirect to='/login' />
    }
    //如果有，读取redux中的user状态
    const {user, unReadCount} = this.props;
    
    //如果user没有_id，返回null（不做任何显示）
    if (!user._id) {
      return null;
    } else {//如果有_id,显示对应界面
      let path = this.props.location.pathname;
      if (path === '/') {
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path} />;
      }
    }
    /*/检查用户是否登陆，若无，跳登陆页面
    const {user} = this.props;
    if (!user._id) {
      return <Redirect to='/login' />
    }*/

    const {navList} = this;
    const path = this.props.location.pathname;
    const currentNav = navList.find(nav => nav.path === path);//得到当前nav，可能没有

    if (currentNav) {
      //决定哪个路由需要隐藏
      if (user.type === 'laoban') {
        //隐藏数组的第二个
        navList[1].hide = true;
      } else {
        //隐藏数组的第一个
        navList[0].hide = true;
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='fix-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route path={nav.path} component={nav.component} />)
          }
          <Route path="/laobaninfo" component={LaobanInfo}/>
          <Route path="/dasheninfo" component={DashenInfo}/>
          <Route path="/chat/:userid" component={Chat}/>
          <Route component={NotFound} />
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}

export default connect (
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main)


/*
1.实现自动登陆
  1)登陆过（有cookie）但还没有登陆（redux中的user中没有_id），发请求获取对应user
  2）若cokkie没有，进入login界面
2.如果已经登陆了，如果请求根路径
  根据user的type和header来计算出一个重定向的路由路径，并自动重定向
*/