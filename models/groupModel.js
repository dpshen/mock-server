let db = require('../libs/mongoose');
const Schema = require('mongoose').Schema;

var groupSchema = new Schema({
        _id: Schema.Types.ObjectId,
        groupName: String,
        createTime: Date,
        modifyTime: Date
    },
    {collection: 'group'}
);

var groupModel = db.mongoose.model('group', groupSchema);

module.exports = groupModel;