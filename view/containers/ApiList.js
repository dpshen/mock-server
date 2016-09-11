import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Table, Button, Form, Modal, message, Input, Icon, Tooltip} from 'antd';
import Mock from 'mockjs';
import util from '../libs/util'

import {fetchApiList} from '../actions'
import {MOCK_ROOT} from '../libs/web-config'

const FormItem = Form.Item;

class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMockData: false,
        };

        this.columns = [{
            title: '接口',
            dataIndex: 'name',
        }, {
            title: '路径',
            dataIndex: 'path',
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
            title: "最近修改时间",
            dataIndex: "modifyTime",
            render: (modifyTime) => {
                if (modifyTime) {
                    return (
                        <span>{util.dateFormat(modifyTime)}</span>
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
                    <a onClick={this.showMockData.bind(this, record)}>Mock数据</a>
                    <span className="ant-divider"/>
                    <Link to={`/${this.props.groupId}/${record._id}/template`}>修改</Link>
                </span>
            ),
        }];

    }

    componentWillMount() {
        const {fetchApiList, groupId} = this.props;
        fetchApiList(groupId);
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
        let {showMockData, apiInfo} = this.state;
        const {apiList, groupInfo} = this.props;
        return <div>
            <div className="ant-layout-header">
                <h1 style={{marginLeft: 20}}>{"接口"}</h1>
                <Link to={`/${this.props.groupId}/addApi`} className="m-l-10 ant-btn-primary ant-btn-lg">创建接口</Link>
            </div>
            <div className="ant-layout-container">
                <Table columns={this.columns} dataSource={apiList} onRowClick={this.showMockData.bind(this)}/>
            </div>
            <ApiInfo visible={showMockData} apiInfo={apiInfo} groupInfo={groupInfo}
                     hideMockData={this.hideMockData.bind(this)}/>
        </div>
    }
}

class ApiInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(props) {
        this.generateMockData(props)
    }

    generateMockData(props) {
        let {apiInfo, visible} = props || this.props;
        let mockData = "";
        if (apiInfo && visible) {
            let template = apiInfo.template;
            try {
                template = JSON.parse(apiInfo.template);
                mockData = JSON.stringify(Mock.mock(template), null, 4);
            } catch (e) {
                mockData = Mock.mock(template)
            }
            this.setState({mockData: mockData});
            return true;
        } else {
            return false;
        }
    }

    copyApiPath() {
        // const {groupInfo, apiInfo} = this.props;
        // let path = `${MOCK_ROOT}${groupInfo.groupPath}/${apiInfo.path}`;

        let text = document.getElementById("apiPath");
        console.log(text);
        text.select();
        document.execCommand("Copy");

    }

    render() {
        const {getFieldProps} = this.props.form;
        const {visible, hideMockData, groupInfo} = this.props;
        let apiInfo = this.props.apiInfo;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        const GROUP_ROOT = `${MOCK_ROOT}${groupInfo.groupPath}/`;

        if (!apiInfo) {
            return null;
        }

        return (

            <Modal title="" visible={visible} width={700} onOk={this.generateMockData.bind(this)} okText={"重新生成"}
                   cancelText={"关闭"}
                   onCancel={hideMockData}>
                <Form horizontal>
                    <FormItem label="接口名称" {...formItemLayout} >
                        <Input {...getFieldProps("apiName", {initialValue: apiInfo.name})} disabled={true}
                               placeholder="接口的名称(仅用于标识接口)"/>
                    </FormItem>

                    <FormItem label="接口地址" {...formItemLayout} >
                        <Input {...getFieldProps("apiPath", {initialValue: `${GROUP_ROOT}${apiInfo.path}`})}
                               addonAfter={<Tooltip title="点击复制接口地址">
                                   <Button onClick={this.copyApiPath.bind(this)} icon="copy" size="small"/>
                               </Tooltip>}/>
                    </FormItem>
                    <FormItem label="Mock数据" {...formItemLayout}>
                        <Input type="textarea" {...getFieldProps("mockData", {initialValue: this.state.mockData})}
                               rows="20"/>
                    </FormItem>

                </Form>

            </Modal>
        )
    }
}

ApiInfo = Form.create({})(ApiInfo);

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    const {
        entities: {apis, groups}
    } = state;

    let groupId = ownProps.params.group;
    let group = groups[groupId];

    let apiList = [];
    if (group) {
        apiList = group.apiList.map(key => apis[key]);
    }

    return {
        apiList,
        groupId,
        groupInfo: group || {}
    }
}

export default connect(mapStateToProps, {
    fetchApiList
})(ApiList)
