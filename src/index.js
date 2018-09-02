//入口文件
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/login/Login';
import Main from './containers/main/Main';
import Regsiter from './containers/register/Register';

import {Provider} from 'react-redux';
import store from './redux/store';

ReactDom.render((
    <Provider stroe={store}>
        <HashRouter>
                <Switch>
                    <Route path='/register' component={Regsiter}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={Main}></Route>//默认组件，除了上面两个路径其余都是此组件
                </Switch>  
            </HashRouter>
    </Provider>
   )
    , document.getElementById("root"));