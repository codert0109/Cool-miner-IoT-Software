"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const utils_1 = require("@common/utils");
const env_1 = require("@config/env");
const debug = env_1.NODE_ENV == 'development';
function logger() {
    return async (ctx, next) => {
        const start = Date.now();
        const res = ctx.res;
        const onfinish = done.bind(null, 'finish');
        const onclose = done.bind(null, 'close');
        res.once('finish', onfinish);
        res.once('close', onclose);
        await next();
        function done(event) {
            const end = Date.now();
            const duration = Math.round(end - start);
            const { realIp, status, path, method } = ctx;
            if (debug) {
                const params = JSON.stringify(ctx.params);
                const proxyHost = ctx.headers['proxy-host'] || '-';
                const platform = ctx.headers.platform || '-';
                const version = ctx.headers.version || '-';
                const buildNumber = ctx.headers.buildnumber || '-';
                utils_1.logger.info(`${realIp} ${proxyHost} ${event} ${method} ${status} ${path} (${platform} ${version} ${buildNumber}) ${params} ${duration}ms`);
            }
            res.removeListener('finish', onfinish);
            res.removeListener('close', onclose);
        }
    };
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map