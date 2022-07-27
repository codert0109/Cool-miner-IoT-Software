"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryLock = void 0;
const lodash_1 = __importDefault(require("lodash"));
const enums_1 = require("@common/enums");
const exceptions_1 = require("@common/exceptions");
function tryLock(name) {
    return function (target, propertyName, descriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args) {
            if (!lodash_1.default.has(this, name))
                throw new exceptions_1.Exception(enums_1.Code.SERVER_ERROR, `target without ${name}`);
            if (lodash_1.default.get(this, name) == true)
                return;
            lodash_1.default.set(this, name, true);
            const result = await method.apply(this, args);
            lodash_1.default.set(this, name, false);
            return result;
        };
    };
}
exports.tryLock = tryLock;
//# sourceMappingURL=decorator.js.map