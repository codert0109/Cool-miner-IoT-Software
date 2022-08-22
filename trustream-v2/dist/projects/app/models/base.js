"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
class BaseModel extends sequelize_typescript_1.Model {
    serializer(opts) {
        const { exclude } = opts || {};
        const entity = this.toJSON();
        if (exclude)
            exclude.forEach(key => delete entity[key]);
        return entity;
    }
}
exports.default = BaseModel;
//# sourceMappingURL=base.js.map