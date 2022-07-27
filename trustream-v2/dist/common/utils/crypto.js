"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyToAddress = exports.keccak256 = exports.hmacSha1 = exports.md5 = void 0;
const elliptic_1 = __importDefault(require("elliptic"));
const crypto_1 = __importDefault(require("crypto"));
const sha3_1 = require("sha3");
const secp256k1 = new elliptic_1.default.ec("secp256k1");
function md5(key) {
    return crypto_1.default.createHash('md5').update(key).digest('hex');
}
exports.md5 = md5;
function hmacSha1(content, key) {
    return crypto_1.default.createHmac('sha1', key).update(content).digest('hex');
}
exports.hmacSha1 = hmacSha1;
function keccak256(input) {
    const k = new sha3_1.Keccak(256);
    return k.update(Buffer.from(input)).digest();
}
exports.keccak256 = keccak256;
function hash160b(input) {
    const digest = keccak256(input);
    return digest.slice(12);
}
function publicKeyToAddress(publicKey) {
    const key = secp256k1.keyFromPublic(publicKey, "hex");
    const publicKeyBytes = Buffer.from(key.getPublic(false, "hex"), 'hex');
    const hashBytes = hash160b(publicKeyBytes.slice(1));
    return '0x' + hashBytes.toString('hex');
}
exports.publicKeyToAddress = publicKeyToAddress;
//# sourceMappingURL=crypto.js.map