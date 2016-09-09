const groupModel = require('../models/groupModel');
const apiModel = require('../models/apiModel');
const pathRegExp = new RegExp("[-a-z0-9_:@&?=+,.!/~*%$]");
const objectIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");

async function addGroup(ctx, next) {
    let form = ctx.request.body || {},
        ret;

    if (!(form && form.groupPath && form.groupName)) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    // 检查是否已存在接口地址
    ret = await groupModel.getPathCount(form);
    ctx.logger.trace("groupModel.getPathCount", ret);
    if (ret > 0) {
        ctx.result.set(101, `Group路径${form.groupPath}已存在`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await groupModel.getNameCount(form);
    ctx.logger.trace("groupModel.getNameCount", ret);
    if (ret > 0) {
        ctx.result.set(102, `Group名称${form.groupName}已存在`);
        return;
    }

    // Add api
    if (ctx.result.code == 0) {
        ret = await groupModel.addGroup(form);
        ctx.logger.trace("groupModel.addGroup", ret);
        await getGroupList(ctx, next);
        return;
    }

    await next();
}

async function updateGroup(ctx, next) {

    let form = ctx.request.body || {},
        ret;

    if (!(form && form._id && form.groupPath && form.groupName)) {
        // 检查参数
        ctx.result.set(100, "缺少参数");
        return
    }

    // 检查是否已存在接口地址
    ret = await groupModel.getPathCount(form);
    ctx.logger.trace("groupModel.getPathCount", ret);
    if (ret > 0) {
        ctx.result.set(101, `Group路径${form.groupPath}已存在`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await groupModel.getNameCount(form);
    ctx.logger.trace("groupModel.getNameCount", ret);
    if (ret > 0) {
        ctx.result.set(102, `Group名称${form.groupName}已存在`);
        return;
    }

    // Add api
    if (ctx.result.code == 0) {
        ret = await groupModel.updateGroup(form);
        ctx.logger.trace("groupModel.addGroup", ret);
        await getGroupList(ctx, next);
        return;
    }
    await next();
}

async function getGroup(ctx, next) {
    let query = ctx.request.query;

    if (!objectIdRegExp.test(query._id)) {
        ctx.result.set(100, "缺少参数");
        return null;
    }

    let group = await groupModel.getGroup(query);

    if (group == null) {
        ctx.result.set(104, "不存在的项目");
        return null;
    }

    group = group.toObject();
    group.apiList = await apiModel.getApiList({groupId: group._id}, {template: 1});

    ctx.result.setResult(group);

    await next();
}

async function getGroupList(ctx, next) {
    let ret = await groupModel.getGroupList(),
        rst = [];

    for (let group of ret) {
        group = group.toObject();
        group.apiList = await apiModel.getApiList({groupId: group._id}, {template: 1});
        rst.push(group);
    }
    ctx.result.setResult(rst);

    await next();
}

module.exports = {
    addGroup,
    updateGroup,
    getGroup,
    getGroupList
}