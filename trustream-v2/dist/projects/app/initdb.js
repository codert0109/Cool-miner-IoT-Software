"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_init_1 = require("../../common/utils/process_init");
process_init_1.process_init();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const models_1 = require("./models");
async function main() {
    await models_1.db.sync({ force: true });
    const file = fs_1.default.readFileSync(path_1.default.join(__dirname, `./project.yaml`), 'utf8');
    const c = yaml_1.default.parse(file);
    let rows = await models_1.statusRepository.findAll();
    let ret = await models_1.statusRepository.bulkCreate([
        {
            value: c.startHeight
        },
        {
            value: c.startHeight
        }
    ]);
}
main()
    .then(() => {
    let rows = models_1.statusRepository.findAll().then(rows => {
        console.log("Initialized DB with the following: ", rows[1].value);
        process.exit(0);
    });
})
    .catch(e => {
    console.log(e);
});
//# sourceMappingURL=initdb.js.map