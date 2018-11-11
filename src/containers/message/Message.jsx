import React, { Component } from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
//消息主界面路由容器组件
class Message extends Component {
  //对chatMsgs进行分组（chat_id）,得到每个组lastMsgs组成的数组
  //1.找出每个聊天的lastMsg，并用一个对象容器来保存 {chat_id, lastMsg}
  //2.得到所有lastMsg的数组
  //3.对数组进行排序（按create_time降序）
  getLastMsgs(chatMsgs, userid) {
  //1.找出每个聊天的lastMsg，并用一个对象容器来保存 {chat_id, lastMsg}
    const lastMsgObjs = {};
    chatMsgs.forEach(msg => {
      //对msg个体统计
      if (msg.to === userid && !msg.read) {
        msg.unReadCount = 1;
      } else {
        msg.unReadCount = 0;
      }
      const chatId = msg.chat_id;
      //获取已保存的当前组的lastMsg
      let lastMsg = lastMsgObjs[chatId];
      //没有
      if (!lastMsg) {
        lastMsgObjs[chatId] = msg;
      } else {//有
        //累加unReadCount，并保存已经统计的未读数量
        const unReadCount = lastMsg.unReadCount + msg.unReadCount;
        //如果msg比lastMsg晚，就将msg保存为lastMsg
        if (msg.create_time > lastMsg.create_time) {
          lastMsgObjs[chatId] = msg;
        }
        //保存在最新的lastMsg上
        lastMsgObjs[chatId].unReadCount = unReadCount;
      }
      
    });
    console.log(lastMsgObjs);
    
  //2.得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs);
  //3.对数组进行排序（按create_time降序）
   lastMsgs.sort(function(m1, m2) {
     return m2.create_time - m1.create_time;
    }); 
    return lastMsgs;
  }

  render() {
    const {user} = this.props;
    const users = this.props.chat.user;
    const chatMsgs = this.props.chat.chatMsgs;

    //对chatMsgs进行分组（chat_id）
    const lastMsgs = this.getLastMsgs(chatMsgs, user._id);
    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            const targetUserId = msg.to===user._id ? msg.from : msg.to;
            const targetUser = users[targetUserId];
            return (
              <Item
               key={msg.chat_id}
               extra={<Badge text={msg.unReadCount}/>}
               thumb={targetUser.header ? require(`../../assets/headers/${targetUser.header}.png`) : null}
                arrow='horizontal'
               onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )

          })
        } 
      </List>
    )
  }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)