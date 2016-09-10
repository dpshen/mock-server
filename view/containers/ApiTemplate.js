import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Form, Select, Input, Icon} from 'antd';
const FormItem = Form.Item;
import {MOCK_ROOT} from '../web-config'

import {fetchApi, updateApi} from '../actions'

class ApiTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    handleSubmit() {
        let api = this.props.apiInfo;
        let apiName = this.props.form.getFieldValue("apiName");
        let apiPath = this.props.form.getFieldValue("apiPath");
        let template = this.props.form.getFieldValue("apiTemplate");

        apiName = apiName ? apiName.trim() : apiName;
        apiPath = apiPath ? apiPath.trim() : apiPath;

        if (!apiPath || apiPath.length == 0) {
            message.error("接口地址不能为空 ");
            return
        }

        if (!apiName || apiName.length == 0) {
            message.error("接口名称不能为空 ");
            return
        }

        let hexCatch = apiPath.match(/(?:\/*)(\S*)/);
        if (!hexCatch || hexCatch.length < 2 || hexCatch[1].length == 0) {
            message.error("接口地址不正确");
            return
        } else {
            apiPath = hexCatch[1]
        }

        api.template = encodeURIComponent(template);
        api.name = apiName;
        api.path = apiPath;
        try {
            api.template = encodeURIComponent(JSON.stringify(JSON.parse(template), null, 0))
        } catch (e) {
            console.log(e.message);
            // message.error(`模版格式错误:${e.message}`);
        }
        this.props.updateApi(api)
    }

    handleCancel() {
        this.props.history.go(-1)
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

        let {apiInfo, groupInfo} = this.props;

        let template = apiInfo.template || "";
        const GROUP_ROOT = `${MOCK_ROOT}${groupInfo.groupPath}/`;
        try {
            template = JSON.stringify(JSON.parse(template), null, 4);
        } catch (e){

        }

        return <div >
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"修改接口"}</h1>
            </div>
            <div className="ant-layout-container">
                <Form horizontal>
                    <FormItem
                        label="接口名称"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiName", {initialValue: apiInfo.name})}
                               placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem
                        label="接口地址"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiPath", {initialValue: apiInfo.path})} addonBefore={GROUP_ROOT} />
                    </FormItem>
                    <FormItem
                        label="Mock模版"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("apiTemplate", {initialValue: template})} rows="30"/>
                    </FormItem>

                    <FormItem >
                        <div style={{width:250}} className="ant-layout-center">
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

ApiTemplate = Form.create({})(ApiTemplate);

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    const {
        entities: {apis, groups}
    } = state;

    let apiId = ownProps.params.api;
    let groupId = ownProps.params.group;

    let apiInfo = apis[apiId] || {};
    let groupInfo = groups[groupId] || {};

    return {
        apiInfo,
        groupInfo
    }
}

export default connect(mapStateToProps, {
    fetchApi,
    updateApi
})(ApiTemplate)
