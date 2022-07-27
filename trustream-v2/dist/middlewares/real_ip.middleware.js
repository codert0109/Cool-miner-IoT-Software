"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realIp = void 0;
function realIp(opts) {
    return async (ctx, next) => {
        const forwarded = ctx.headers['x-forwarded-for'] || '';
        const ip = (typeof (forwarded) == 'string') ? forwarded.split(',').shift() : forwarded.shift();
        ctx.realIp = (ip || ctx.ip || '').trim();
        await next();
    };
}
exports.realIp = realIp;
//# sourceMappingURL=real_ip.middleware.js.map