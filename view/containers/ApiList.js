import React, {Component} from 'react';
import {Link} from 'react-router'
import {Breadcrumb, Table, Button, Form, Modal, message, Select, Input, Icon} from 'antd';
import Mock from 'mockjs';

const FormItem = Form.Item;

export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMockData: false,
            apiList: [
                {
                    "_id": "57b42a8a84fc0b74151e6e23",
                    "template": "{   \"array|1-10\": [     {       \"name|+1\": [         \"Hello\",         \"Mock.js\",         \"!\"       ]     }   ] }",
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
                    <a onClick={this.showMockData.bind(this, record)}>Mock数据</a>
                    <span className="ant-divider"/>
                    <Link to={`./${record._id}/template`}>Mock规则</Link>
                </span>
            ),
        }];

    }

    showMockData(apiInfo) {
        this.setState({
            apiInfo,
            showMockData: true
        })
    }

    hideMockData() {
        this.setState({
            apiInfo: null,
            showMockData: false
        })
    }

    render() {
        let {showMockData, apiInfo, apiList} = this.state;
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"接口"}</h1>
                <Link to={"./addApi"} className="m-l-10 ant-btn-primary ant-btn-lg">创建接口</Link>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={apiList}/>
            </div>
            <ApiInfo visible={showMockData} apiInfo={apiInfo} hideMockData={this.hideMockData.bind(this)}/>
        </div>
    }
}

class ApiInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(props){
        this.generateMockData(props)
    }

    generateMockData(props){
        let {apiInfo, visible } = props || this.props;
        let mockData = "";
        if (apiInfo && visible) {
            try {
                mockData = JSON.stringify(Mock.mock(JSON.parse(apiInfo.template)), null, 4);
                this.setState({mockData:mockData});
                return true;
            } catch (e) {
                const modal = Modal.error({
                    title: 'Mock模版解析错误',
                    content: e.message,
                });
                setTimeout(() => modal.destroy(), 3000);
                return false;
            }
        } else {
            return false;
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {visible, hideMockData} = this.props;
        let apiInfo = this.props.apiInfo;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };

        if (!apiInfo ){
            return null;
        }

        return (

            <Modal title="" visible={visible} onOk={this.generateMockData.bind(this)} okText={"重新生成"} cancelText={"关闭"} onCancel={hideMockData}>
                <Form horizontal>
                    <FormItem
                        label="接口名称"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiName", {initialValue: apiInfo.name})} disabled={true}
                               placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem
                        label="接口地址"
                        {...formItemLayout}
                    >
                        <Input {...getFieldProps("apiPath", {initialValue: apiInfo.path})} addonBefore="Http://"  disabled={true} />
                    </FormItem>
                    <FormItem
                        label="Mock数据"
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...getFieldProps("mockData", {initialValue: this.state.mockData})} rows="20"/>
                    </FormItem>

                </Form>

            </Modal>
        )
    }
}

ApiInfo = Form.create({})(ApiInfo);
