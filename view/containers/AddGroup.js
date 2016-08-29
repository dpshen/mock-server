import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Select, Input, Icon} from 'antd';

// import './GroupList.less'

export default class AddGroup extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"创建项目"}</h1>
            </div>
            <div className="ant-layout-container">
                AddGroup
            </div>
        </div>
    }
}



