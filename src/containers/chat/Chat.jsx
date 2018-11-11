import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {sendMsg, readMsg} from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {

  state = {
    content: '',
    isShow: false,

  }

  componentWillUnmount() {
    //发送请求更新消息的未读状态
    const to = this.props.user._id;
    const from = this.props.match.params.userid;  
    this.props.readMsg(from, to);
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);

    
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillMount() {
    //初始化表情列表数据
    const emojis = ['😀','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆','😁','😂','🤣','😃','😄', '😅','😆'];
    this.emojis =  emojis.map(emoji => ({text:emoji}));
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({
      isShow: isShow
    });
    if (isShow) {
      //异步手动派发resize，解决表情显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
    }
  }

  handleSend = () => {
    //收集数据
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    //发送请求(发消息)
    if (content) {
      this.props.sendMsg({from, to, content});
      this.setState({
        content: '',
        isShow: false
      });
    }
  }
  render() {
    const {user} = this.props;
    const users = this.props.chat.user;
    const {chatMsgs} = this.props.chat;
    const meId = user._id;
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    
    if (!users[meId]) {
      return null;
    }
    //得到目标用户头像
    const targetHeader = users[targetId].header;
    const targetIcon = targetHeader ? require(`../../assets/headers/${targetHeader}.png`) : null;

    //对chatMsg进行过滤，（chat_id）
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    
    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type='left' />} className='fix-header' onLeftClick={() => this.props.history.goBack()}>{users[targetId].name}</NavBar>
        <List style={{marginBottom: 50, marginTop: 50}}>
          <QueueAnim type='alpha'>
          {
            msgs.map(msg => {
              if (msg.to === meId) {//对方发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                );
              } else {
                return (
                  <Item
                    key={msg._id}
                    className='char-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                );
              }
            })
          }
          </QueueAnim>  
        </List>
        <div className='am-tab-bar'>
          <InputItem
            onFocus={() => this.setState({isShow: false})}
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            placeholder='请输入'
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight:5}}>🙂</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            } 
          />
          {this.state.isShow ? (<Grid
            data={this.emojis}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(item) => {
              this.setState({content: this.state.content + item.text})
            }}
          />) : null}
          
        </div>
      </div>
    )
  }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)
