//注册路由组件
import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile';

import Logo from '../../components/logo/Logo';

const ListItem = List.Item;

export default class Regsiter extends Component {
  //数据
  state = {
    username: '',//用户名
    password: '',//密码
    password2: '',//确认密码
    type: ''//用户类型  dashen/laoban
  }
  //注册
  regsiter = () => {
    console.log(this.state);
  }
  //处理输入数据的改变，更新对应的状态
  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val//属性名是name的值，[]将字符串改为变量！
    });
  } 

  toLogin = () => {
    this.props.history.replace('login');
  }

  render() {
    const type = this.state.type;
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请输入密码' onChange={val => {this.handleChange('password', val)}} type="password">密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请再次输入密码' onChange={val => {this.handleChange('password2', val)}} type="password">确认密码：</InputItem>
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.regsiter}>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank> 
      </div>
    )
  }
}
