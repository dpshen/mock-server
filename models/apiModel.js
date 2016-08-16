let db = require('../libs/mongodb');
const Schema = require('mongoose').Schema;

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

function hasApi(path, name, ){
    return apiModel.findOne({path:path, name:name})
}

module.exports = {
    hasApi:hasApi
};