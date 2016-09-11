import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table, Button, Form, Modal, message, Select, Input, Icon} from 'antd';

import {fetchGroupList, addGroup, updateGroup, ADD_GROUP_FAILURE, UPDATE_GROUP_FAILURE} from '../actions'
import {MOCK_ROOT} from '../libs/web-config'
import util from '../libs/util'

class GroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddGroup: false,
            selectGroup: {}
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
            title: "创建时间",
            dataIndex: "createTime",
            render: (createTime) => {
                if (createTime) {
                    return (
                        <span>{util.dateFormat(createTime)}</span>
                    )
                } else {
                    return null
                }
            }
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a onClick={this.editGroup.bind(this, record)}>修改项目</a>
                    <span className="ant-divider"/>
                    <a onClick={this.toAddApi.bind(this, record)}>新增接口</a>
                </span>
            ),
        }];

    }

    componentWillReceiveProps(newProps) {
        if ([ADD_GROUP_FAILURE, UPDATE_GROUP_FAILURE].includes(newProps.error.type) && newProps.error.message !== this.props.error.message) {
            message.error(newProps.error.message)
        }
    }

    toGroup(record) {
        this.props.history.replace(`/${record._id}`);
    }

    addGroup() {
        this.setState({
            showAddGroup: true,
            selectGroup: {}
        })
    }

    editGroup(group, e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            showAddGroup: true,
            selectGroup: group

        });
    }

    toAddApi(group, e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.history.replace(`/${group._id}/addApi`);
    }

    hideGroupModal() {
        this.setState({
            showAddGroup: false,
            selectGroup: {}
        }, this.props.form.resetFields)
    }

    handleSubmit() {
        let groupName = this.props.form.getFieldValue("groupName");
        let groupPath = this.props.form.getFieldValue("groupPath");
        groupName = groupName ? groupName.trim() : groupName;
        groupPath = groupPath ? groupPath.trim() : groupPath;
        if (/\//.test(groupPath)) {
            message.error("项目地址不能包含 / ");
            return
        }

        if (!groupPath || groupPath.length == 0) {
            message.error("项目地址不能为空 ");
            return
        }

        if (!groupName || groupName.length == 0) {
            message.error("项目名称不能为空 ");
            return
        }

        let group = {groupName, groupPath};
        let selectGroup = this.state.selectGroup;
        if (selectGroup._id) {
            group = {...selectGroup, ...group};
            this.props.updateGroup(group)
        } else {
            this.props.addGroup(group);
        }
        this.hideGroupModal();
    }

    render() {
        const {groupList} = this.props;
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        let showAddGroup = this.state.showAddGroup;

        let {
            groupName,
            groupPath
        } = this.state.selectGroup;

        const groupNameProps = getFieldProps("groupName", {
            initialValue: groupName,
            rules: [
                {required: true, type: "string", pattern: /^[a-z]+$/}
            ]
        })

        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"项目"}</h1>
                <Button onClick={this.addGroup.bind(this)} className="m-l-10 ant-btn-primary ant-btn-lg">创建项目</Button>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={groupList} onRowClick={this.toGroup.bind(this)}/>
            </div>
            <Modal title="" visible={showAddGroup} onCancel={this.hideGroupModal.bind(this)}
                   onOk={this.handleSubmit.bind(this)}>
                <Form horizontal>
                    <Form.Item label="项目名称" {...formItemLayout}>
                        <Input {...getFieldProps("groupName", {initialValue: groupName})} placeholder="项目的名称(仅用于标识项目)"/>
                    </Form.Item>

                    <Form.Item label="项目地址" {...formItemLayout}>
                        <Input {...getFieldProps("groupPath", {initialValue: groupPath})} addonBefore={MOCK_ROOT}/>
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
        entities: {groups},
        error
    } = state;

    let groupList = Object.keys(groups).map(key => groups[key]);

    return {
        groupList,
        error
    }
}


export default connect(mapStateToProps, {
    fetchGroupList,
    addGroup,
    updateGroup
})(GroupList)
