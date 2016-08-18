import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './store/configureStore'

import IndexScreen from './containers/IndexScreen'
import TestScreen from './containers/TestScreen'

import "./css/common.less"
import "./css/index.less"

import {createHashHistory} from 'history'

const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);
const history = useRouterHistory(createHashHistory)({queryKey: false});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        if (screen.width >= 1280) {
            document.getElementsByTagName("html")[0].style["font-size"] = (10 / 1280) * screen.width + "px";
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history} >
                    <Route path="/" component={IndexScreen}>
                        <IndexRedirect to="index"/>
                        <Route path="index" component={TestScreen}/>
                    </Route>
                </Router>
            </Provider>
        )

    }
}

render(<App />, document.getElementById('Page'));