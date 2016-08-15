let db = require('../libs/mongoose');
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

var apiModel = db.mongoose.model('api', apiSchema);

module.exports = apiModel;