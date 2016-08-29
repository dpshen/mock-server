import React, {Component} from 'react';
import {Link } from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Select, Input, Icon} from 'antd';

export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiList: [
                {
                    "_id": "57b42a8a84fc0b74151e6e23",
                    "path": "/test/api/getNum",
                    "name": "getNum"
                }
            ]
        };

        this.columns = [{
            title: '接口',
            dataIndex: 'name',
        }, {
            title: '路径',
            dataIndex: 'path',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <Link to={`./${record._id}/mockData`}>查看Mock数据</Link>
                    <span className="ant-divider"/>
                    <Link to={`./${record._id}/template`}>修改Mock规则</Link>
                </span>
            ),
        }];

    }

    render() {
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"接口"}</h1>
                <Link to={"./addApi"} className="m-l-10 ant-btn-primary ant-btn-lg">创建接口</Link>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={this.state.apiList}/>
            </div>
        </div>
    }
}