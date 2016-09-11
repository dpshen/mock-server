let db = require('../libs/mongodb');
const Schema = require('mongoose').Schema;
const Types = require('mongoose').Types;

var apiSchema = new Schema({
        _id: Schema.Types.ObjectId,
        path: String,
        name: String,
        template: String,
        groupId: Schema.Types.ObjectId,
        groupName: String,
        createTime: Date,
        modifyTime: Date
    }, {
        collection: 'api'
    }
);

var apiModel = db.model('api', apiSchema);

const listView = {
    _id: 1,
    groupId: 1,
    groupName: 1,
    template: 1,
    path: 1,
    name: 1
};

const detailView = {
    _id: 1,
    path: 1,
    name: 1,
    template: 1,
    groupId: 1,
    groupName: 1,
    createTime: 1,
    modifyTime: 1
};

// 获取组内api列表
function getApiList({groupId}, assignParams) {
    return apiModel.find({groupId}, Object.assign(detailView, assignParams));
}

// 查询组内path数量
function getPathCount({path, groupId}) {
    return apiModel.find({path, groupId}).count()
}

// 查询组内name数量
function getNameCount({name, groupId}) {
    return apiModel.find({name, groupId}).count()
}

// 插入Api
function addApi({name, path, groupId, template}) {
    let api = new apiModel();
    api._id = new Types.ObjectId();
    api.name = name;
    api.path = path;
    api.groupId = Types.ObjectId(groupId);
    api.template = template;
    api.createTime = new Date();
    api.modifyTime = new Date();
    return api.save()
}

// 查询Api
function getApi({_id}) {
    return apiModel.findOne({_id},detailView)
}

// 更新接口地址
function updateApi({_id, path, name, template}) {
    let modifyTime = new Date();
    return apiModel.update({_id}, {$set: {path, name, template, modifyTime}},detailView)
}

// 更新接口地址
function queryApiByPath(filter) {
    return apiModel.find(filter)
}

module.exports = {
    getApiList,
    getPathCount,
    getNameCount,
    addApi,
    getApi,
    updateApi,
    queryApiByPath
};