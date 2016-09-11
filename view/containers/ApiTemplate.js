import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Form, Select, Input, Icon, Row, Col, Tooltip} from 'antd';
const FormItem = Form.Item;
import {MOCK_ROOT} from '../libs/web-config'
import MockDataModal from '../components/MockDataModal'

import {fetchApi, updateApi, UPDATE_API_FAILURE, UPDATE_API_SUCCESS} from '../actions'

class ApiTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {showMockData: false};

    }

    componentWillReceiveProps(newProps) {
        if (newProps.error.type === UPDATE_API_FAILURE && newProps.error.message !== this.props.error.message) {
            message.error(newProps.error.message)
        }

        if (newProps.actionType === UPDATE_API_SUCCESS && newProps.actionTime + 1000 > new Date().getTime()){
            message.success("接口已保存")
            this.props.history.replace(`/${this.props.groupId}/apiList`)
        }

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
        // this.props.history.go(-1)
        this.props.history.replace(`/${this.props.groupId}/apiList`)
    }

    jsonFormat() {
        let template = this.props.form.getFieldValue("apiTemplate");
        try {
            template = JSON.stringify(JSON.parse(template), null, 4);
            this.props.form.setFieldsValue({"apiTemplate": template});
            // message.success('JSON格式化成功')
        } catch (e) {
            message.info(`非JSON格式数据或则JSON格式错误`);
        }

    }

    openMockjs(){
        window.open("http://mockjs.com/examples.html")
    }

    showMockData(){
        let template = this.props.form.getFieldValue("apiTemplate") || "";
        this.jsonFormat();
        this.setState({
            showMockData : true,
            template
        })
    }

    hideMockData(){
        this.setState({
            showMockData : false
        })
    }

    render() {

        const {getFieldProps} = this.props.form;
        const {showMockData} = this.state;
        let hideMockData = this.hideMockData.bind(this);
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18},
        };

        let {apiInfo, groupInfo} = this.props;

        let template = apiInfo.template || "";
        const GROUP_ROOT = `${MOCK_ROOT}${groupInfo.groupPath}/`;
        try {
            template = JSON.stringify(JSON.parse(template), null, 4);
        } catch (e) {

        }

        return <div >
            <Row className="ant-layout-header" type="flex" justify="space-between">
                <Col span={10}>
                    <h1 style={{marginLeft: 20}}>{"修改接口"}</h1>
                </Col>
                <Col span={2}>
                    <Tooltip title="点击打开模版示例">
                        <Button icon="question-circle" size="small" shape="circle" type="dashed"
                                onClick={this.openMockjs.bind(this)}/>
                    </Tooltip>
                </Col>
            </Row>
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
                        <Input {...getFieldProps("apiPath", {initialValue: apiInfo.path})} addonBefore={GROUP_ROOT}/>
                    </FormItem>
                    <FormItem
                        label="Mock模版"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("apiTemplate", {initialValue: template})} rows="30"/>
                    </FormItem>

                    <FormItem >
                        <div style={{width: 250}} className="ant-layout-center">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button onClick={this.showMockData.bind(this)}>模拟</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleCancel.bind(this)}>返回</Button>
                        </div>
                    </FormItem>

                </Form>
                <MockDataModal visible={showMockData} template={this.state.template} hideMockData={hideMockData}/>
            </div>
        </div>
    }
}

ApiTemplate = Form.create({})(ApiTemplate);

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    const {
        entities: {
            apis,
            groups,
            actionType,
            actionTime
        },
        error
    } = state;

    let apiId = ownProps.params.api;
    let groupId = ownProps.params.group;

    let apiInfo = apis[apiId] || {};
    let groupInfo = groups[groupId] || {};

    return {
        apiId,
        groupId,
        apiInfo,
        groupInfo,
        actionType,
        actionTime,
        error
    }
}

export default connect(mapStateToProps, {
    fetchApi,
    updateApi
})(ApiTemplate)
