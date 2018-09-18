//老板信息完善路由组件
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';

class LaobanInfo extends Component {
  state = {
    header: '',
    post: '',//职位
    info: '',
    company:'',
    salary:''
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
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入职位' onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
        <InputItem placeholder='请输入薪资要求' onChange={val => {this.handleChange('salary', val)}}>薪资要求:</InputItem>
        <TextareaItem title="职位要求:" rows={3}  onChange={val => {this.handleChange('info', val)}}></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
    state => ({}),
    {}
)(LaobanInfo);
