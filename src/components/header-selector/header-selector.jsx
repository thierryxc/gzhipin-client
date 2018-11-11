//选择用户头像UI组件
import React, { Component } from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class HeaderSelector extends Component {

  static PropTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null,//图片对象，默认没有值

  }
   
  constructor(props) {
    super(props);
    this.headerList = [];
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像' + (i+1),
        icon: require(`../../assets/headers/头像${i+1}.png`)
      });   
    }
  }

  headleClick = ({text, icon}) => {
    //更新当前组件状态
    this.setState({icon});
    //调用函数更新父组件状态
    this.props.setHeader(text);
  }

  render() {
    //头部界面
    const icon = this.state.icon;
    const listHead = !icon ? '请选择头像' : (<div>已选择头像:<img src={icon} /></div>);
    return (
      <List renderHeader={() => listHead}>
        <Grid data={this.headerList} colunmNum={5} onClick={this.headleClick}></Grid>
      </List>
    )
  }
}

