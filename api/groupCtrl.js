const groupModel = require('../models/groupModel');
const apiModel = require('../models/apiModel');
const pathRegExp = new RegExp("[-a-z0-9_:@&?=+,.!/~*%$]");

async function addGroup(ctx, next) {
    let form = ctx.request.body || {},
        ret;

    if (!(form && form.groupPath && form.groupName)) {
        // 检查参数
        ctx.result.set("100", "缺少参数");
        return
    }

    // 检查是否已存在接口地址
    ret = await groupModel.getPathCount(form);
    ctx.logger.trace("groupModel.getPathCount", ret);
    if (ret > 0) {
        ctx.result.set("201", `Group路径${form.groupPath}已存在`);
        return;
    }

    // 检查是否已存在接口名字
    ret = await groupModel.getNameCount(form);
    ctx.logger.trace("groupModel.getNameCount", ret);
    if (ret > 0) {
        ctx.result.set("202", `Group名称${form.groupName}已存在`);
        return;
    }

    // Add api
    if (ctx.result.code == 0) {
        ret = await groupModel.addGroup(form);
        ctx.logger.trace("groupModel.addGroup", ret);
        ctx.result.setResult(ret);
    }

    await next();
}

async function updateGroup(ctx, next) {
    await next();
}

async function getGroupList(ctx, next) {
    let ret = await groupModel.getGroupList(),
        rst = [];

    ret.map(async (group)=>{
        group = group.toObject();
        group.apiList = await apiModel.getApiList({groupId:group._id});
        rst.push(group);
    });
    ctx.result.setResult(rst);

    await next();
}

module.exports = {
    addGroup,
    updateGroup,
    getGroupList
}