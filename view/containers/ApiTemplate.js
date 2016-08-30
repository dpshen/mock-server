import React, {Component} from 'react';
import {Link} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Form, Select, Input, Icon} from 'antd';
const FormItem = Form.Item;

class ApiTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiInfo: {
                "_id": "57b42a8a84fc0b74151e6e23",
                "createTime": "2016-08-17T09:12:42.700Z",
                "template": "{   \"array|1-10\": [     {       \"name|+1\": [         \"Hello\",         \"Mock.js\",         \"!\"       ]     }   ] }",
                "groupId": "57b40ba967c24bd613a0c243",
                "path": "/test/api/getNum",
                "name": "getNum",
                "modifyTime": "2016-08-18T00:52:48.153Z",
                "mockData": {
                    "array": [
                        {
                            "name": "Hello"
                        },
                        {
                            "name": "Mock.js"
                        },
                        {
                            "name": "!"
                        },
                        {
                            "name": "Hello"
                        },
                        {
                            "name": "Mock.js"
                        },
                        {
                            "name": "!"
                        },
                        {
                            "name": "Hello"
                        }
                    ]
                }
            }
        };

    }

    handleSubmit() {
        let apiName = this.props.form.getFieldValue("apiName");
        let apiPath = this.props.form.getFieldValue("apiPath");
        let template = this.props.form.getFieldValue("apiTemplate");
        try {
            template = JSON.stringify(JSON.parse(template))
        } catch (e){
            console.log(e.message)
        }
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

        let apiInfo = this.state.apiInfo || {};

        let template = JSON.stringify(JSON.parse(apiInfo.template),null, 4);

        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"修改接口"}</h1>
            </div>
            <div className="ant-layout-container">
                <Form horizontal>
                    <FormItem
                        label="接口名称"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiName", {initialValue:apiInfo.name})} placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem
                        label="接口地址"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiPath", {initialValue:apiInfo.path})} addonBefore="Http://"/>
                    </FormItem>
                    <FormItem
                        label="Mock模版"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("apiTemplate", {initialValue:template})} rows="30"/>
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

ApiTemplate = Form.create({})(ApiTemplate);

export default ApiTemplate;
