"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
function validateEnv() {
    return (0, envalid_1.cleanEnv)(process.env, {
        MONGO_CONNECTION_STRING: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
        SESSION_SECRET: (0, envalid_1.str)(),
    });
}
exports.env = validateEnv();
//# sourceMappingURL=validateEnv.js.map