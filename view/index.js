import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory, useRouterHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './store/configureStore'

import IndexScreen from './containers/IndexScreen'
import GroupList from './containers/GroupList'
import AddGroup from './containers/AddGroup'
import ApiList from './containers/ApiList'
import AddApi from './containers/AddApi'
import ApiTemplate from './containers/ApiTemplate'
import ApiMockData from './containers/ApiMockData'

import 'antd/dist/antd.less'
import './css/common.less'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
// const history = useRouterHistory(createHashHistory)({queryKey: false});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        if (screen.width >= 1280) {
            document.getElementsByTagName("html")[0].style["font-size"] = (100 / 1280) * screen.width + "px";
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={IndexScreen}>
                        <IndexRedirect to="groupList"/>
                        <Route path="groupList" component={GroupList}/>
                        <Route path="addGroup" component={AddGroup}/>
                        <Route path=":group">
                            <IndexRedirect to="apiList"/>
                            <Route path="apiList" component={ApiList}/>
                            <Route path="addApi" component={AddApi}/>
                            <Route path=":api" >
                                <IndexRedirect to="template"/>
                                <Route path="template" component={ApiTemplate}/>
                                <Route path="mockData" component={ApiMockData}/>
                            </Route>
                        </Route>
                    </Route>
                </Router>
            </ Provider >
        )

    }
}

render(<App />, document.getElementById('Page'));