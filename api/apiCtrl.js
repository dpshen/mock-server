const apiModel = require('../models/apiModel');
const objectIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");


async function addApi(ctx, next) {
    let form = ctx.request.body || {},
        ret;

    if (!(form && form.path && form.name && form.template && objectIdRegExp.test(form.groupId) )) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    try {
        JSON.parse(form.template)
    } catch (e) {
        ctx.logger.error("==>", e);
        ctx.result.set(101, "模版格式错误.");
        return
    }

    // 检查是否已存在接口地址
    ret = await apiModel.getPathCount(form);
    ctx.logger.trace("apiModel.hasPath", ret);
    if (ret > 0) {
        ctx.result.set(201, `已存在接口地址:${form.path}`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await apiModel.getNameCount(form);
    ctx.logger.trace("apiModel.hasName", ret);
    if (ret > 0) {
        ctx.result.set(202, `已存在接口名:${form.name}`);
        return;
    }

    ret = await apiModel.addApi(form);
    ctx.logger.trace("apiModel.addApi", ret);
    ctx.result.setResult(ret);

    await next();
}

async function updateApi(ctx, next) {
    let form = ctx.request.body || {},
        ret;

    if (!(form && form.path && form.name && form.template && objectIdRegExp.test(form._id) )) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    try {
        JSON.parse(form.template)
    } catch (e) {
        ctx.logger.error("==>", e);
        ctx.result.set(101, "模版格式错误.");
        return
    }

    // 检查是否已存在接口地址
    let api = await apiModel.getApi(form);
    ctx.logger.trace("apiModel.getApi", api);
    if (!api) {
        ctx.result.set(201, '接口不存在');
        return;
    }

    // 检查是否已存在接口地址
    ret = await apiModel.getPathCount(form);
    ctx.logger.trace("apiModel.hasPath", ret);
    if (api.path != form.path && ret > 0 ) {
        ctx.result.set(201, `已存在接口地址:${form.path}`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await apiModel.getNameCount(form);
    ctx.logger.trace("apiModel.hasName", ret);
    if (api.name != form.name && ret > 1) {
        ctx.result.set(202, `已存在接口名:${form.name}`);
        return;
    }

    ret = await apiModel.updateApi(form);
    ctx.logger.trace("apiModel.updateApi", ret);
    ctx.result.setResult(ret);

    await next();
}

async function getApiList(ctx, next) {
    let query = ctx.request.query;

    if (!objectIdRegExp.test(query.groupId)) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    let err,ret = await apiModel.getApiList(query);
    ctx.logger.trace("apiModel.getApiList", ret, err);
    ctx.result.setResult(ret);

    await next();
}

module.exports = {
    addApi,
    updateApi,
    getApiList
}