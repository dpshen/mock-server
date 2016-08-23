import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Select, Input, Icon} from 'antd';

export default class GroupList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft:20}}>{"项目"}</h1>
                <Link to={this.groupId+"/page/create"} className="ant-btn ant-btn-primary ant-btn-lg">创建项目</Link>
            </div>
            <div className="ant-layout-container">
                <div>ALL</div>
                <div className="ant-layout-content">
                    <div>
                    </div>
                </div>
            </div>
        </div>
    }
}