import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Menu, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router'

import {fetchGroupList} from '../actions'

import './IndexScreen.less'

class IndexScreen extends Component {
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

    componentWillMount() {
        this.props.fetchGroupList();
    }

    onSelect(item) {
        let href = item.item.props["data-href"];
        this.props.history.replace(href);
    }

    onSubMenuClick(eventKey) {
        console.log(eventKey)
        this.props.history.replace(`/${eventKey.key}`);
    }

    render() {
        let params = this.props.params;
        let selectedKeys = [];
        if (params.api) {
            selectedKeys = [params.group, params.api]
        } else if (params.group) {
            selectedKeys = [params.group]
        }

        let groupList = this.state.groupList;

        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <Link className="ant-layout-logo" to="/">FBI
                        <small>mock</small>
                    </Link>
                    <Menu mode="inline" onSelect={this.onSelect.bind(this)} onClick={this.onSelect.bind(this)}
                          theme="dark" selectedKeys={selectedKeys}>

                        {groupList.map(group=> {
                            return <Menu.SubMenu key={group._id} data-href={`/${group._id}/apiList`}
                                                 onTitleClick={this.onSubMenuClick.bind(this)}
                                                 title={<span><Icon type="edit"/>{group.groupName}</span>}>
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

function mapStateToProps(state, ownProps) {
    // We need to lower case the login/name due to the way GitHub's API behaves.
    // Have a look at ../middleware/api.js for more details.

    console.log(state, ownProps)

    const {
        entities: {groupList}
    } = state;

    return {
        groups
    }
}

export default connect(mapStateToProps, {
    fetchGroupList
})(IndexScreen)
