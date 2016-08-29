import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Select, Input, Icon} from 'antd';

// import './GroupList.less'

export default class GroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupList: [
                {
                    "_id": "57b40ba967c24bd613a0c243",
                    "groupPath": "test",
                    "groupName": "测试",
                    "apiList": [
                        {
                            "_id": "57b42a8a84fc0b74151e6e23",
                            "path": "/test/api/getNum",
                            "name": "getNum"
                        }
                    ]
                },
                {
                    "_id": "57b40e1667c24bd613a0c245",
                    "groupPath": "test2",
                    "groupName": "group2",
                    "apiList": []
                },
                {
                    "_id": "57bbbfe0c75ee7e3504de7c0",
                    "groupPath": "test1",
                    "groupName": "group1",
                    "apiList": []
                },
                {
                    "_id": "57bbbfecc75ee7e3504de7c1",
                    "groupPath": "test3",
                    "groupName": "group3",
                    "apiList": []
                }
            ]
        };

        this.columns = [{
            title: '项目',
            dataIndex: 'groupName',
            render: (text, record) => <Link to={`/${record._id}`}>{text}</Link>,
        }, {
            title: '根路径',
            dataIndex: 'groupPath',
        }, {
            title: '接口数量',
            dataIndex: 'apiList',
            render: (text) => <span>{text.length}</span>
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#">查看</a>
                    <span className="ant-divider"/>
                    <a href="#">修改</a>
                </span>
            ),
        }];

    }

    render() {
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"项目"}</h1>
                <Link to={"addGroup"} className="m-l-10 ant-btn-primary ant-btn-lg">创建项目</Link>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={this.state.groupList}/>
            </div>
        </div>
    }
}



