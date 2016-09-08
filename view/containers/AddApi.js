import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Button, message, Form, Input } from 'antd';
const FormItem = Form.Item;

import {addApi} from '../actions'

class AddApi extends Component {
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
                    <Link to={`${record._id}/mockData`}>查看Mock数据</Link>
                    <span className="ant-divider"/>
                    <Link to={`${record._id}/Template`}>修改Mock规则</Link>
                </span>
            ),
        }];

    }

    handleSubmit() {
        const groupId = this.props.groupId;
        let newApi = {groupId};
        let apiName = this.props.form.getFieldValue("apiName");
        let apiPath = this.props.form.getFieldValue("apiPath");
        let template = this.props.form.getFieldValue("apiTemplate") || "";
        newApi.name = apiName;
        newApi.path = apiPath;
        try {
            newApi.template = encodeURIComponent(JSON.stringify(JSON.parse(template)));
        } catch (e) {
            newApi.template = encodeURIComponent(template);
            console.log(e.message);
            // message.error(`模版格式错误:${e.message}`);
        }
        this.props.addApi(newApi)
    }

    handleCancel() {
        this.props.history.go(-1)
    }

    render() {

        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };

        let required = true;

        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"创建接口"}</h1>
            </div>
            <div className="ant-layout-container">
                <Form horizontal>
                    <FormItem
                        label="接口名称"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiName", {required})} placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem
                        label="接口地址"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiPath", {required})} addonBefore="Http://"/>
                    </FormItem>
                    <FormItem
                        label="Mock模版"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("apiTemplate", {required})} rows="30"/>
                    </FormItem>

                    <FormItem >
                        <div className="ant-layout-center">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleCancel.bind(this)}>返回</Button>
                        </div>
                    </FormItem>

                </Form>
            </div>
        </div>
    }
}

AddApi = Form.create({})(AddApi);

export default AddApi;

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    let groupId = ownProps.params.group;

    return {
        groupId
    }
}

export default connect(mapStateToProps, {
    addApi
})(AddApi)
