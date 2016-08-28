import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Select, Input, Icon} from 'antd';

import './GroupList.less'

export default class GroupList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft:20}}>{"项目"}</h1>
                <Link to={this.groupId+"/page/create"} className="m-l-10 ant-btn-primary ant-btn-lg">创建项目</Link>
            </div>
            <div className="ant-layout-container">
                <div className="ant-layout-content flex-layout p-10">
                    <div className="ant-block m-10"></div>
                    <div className="ant-block"></div>
                    <div className="ant-block"></div>
                    <div className="ant-block"></div>
                    <div className="ant-block"></div>
                    <div className="ant-block"></div>
                    <div className="ant-block"></div>
                </div>
            </div>
        </div>
    }
}