import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';

import './IndexScreen.less'

export default class IndexScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupList: [
                {
                    "_id": "57b40ba967c24bd613a0c243",
                    "groupPath": "test",
                    "groupName": "测试",
                    "apiList": [
                        {
                            "_id": "57b42a8a84fc0b74151e6e23",
                            "path": "/test/api/getNum",
                            "name": "getNum"
                        }
                    ]
                },
                {
                    "_id": "57b40e1667c24bd613a0c245",
                    "groupPath": "test2",
                    "groupName": "group2",
                    "apiList": []
                },
                {
                    "_id": "57bbbfe0c75ee7e3504de7c0",
                    "groupPath": "test1",
                    "groupName": "group1",
                    "apiList": []
                },
                {
                    "_id": "57bbbfecc75ee7e3504de7c1",
                    "groupPath": "test3",
                    "groupName": "group3",
                    "apiList": []
                }
            ]
        }
    }

    onSelect(item, key, selectedKeys) {
        console.log(key, selectedKeys)
        let href = item.item.props["data-href"];

        location.href = href;
    }


    render() {
        let params = this.props.params;
        let selectedKeys = [];
        if (params.api){
            selectedKeys = [params.group, params.api]
        } else if (params.group){
            selectedKeys = [params.group]
        }

        let groupList = this.state.groupList;

        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">FBI
                        <small>MOCK</small>
                    </div>
                    <Menu mode="inline" onSelect={this.onSelect.bind(this)} onClick={this.onSelect.bind(this)}
                          theme="dark" selectedKeys={selectedKeys} >

                        {groupList.map(group=> {
                            return <Menu.SubMenu key={group._id} data-href={`/${group._id}/apiList`}
                                            title={<span><Icon type="edit" />{group.groupName}</span>}>
                                {
                                    group.apiList.map((api)=> {
                                        return <Menu.Item key={api._id}
                                                          data-href={`/${group._id}/${api._id}/Template`}>{api.name}</Menu.Item>
                                    })
                                }
                            </Menu.SubMenu>
                        })}
                    </Menu>
                </aside>
                <div className="ant-layout-main">
                    {
                        this.props.children
                    }
                    <div className="ant-layout-footer">
                        浙江远图 © 2016
                    </div>
                </div>
            </div>
        )
    }
}