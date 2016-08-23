import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory, useRouterHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './store/configureStore'

import IndexScreen from './containers/IndexScreen'
import GroupList from './containers/GroupList'
import ApiList from './containers/ApiList'
import ApiTemplate from './containers/ApiTemplate'
import ApiMockData from './containers/ApiMockData'

import 'antd/dist/antd.less'

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
                        <Route path=":group">
                            <IndexRedirect to=":group/apiList"/>
                            <Route path=":group/apiList" component={ApiList}/>
                            <Route path=":group/:api" >
                                <IndexRedirect to=":group/:api/Template"/>
                                <Route path=":group/:api/Template" component={ApiTemplate}/>
                                <Route path=":group/:api/mockData" component={ApiMockData}/>
                            </Route>
                        </Route>
                    </Route>
                </Router>
            </ Provider >
        )

    }
}

render(<App />, document.getElementById('Page'));