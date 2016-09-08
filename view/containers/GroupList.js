import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Form, Modal, message, Select, Input, Icon} from 'antd';

import {fetchGroupList, addGroup} from '../actions'
// import './GroupList.less'

// import {AddGroup} from './AddGroup'

class GroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {showAddGroup: false};

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

    addGroup() {
        this.setState({
            showAddGroup: true
        })
    }

    cancelAddGroup() {
        this.setState({
            showAddGroup: false
        })
    }

    handleSubmit() {
        let groupName = this.props.form.getFieldValue("groupName");
        let groupPath = this.props.form.getFieldValue("groupPath");
        const group = {groupName, groupPath};
        this.props.addGroup(group);
        this.props.fetchGroupList();
        this.cancelAddGroup();
    }

    render() {
        const {groupList, fetchGroupList, addGroup} = this.props;
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        let showAddGroup = this.state.showAddGroup;
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"项目"}</h1>
                <Button onClick={this.addGroup.bind(this)} className="m-l-10 ant-btn-primary ant-btn-lg">创建项目</Button>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={groupList}/>
            </div>
            <Modal title="" visible={showAddGroup} onCancel={this.cancelAddGroup.bind(this)}
                   onOk={this.handleSubmit.bind(this)}>
                <Form horizontal>
                    <Form.Item label="项目名称" {...formItemLayout}>
                        <Input {...getFieldProps("groupName", {})} placeholder="项目的名称(仅用于标识项目)"/>
                    </Form.Item>

                    <Form.Item label="项目地址" {...formItemLayout}>
                        <Input {...getFieldProps("groupPath", {})} />
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    }
}

GroupList = Form.create({})(GroupList);


function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    const {
        entities: {groups}
    } = state;

    let groupList = Object.keys(groups).map(key => groups[key]);

    return {
        groupList
    }
}


export default connect(mapStateToProps, {
    fetchGroupList,
    addGroup
})(GroupList)
