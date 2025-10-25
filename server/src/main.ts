import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Bootstraps the NestJS application.
 * Creates and starts the HTTP server on the configured port.
 */
async function bootstrap() {
  const DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
