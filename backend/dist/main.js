"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
const session = require("express-session");
const validateEnv_1 = require("./util/validateEnv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const MongoStore = require('connect-mongo');
    app.use(morgan('dev'));
    app.use(session({
        secret: validateEnv_1.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: validateEnv_1.env.MONGO_CONNECTION_STRING,
        }),
    }));
    await app.listen(validateEnv_1.env.PORT);
    console.log(`Server running on port: ${validateEnv_1.env.PORT}`);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map