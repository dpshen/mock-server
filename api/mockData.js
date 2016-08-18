const apiModel = require('../models/apiModel');
const Mock = require('mockjs');


async function mock(ctx, next) {
    let definePath = ctx.path.replace(/^\/mock/,"");
    ctx.logger.info(ctx.path, definePath);

    let ret = await apiModel.queryApiByPath(definePath);
    ctx.logger.info(ret);
    if (ret.length > 1){
        ctx.result.set(105, "mock服务存在重复接口,请检查mock服务配置");
        return
    }
    if (ret.length == 0){
        ctx.result.set(104, "mock服务不存在该接口");
        return
    }

    let api = ret[0] || {};
    let template = JSON.parse(api.template || "{}");
    let data = Mock.mock(template);
    ctx.result.setResult(data);
    await next();
}

module.exports = {
    mock
}