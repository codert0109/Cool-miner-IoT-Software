"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
var Code;
(function (Code) {
    Code[Code["OK"] = 0] = "OK";
    Code[Code["BAD_PARAMS"] = 400] = "BAD_PARAMS";
    Code[Code["UNAUTHORIZATION"] = 401] = "UNAUTHORIZATION";
    Code[Code["FORBIDDEN"] = 403] = "FORBIDDEN";
    Code[Code["INVALID_HEADERS"] = 405] = "INVALID_HEADERS";
    Code[Code["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    Code[Code["INVALID_IP"] = 501] = "INVALID_IP";
    Code[Code["INVALID_INVITE_CODE"] = 1001] = "INVALID_INVITE_CODE";
    Code[Code["USERNAME_EXIST"] = 1002] = "USERNAME_EXIST";
    Code[Code["USERNAME_NOT_FOUND"] = 1003] = "USERNAME_NOT_FOUND";
    Code[Code["INVALID_PASSWORD"] = 1004] = "INVALID_PASSWORD";
    Code[Code["USER_LOCKED"] = 1005] = "USER_LOCKED";
    Code[Code["USER_NOT_AUTHORIZED"] = 1006] = "USER_NOT_AUTHORIZED";
    Code[Code["BALANCE_NOT_ENOUGH"] = 1009] = "BALANCE_NOT_ENOUGH";
    Code[Code["OPERATION_FORBIDDEN"] = 1010] = "OPERATION_FORBIDDEN";
    Code[Code["REGISTER_CLOSED"] = 1011] = "REGISTER_CLOSED";
    Code[Code["INVALID_SMS_CODE"] = 1012] = "INVALID_SMS_CODE";
    Code[Code["SMS_FREQUENTLY"] = 1013] = "SMS_FREQUENTLY";
    Code[Code["USER_NOT_FOUND"] = 1014] = "USER_NOT_FOUND";
    Code[Code["USER_EXIST"] = 1015] = "USER_EXIST";
})(Code = exports.Code || (exports.Code = {}));
;
//# sourceMappingURL=errcode.js.map