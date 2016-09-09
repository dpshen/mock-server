import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Menu, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router'

import {fetchGroupList, GET_GROUP_LIST_FAILURE} from '../actions'

import './IndexScreen.less'

class IndexScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(newProps) {
        if (newProps.error.type === GET_GROUP_LIST_FAILURE && newProps.error.message !== this.props.error.message) {
            message.error(newProps.error.message)
        }
    }

    componentWillMount() {
        this.props.fetchGroupList();
    }

    onSelect(item) {
        let href = item.item.props["data-href"];
        this.props.history.replace(href);
    }

    render() {
        let params = this.props.params;
        let selectedKeys = [];
        if (params.api) {
            selectedKeys = [params.group, params.api]
        } else if (params.group) {
            selectedKeys = [params.group]
        }

        let groupList = this.props.groupList;

        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <Link className="ant-layout-logo" to="/">FBI
                        <small> mock</small>
                    </Link>
                    <Menu mode="inline" onSelect={this.onSelect.bind(this)} onClick={this.onSelect.bind(this)}
                          theme="dark" selectedKeys={selectedKeys}>

                        {groupList.map(group=> {
                            return <Menu.Item key={group._id} data-href={`/${group._id}/apiList`}>
                                {group.groupName}
                            </Menu.Item>
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

    const {
        entities: {groups},
        error
    } = state;

    let groupList = Object.keys(groups).map(key => groups[key]);

    return {
        groupList,
        error
    }
}

export default connect(mapStateToProps, {
    fetchGroupList
})(IndexScreen)
