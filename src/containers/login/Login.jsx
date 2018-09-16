//登陆路由组件
import React, { Component } from 'react'

import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions';

import Logo from '../../components/logo/Logo';

class Login extends Component {
  
  state = {
    username: '',
    password: ''
  }

  login = () => {
    this.props.login(this.state);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  }

  toRsgister = () => {
    this.props.history.replace('register');
  }

  render() {
    const type = this.state.type;
    const {msg, redirectTo} = this.props.user; 
    //如果redirectTo有值，则自动重定向
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace />
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名：</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请输入密码' onChange={val => {this.handleChange('password', val)}} type="password">密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <Button onClick={this.login} type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;陆</Button>
            <Button onClick={this.toRsgister}>还没有账户</Button>
          </List>
        </WingBlank> 
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)
