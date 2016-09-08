import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import {Breadcrumb, Table,Form, Button, Modal, message, Select, Input, Icon} from 'antd';

// import './GroupList.less'
const FormItem = Form.Item;

class AddGroup extends Component {
    constructor(props) {
        super(props);

    }

    handleSubmit() {
        let groupName = this.props.form.getFieldValue("groupName");
        let groupPath = this.props.form.getFieldValue("groupPath");
        const group = {groupName, groupPath};
        this.props.addGroup(group);
        this.props.fetchGroupList();
    }

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        const {visible, onCancel} = this.props;

        return (

            <Modal title="" visible={visible} onCancel={onCancel} onOk={this.handleSubmit.bind(this)} >
                <Form horizontal>
                    <FormItem label="项目名称" {...formItemLayout}>
                        <Input {...getFieldProps("groupName", {})} placeholder="项目的名称(仅用于标识项目)"/>
                    </FormItem>

                    <FormItem label="项目地址" {...formItemLayout}>
                        <Input {...getFieldProps("groupPath", {})} />
                    </FormItem>
                </Form>

            </Modal>
        )
    }
}

export default AddGroup = Form.create({})(AddGroup);

