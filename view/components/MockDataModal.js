import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Table, Button, Form, Modal, message, Input, Icon, Tooltip} from 'antd';
import Mock from 'mockjs';

export default class MockDataModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(props) {
        this.generateMockData(props)
    }

    generateMockData(props) {
        let {template, visible} = props || this.props;
        let mockData = "";
        if (template && visible) {
            try {
                template = template.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');
                template = JSON.parse(template);
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

    render() {
        let {hideMockData, visible} = this.props;

        return (
            <Modal title="" visible={visible} width={700} onOk={this.generateMockData.bind(this)} okText={"重新生成"}
                   cancelText={"关闭"}
                   onCancel={hideMockData}>
                <Input type="textarea"  value={this.state.mockData} rows="20"/>
            </Modal>)
    }
}
