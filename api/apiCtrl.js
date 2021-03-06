const apiModel = require('../models/apiModel');
const groupModel = require('../models/groupModel');
const objectIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");
const Mock = require('mockjs');

const groupCtrl = require('./groupCtrl');

async function addApi(ctx, next) {
    let form = ctx.request.body || {},
        ret;

    if (!(form && form.path && form.name && objectIdRegExp.test(form.groupId) )) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    // 检查是否已存在接口地址
    ret = await apiModel.getPathCount(form);
    ctx.logger.trace("apiModel.hasPath", ret);
    if (ret > 0) {
        ctx.result.set(102, `已存在接口地址:${form.path}`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await apiModel.getNameCount(form);
    ctx.logger.trace("apiModel.hasName", ret);
    if (ret > 0) {
        ctx.result.set(103, `已存在接口名:${form.name}`);
        return;
    }

    ret = await apiModel.addApi(form);
    ctx.logger.trace("apiModel.addApi", ret);

    ctx.request.query._id = form.groupId;
    await groupCtrl.getGroup(ctx, next);

}

async function updateApi(ctx, next) {
    let form = ctx.request.body || {},
        ret;
    ctx.logger.debug(ctx.request)

    if (!(form && form.path && form.name && objectIdRegExp.test(form._id) )) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    // 检查是否已存在接口地址
    let api = await apiModel.getApi(form);
    ctx.logger.trace("apiModel.getApi", api);
    if (!api) {
        ctx.result.set(104, '接口不存在');
        return;
    }

    // 检查是否已存在接口地址
    ret = await apiModel.getPathCount(form);
    ctx.logger.trace("apiModel.hasPath", ret);
    if (api.path != form.path && ret > 0 ) {
        ctx.result.set(102, `已存在接口地址:${form.path}`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await apiModel.getNameCount(form);
    ctx.logger.trace("apiModel.hasName", ret);
    if (api.name != form.name && ret > 1) {
        ctx.result.set(103, `已存在接口名:${form.name}`);
        return;
    }

    ret = await apiModel.updateApi(form);
    ctx.logger.trace("apiModel.updateApi", ret);

    if (ret.ok){
        ctx.request.query._id = form.groupId;
        await groupCtrl.getGroup(ctx, next);
    } else {
        ctx.result.setResult(ret);
        await next();
    }
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

async function getApi(ctx, next) {
    let query = ctx.request.query;

    if (!objectIdRegExp.test(query._id)){
        ctx.result.set(100, "缺少参数");
        return null;
    }

    let api = await apiModel.getApi(query);
    ctx.logger.trace("apiModel.getApi", api);
    if (!api) {
        ctx.result.set(104, '接口不存在');
        return null;
    }

    api = api.toObject();
    ctx.result.setResult(api);

    await next();
}

module.exports = {
    addApi,
    updateApi,
    getApi,
    getApiList
}