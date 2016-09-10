const apiModel = require('../models/apiModel');
const groupModel = require('../models/groupModel');
const Mock = require('mockjs');


async function mock(ctx, next) {
    let definePath = ctx.path.replace(/^\/mock\//,"");
    ctx.logger.debug(ctx.path, definePath);
    let pathList = definePath.split("/");
    let groupPath = pathList.shift();
    let apiPath = pathList.join("/");

    let group = await groupModel.getGroupByPath(groupPath);
    let groupId = group._id;
    ctx.logger.trace(groupId, apiPath);

    let ret = await apiModel.queryApiByPath({path:apiPath, groupId});
    ctx.logger.info(ret);
    if (ret.length > 1){
        ctx.result.set(105, "mock服务存在重复接口,请检查mock服务配置");
        await next();
        return
    }
    if (ret.length == 0){
        ctx.result.set(104, "mock服务不存在该接口");
        await next();
        return
    }

    let api = ret[0] || {};
    let template = api.template || "{}";
    try {
        template = JSON.parse(template)
    } catch (e){

    }
    let data = Mock.mock(template);
    ctx.result.setResult(data);
    await next();
}

module.exports = {
    mock
}