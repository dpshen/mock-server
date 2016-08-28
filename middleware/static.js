'use strict';

/**
 * Module dependencies.
 */

const resolve = require('path').resolve;
const assert = require('assert');
const send = require('koa-send');

/**
 * Expose `serve()`.
 */

module.exports = serve;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root, opts) {
    opts = opts || {};

    // options
    opts.root = resolve(root);
    if (opts.index !== false) opts.index = opts.index || 'index.html';

    if (!opts.defer) {
        return function serve(ctx, next) {
            if (ctx.result.code != 0){
                return next()
            }
            let path = ctx.path;
            if (!path.endsWith('.js') && !path.endsWith('.css')){
                path = '/'
            }
            if (ctx.method == 'HEAD' || ctx.method == 'GET') {
                return send(ctx, path, opts).then(done => {
                    if (!done) {
                        return next();
                    }
                });
            }
            return next();
        };
    }

    return function serve(ctx, next) {
        return next().then(() => {
            if (ctx.result.code != 0){
                return next()
            }
            let path = ctx.path;
            if (!path.endsWith('.js') && !path.endsWith('.css')){
                path = '/'
            }
            if (ctx.method != 'HEAD' && ctx.method != 'GET') return;
            // response is already handled
            if (ctx.body != null || ctx.status != 404) return;

            return send(ctx, path, opts);
        });
    };
}