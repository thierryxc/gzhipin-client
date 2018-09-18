//老板信息完善路由组件
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';

class DashenInfo extends Component {
  state = {
    header: '',
    post: '',//职位
    info: '' 
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  }
//更新头像信息
  setHeader = (header) => {
    this.setState({
      header: header
    });
  }

  save = () => {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入职位'onChange={val => {this.handleChange('post', val)}}>申请职位:</InputItem>
        <TextareaItem title="个人介绍:" rows={3}  onChange={val => {this.handleChange('info', val)}}></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
    state => ({}),
    {}
)(DashenInfo);
