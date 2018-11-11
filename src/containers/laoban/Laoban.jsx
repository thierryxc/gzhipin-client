import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/actions';
import UserList from '../../components/user-list/UserList';
//老板主界面路由容器组件

class Laoban extends Component {

  componentDidMount() {
    //获取userlist
    this.props.getUserList('dashen');
  }
  render() {
    return (
      <div>
        <UserList userList={this.props.userList}/>
      </div>
    )
  }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Laoban)
