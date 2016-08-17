const router = require('koa-router')();

const {addApi, updateApi, getApiList } = require('./api/apiCtrl');
const {addGroup, updateGroup, getGroupList} = require('./api/groupCtrl');
const mock = require('./api/mockData').mock;

router.post('/addApi', addApi);
router.post('/updateApi', updateApi);
router.get('/getApiList', getApiList);

router.post('/addGroup', addGroup);
router.post('/updateGroup', updateGroup);
router.get('/getGroupList', getGroupList);

router.get('/mock/**', mock);

module.exports = router;