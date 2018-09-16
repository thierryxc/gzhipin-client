//主路由组件
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import LaobanInfo from '../laoban-info/Laoban-info';
import DashenInfo from '../dashen-info/Dashen-info';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/laobaninfo" component={LaobanInfo}/>
          <Route path="/dasheninfo" component={DashenInfo}/>
        </Switch>
      </div>
    )
  }
}
