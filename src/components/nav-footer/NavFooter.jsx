import React, { Component } from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types'; 
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;
//在非路由组件中使用路由库的api，使用withRoute()
class NavFooter extends Component {
  
  static propTypes = {
      navList: PropTypes.array.isRequired,
      unReadCount: PropTypes.number.isRequired
  }

  render() {
    let {navList, unReadCount} = this.props;
    //过滤hide为true
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname;
    return (
      <TabBar>
        {
            navList.map((nav, index) => (
                <Item key={nav.path}
                      badge={nav.path === '/message' ? unReadCount : 0}
                      title={nav.text}
                      icon={{uri: require(`./images/${nav.icon}.png`)}}
                      selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                      selected={path === nav.path}
                      onPress={() => {this.props.history.replace(nav.path)}}
                />

               
            ))
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)//向外暴露withRouter(NavFooter)包装产生的组件，内部会向组件中传入路由组件特有属性（history,location,math）
