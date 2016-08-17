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
    groupPath:1
};

function getGroupList() {
    return groupModel.find({}, listView)
}

// 查询组内path数量
function getPathCount({groupPath}) {
    return groupModel.find({groupPath}).count()
}

// 查询组内name数量
function getNameCount({groupName}) {
    return groupModel.find({groupName}).count()
}

function addGroup(form) {
    let group = new groupModel();
    group._id = new Types.ObjectId();
    group.groupName = form.groupName;
    group.groupPath = form.groupPath;
    group.createTime = new Date();
    return group.save()
}

function updatePath({_id, groupPath}) {
    let modifyTime = new Date();
    return groupPath.update({_id}, {$set: {groupPath, modifyTime}})
}

function updateName({_id, groupName}) {
    let modifyTime = new Date();
    return groupPath.update({_id}, {$set: {groupName, modifyTime}})
}

module.exports = {
    getGroupList,
    getPathCount,
    getNameCount,
    addGroup,
    updatePath,
    updateName
};