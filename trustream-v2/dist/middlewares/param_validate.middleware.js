"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramValidate = void 0;
const enums_1 = require("@common/enums");
const utils_1 = require("@common/utils");
const env_1 = require("@config/env");
function paramValidate(opts) {
    return async (ctx, next) => {
        const { schema } = opts;
        const contentType = ctx.headers['content-type'] || '';
        if (ctx.method === 'POST' && !contentType.startsWith('multipart') && !contentType.startsWith('application/json')) {
            ctx.status = 200;
            ctx.body = 'content-type is not application/json';
            return;
        }
        if (schema) {
            const params = {
                ...ctx.params,
                ...(['POST', 'PUT'].includes(ctx.method) ? ctx.request.body : ctx.request.query),
            };
            const { error, value } = schema.validate(params, {
                allowUnknown: true,
                debug: env_1.NODE_ENV === 'development',
            });
            if (error) {
                utils_1.logger.error(JSON.stringify(params));
                ctx.status = 200;
                ctx.body = {
                    success: false,
                    error: { code: enums_1.Code.BAD_PARAMS, message: error.message },
                };
                return;
            }
            ctx.params = value;
        }
        await next();
    };
}
exports.paramValidate = paramValidate;
//# sourceMappingURL=param_validate.middleware.js.map