import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Button, message, Form, Input} from 'antd';
const FormItem = Form.Item;

import {addApi, ADD_API_FAILURE, ADD_API_SUCCESS} from '../actions'
import {MOCK_ROOT} from '../web-config'

class AddApi extends Component {
    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(newProps) {
        if (newProps.error.type === ADD_API_FAILURE && newProps.error.message !== this.props.error.message) {
            message.error(newProps.error.message)
        }

        if (newProps.actionType === ADD_API_SUCCESS && newProps.actionTime + 1000 > new Date().getTime()){
            message.success("接口已保存")
        }

    }

    handleSubmit() {
        const groupId = this.props.groupId;
        let newApi = {groupId};
        let apiName = this.props.form.getFieldValue("apiName");
        let apiPath = this.props.form.getFieldValue("apiPath");
        let template = this.props.form.getFieldValue("apiTemplate") || "";

        apiName = apiName ? apiName.trim() : apiName;
        apiPath = apiPath ? apiPath.trim() : apiPath;

        if (!apiName || apiName.length == 0) {
            message.error("接口名称不能为空 ");
            return
        }

        if (!apiPath || apiPath.length == 0) {
            message.error("接口地址不能为空 ");
            return
        }

        let hexCatch = apiPath.match(/(?:\/*)(\S*)/);
        if (!hexCatch || hexCatch.length < 2 || hexCatch[1].length == 0) {
            message.error("接口地址不正确");
            return
        } else {
            apiPath = hexCatch[1]
        }

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
        // this.props.history.go(-1)
        this.props.history.replace(`/${this.props.groupId}/apiList`)
    }

    jsonFormat(){
        let template = this.props.form.getFieldValue("apiTemplate");
        try {
            template = JSON.stringify(JSON.parse(template), null, 4);
            this.props.form.setFieldsValue({"apiTemplate": template});
            message.success('JSON格式化成功')
        } catch (e){
            message.error(`模版格式错误:${e.message}`);
        }

    }

    render() {

        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        const GROUP_ROOT = `${MOCK_ROOT}${this.props.groupInfo.groupPath}/`;

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
                        <Input {...getFieldProps("apiPath", {required})} addonBefore={GROUP_ROOT}/>
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
                            <Button onClick={this.jsonFormat.bind(this)}>JSON格式化</Button>
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

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    let groupId = ownProps.params.group;
    const {
        entities: {
            groups,
            actionType,
            actionTime
        },
        error
    } = state;

    let groupInfo = groups[groupId] || {};

    return {
        actionType,
        actionTime,
        groupId,
        groupInfo,
        error
    }
}

export default connect(mapStateToProps, {
    addApi
})(AddApi)
