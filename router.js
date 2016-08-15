const router = require('koa-router')();

const setApi = require('./api/workspace').setApi;
const mock = require('./api/mockData').mock;

router.get('/setApi', setApi);

router.get('/mock', mock);

module.exports = router;