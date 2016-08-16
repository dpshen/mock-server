const apiModel = require('../models/apiModel');

function checkForm(form, keys) {

}


async function setApi(ctx, next) {
    let form = ctx.request.body || {};

    if (!(form && form.path && form.name && form.template && form.groupId )){
        ctx.result.set("-1", "缺少参数")
    } else {
        let ret = await apiModel.hasApi();
        ctx.logger.debug(ret)
    }

    ctx.body = ctx.result.toString();
    await next();
}

module.exports = {
    setApi: setApi
}