

async function setApi(ctx, next) {
    ctx.body = "setApi todo.";
    ctx.logger.info("setApi todo.");
    await next();
}

module.exports = {
    setApi: setApi
}