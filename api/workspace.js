const apiModel = require('../models/apiModel');

async function setApi(ctx, next) {
    ctx.body = "setApi todo.";
    console.log(ctx.req);
    ctx.logger.info("setApi todo.");
    await next();
}

module.exports = {
    setApi: setApi
}