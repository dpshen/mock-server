

async function mock(ctx, next) {
    ctx.logger.info(ctx.path);
    await next();
}

module.exports = {
    mock
}