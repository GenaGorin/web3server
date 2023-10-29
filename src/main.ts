import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipes";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Nest app Docs')
        .setDescription('REST Api docs')
        .setVersion('1.0.0')
        .addTag('nest')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);


    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log('Server start on port -', PORT))
}

start();