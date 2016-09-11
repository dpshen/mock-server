let db = require('../libs/mongodb');
const Schema = require('mongoose').Schema;
const Types = require('mongoose').Types;

var groupSchema = new Schema({
        _id: Schema.Types.ObjectId,
        groupName: String,
        groupPath: String,
        createTime: Date,
        modifyTime: Date
    },
    {collection: 'group'}
);

const groupModel = db.model('group', groupSchema);

const listView = {
    _id:1,
    groupName:1,
    groupPath:1,
    createTime:1,
    modifyTime:1
};

function getGroup({_id}) {
    return groupModel.findOne({_id})
}

function getGroupByPath(groupPath) {
    return groupModel.findOne({groupPath})
}
function getGroupList() {
    return groupModel.find({})
}

// 查询组内path数量
function getPathCount({groupPath, _id}) {
    let filter = {groupPath};
    if (_id){
        filter._id = {$ne:_id}
    }
    return groupModel.find(filter).count()
}

// 查询组内name数量
function getNameCount({groupName, _id}) {
    let filter = {groupName};
    if (_id){
        filter._id = {$ne:_id}
    }
    return groupModel.find(filter).count()
}

function addGroup(form) {
    let group = new groupModel();
    group._id = new Types.ObjectId();
    group.groupName = form.groupName;
    group.groupPath = form.groupPath;
    group.createTime = new Date();
    return group.save()
}

function updateGroup({_id, groupPath, groupName}) {
    let modifyTime = new Date();
    return groupModel.update({_id}, {$set: {groupPath,groupName, modifyTime}})
}

module.exports = {
    getGroup,
    getGroupByPath,
    getGroupList,
    getPathCount,
    getNameCount,
    addGroup,
    updateGroup
};