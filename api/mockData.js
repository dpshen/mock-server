

async function mock(ctx, next) {
    ctx.body = "mock todo.";
    await next();
}

module.exports = {
    mock: mock
}