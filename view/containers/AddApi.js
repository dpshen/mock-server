import React, {Component} from 'react';
import {Link} from 'react-router'
import {Breadcrumb, Table, Button, Modal, message, Form, Select, Input, Icon} from 'antd';
const FormItem = Form.Item;

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
        console.log(this.props.form.getFieldValue("apiName"))
        console.log(this.props.form.getFieldValue("apiPath"))
        console.log(this.props.form.getFieldValue("apiTemplate"))
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
                        <Input {...getFieldProps("apiName", {})} placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem
                        label="接口地址"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiPath", {})} addonBefore="Http://"/>
                    </FormItem>
                    <FormItem
                        label="Mock模版"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("apiTemplate", {})} rows="30"/>
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
