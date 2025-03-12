"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const express = require("express");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    app.use(express.static("."));
    app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Ecommerce API")
        .setDescription("API for Ecommerce project")
        .setVersion("1.1.3")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("swagger", app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map