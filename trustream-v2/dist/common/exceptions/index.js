"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assert = exports.Exception = void 0;
class Exception extends Error {
    constructor(code, message, source, params) {
        super();
        this.code = code;
        this.message = message;
        this.source = source;
        this.params = params;
    }
}
exports.Exception = Exception;
function Assert(condition, code, message) {
    if (!condition)
        throw new Exception(code, message);
}
exports.Assert = Assert;
//# sourceMappingURL=index.js.map