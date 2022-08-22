"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const enums_1 = require("@common/enums");
const utils_1 = require("@common/utils");
function response({ action }) {
    return async (ctx) => {
        try {
            const data = await action(ctx);
            ctx.body = data ? { success: true, data } : { success: true };
        }
        catch (e) {
            const params = JSON.stringify(ctx.params);
            if (e.code) {
                utils_1.logger.error(`${ctx.path} ${params} ${JSON.stringify(e)}`);
            }
            else {
                utils_1.logger.error(`${ctx.path} ${params} \n${e.stack}`);
            }
            ctx.body = {
                success: false,
                error: {
                    code: e.code || enums_1.Code.SERVER_ERROR,
                    message: e.code ? e.message : 'server error.'
                },
            };
        }
    };
}
exports.response = response;
//# sourceMappingURL=response.middleware.js.map