const apiModel = require('../models/apiModel');
const Mock = require('mockjs');


async function mock(ctx, next) {
    let definePath = ctx.path.replace(/^\/mock/,"");
    ctx.logger.info(ctx.path, definePath);

    let ret = await apiModel.queryApiByPath(definePath);
    ctx.logger.info(ret);
    if (ret.length > 1){
        ctx.result.set(0, "mock服务存在重复接口,请检查mock服务配置");
        return
    }
    if (ret.length == 0){
        ctx.result.set(400, "mock服务不存在该接口");
        return
    }

    let api = ret[0] || {};
    let template = JSON.parse(api.template || "{}");
    ctx.body = Mock.mock(template);
    await next();
}

module.exports = {
    mock
}