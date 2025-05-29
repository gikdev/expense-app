import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"
import { AppModule } from "./app/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const config = new DocumentBuilder()
    .setTitle("Expense App")
    .setDescription("A simple project I did alongside the instructor to learn the NestJS's basics")
    .setVersion("v1.0")
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs/swagger", app, documentFactory)

  app.use(
    "/docs",
    apiReference({
      theme: "deepSpace",
      layout: "classic",
      content: documentFactory,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
