"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthHelper = void 0;
const web3_1 = __importDefault(require("web3"));
class EthHelper {
    constructor(endpoint) {
        this.web3 = new web3_1.default(web3_1.default.givenProvider || endpoint);
    }
    async balance(address) {
        const { web3 } = this;
        const gasBalance = web3.utils.toBN(await web3.eth.getBalance(address));
        return gasBalance;
    }
    async estimateGas(from) {
        const { web3 } = this;
        const gasLimit = await web3.eth.estimateGas({ from });
        const price = await web3.eth.getGasPrice();
        const gasPrice = web3.utils.toBN(price);
        return web3.utils.toBN(gasLimit).mul(gasPrice);
    }
}
exports.EthHelper = EthHelper;
//# sourceMappingURL=eth.js.map